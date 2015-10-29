load("sauceLabsSupport.js");

var domain = "testapp.galenframework.com";

function copyProperties(dest, source) {
    for (var propertyName in source) {
        if (source.hasOwnProperty(propertyName)) {
            dest[propertyName] = source[propertyName];
        }
    }
}

function Device(deviceName, tags, openDriverFunction) {
    this.deviceName = deviceName;
    this.tags = tags;
    this.openDriver = openDriverFunction;
}

function inLocalBrowser(name, size, tags, browserType) {
    browserType = browserType || "firefox";
    return new Device(name, tags, function (url) {
        return createDriver(url, size, browserType);
    });
}

var devices = {
    mobileEmulation: inLocalBrowser("mobile", "450x800", ["mobile"]),
    tabletEmulation: inLocalBrowser("tablet", "600x800", ["tablet"]),
    desktopFirefox: inLocalBrowser("desktop", "1100x800", ["desktop"], "firefox"),
};
if (System.getProperty("saucelabs.enabled") == "true") {
    copyProperties(devices, sauceLabsDevices);
}

var TEST_USER = {
    username: "testuser@example.com",
    password: "test123"
};


function openDriverForDevice(device, url) {
    var driver = device.openDriver(null);

    session.put("driver", driver);

    if (url != null) {
        if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
            url = "http://" + domain + url;
        }
        driver.get(url);
    }
    else {
        driver.get("http://" + domain);
    }
    return driver;
}


afterTest(function (test) {
    var driver = session.get("driver");
    if (driver != null) {
        if (test.isFailed()) {
            session.report().info("Screenshot").withAttachment("Screenshot", takeScreenshot(driver));
        }
        driver.quit();
    }
});

function _test(testNamePrefix, url, callback) {
    test(testNamePrefix + " on ${deviceName} device", function (device) {
        var driver = openDriverForDevice(device, url);
        callback.call(this, driver, device);
    });
}

function testOnAllDevices(testNamePrefix, url, callback) {
    forAll(devices, function () {
        _test(testNamePrefix, url, callback);
    });
}

function testOnDevice(device, testNamePrefix, url, callback) {
    forOnly(device, function() {
        _test(testNamePrefix, url, callback);
    });
}



/*
    Exporting functions to all other tests that will use this script
*/
(function (export) {
    export.devices = devices;
    export.testOnAllDevices = testOnAllDevices;
    export.TEST_USER = TEST_USER;
})(this);
