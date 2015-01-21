
var domain = "testapp.galenframework.com";

var devices = {
    mobile: {
        deviceName: "mobile",
        size: "450x800",
        tags: "mobile",

        getDriver: function () {
            return createGridDriver("http://127.0.0.1:8001/wd/hub", {
                desiredCapabilities: {
                    browserName: "Chrome",
                    platformName: "Android",
                    deviceName: "Samsung",
                    bundleId: "com.android.chrome"
                }
            });
        }
    },
    tablet: {
        deviceName: "tablet",
        size: "600x800",
        tags: "tablet",

        getDriver: function () {
            return createGridDriver("http://127.0.0.1:8002/wd/hub", {
                desiredCapabilities: {
                    browserName: "Chrome",
                    platformName: "Android",
                    deviceName: "Asus Transformer",
                    bundleId: "com.android.chrome"
                }
            });
        }
    },
    desktop: {
        deviceName: "desktop",
        size: "1100x800",
        tags: "desktop",

        getDriver: function () {
            return createDriver(null, this.size);
        }
    }
};

var TEST_USER = {
    username: "testuser@example.com",
    password: "test123"
};


function openDriver(url, device) {
    var driver = device.getDriver();

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
        var driver = openDriver(url, device);
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
    export.openDriver = openDriver;
    export.testOnAllDevices = testOnAllDevices;
    export.TEST_USER = TEST_USER;
})(this);
