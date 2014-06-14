
var domain = "testapp.galenframework.com";

var devices = {
    mobile: {
        deviceName: "mobile",
        size: "450x800",
        tags: ["mobile"]
    },
    tablet: {
        deviceName: "tablet",
        size: "600x800",
        tags: ["tablet"]
    },
    desktop: {
        deviceName: "desktop",
        size: "1100x800",
        tags: ["desktop"]
    }
};


function openDriver(url, size) {
    var driver = createDriver(null, size);

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



function testOnAllDevices(testNamePrefix, url, callback) {
    forAll(devices, function () {
        test(testNamePrefix + " on ${deviceName} device", function (device) {
            var driver = openDriver(url, device.size);
            callback.call(this, driver, device);
        });
    });
}


/*
    Exporting functions to all other tests that will use this script
*/
(function (export) {
    export.devices = devices;
    export.openDriver = openDriver;
    export.testOnAllDevices = testOnAllDevices;
})(this);
