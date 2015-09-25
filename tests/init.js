var config = loadConfig();
var domain = config.domain;
var defaultBrowser = config.defaultBrowser;
var devices = config.devices;
var gridUrl = config.gridUrl;
var customConfig = config.config;

var testOnlyPrefixes = [];

function loadConfig() {
    var System = this.System;

    var configPath = System.getenv("GALEN_CONFIG") || "./galen.local.json";

    var configStr = readFile(configPath);
    var config = JSON.parse(configStr);

    var envGridUrl = null;

    var envDomain = System.getenv("GALEN_DOMAIN");
    if (envDomain) {
        config.domain = "" + envDomain;
    } else if (!config.domain){
        config.domain = "localhost:3000";
    }

    envGridUrl = System.getenv("GALEN_GRID_URL");
    if (envGridUrl) {
        config.gridUrl = "" + envGridUrl;
    } else if (!config.gridUrl) {
        config.gridUrl = "";
    }

    if (!config.defaultBrowser) {
        config.defaultBrowser = "firefox";
    }

    if (!config.devices) {
        config.devices = {};
    }

    var allowedDevices = ["desktop", "mobile", "tablet"];

    var devices = {};
    allowedDevices.forEach(function (tag) {
        if (tag in config.devices) {
            devices[tag] = config.devices[tag];
        } else {
            devices[tag] = {
                browser: "",
                deviceName: tag,
                skip: true
            };
        }

        if (!devices[tag].tags) {
            devices[tag].tags = [ tag ];
        }

    });

    config.devices = devices;

    return config;
};

function openDriver(url, device) {
    var driver;

    if (gridUrl) {
        driver = createGridDriver(gridUrl, device);
    } else {
        driver = createDriver(null, device.size, device.browser || defaultBrowser);
    }

    session.put("driver", driver);

    if (url != null) {
        if (url.indexOf("http://") != 0 && url.indexOf("https://") != 0) {
            url = "http://" + domain + url;
        }
        driver.get(url);
    } else {
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

function _test(testNamePrefix, url, device, callback) {
    var testName = (testNamePrefix + " on ${deviceName} device");

    if (device == null) {
        console.log("DEVICE NOT FOUND: " + testName);
    } else if (device.skip) {
        // don"t run test, since it should be skipped
        console.log("SKIP: " + testName.replace("${deviceName}", device.deviceName));
    } else {
        var browser = device.browser || defaultBrowser;
        test(testName + " on " + browser, function (device) {
            if (testOnlyPrefixes.length != 0 && testOnlyPrefixes.indexOf(testNamePrefix) == -1) {
                console.log("= SKIP ( 'only' keyword found in different test ) = ");
                console.log(" ");
            } else {
                var driver = openDriver(url, device);
                callback.call(this, driver, device);
            }
        });
    }
}

function testOnAllDevices(testNamePrefix, url, callback) {
    forAll(devices, function (device) {
        _test(testNamePrefix, url, device, callback);
    });
}

testOnAllDevices.only = function (testNamePrefix, url, callback) {
    testOnlyPrefixes.push(testNamePrefix);
    return testOnAllDevices(testNamePrefix, url, callback);
};

function testOnDevice(device, testNamePrefix, url, callback) {
    forOnly(device, function() {
        _test(testNamePrefix, url, device, callback);
    });
}

testOnDevice.only = function testOnDevice(device, testNamePrefix, url, callback) {
    testOnlyPrefixes.push(testNamePrefix);
    return testOnDevice(device, testNamePrefix, url, callback);
};

function getConfig() {
    return customConfig;
}

/*
 * Exporting functions to all other tests that will use this script
 */
(function (export) {
    export.devices = devices;
    export.openDriver = openDriver;
    export.testOnAllDevices = testOnAllDevices;
    export.getConfig = getConfig;
})(this);
