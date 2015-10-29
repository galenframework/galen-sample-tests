
function inSauceLabs(deviceName, tags, gridSettings) {
    return new Device(deviceName, tags, function () {
        return createGridDriver(System.getProperty("saucelabs.url"), gridSettings);
    });
}

var sauceLabsDevices = {
    htcOneX: inSauceLabs("HTC One X", ["mobile"], {
        browser: "android",
        desiredCapabilities: {
            platform: "Linux",
            version: "4.1",
            deviceName: "HTC One X Emulator",
            deviceOrientation: "portrait"
        }
    }),
    googleNexus7C: inSauceLabs("Google Nexus 7C", ["tablet"], {
        browser: "android",
        desiredCapabilities: {
            platform: "Linux",
            version: "4.1",
            deviceName: "Google Nexus 7C Emulator",
            deviceOrientation: "portrait"
        }
    }),
    Windows_10_IE11: inSauceLabs("Internet Explorer 11", ["desktop"], {
        browser: "internet explorer",
        desiredCapabilities: {
            platform: "Windows 10",
            version: "11.0"
        }
    }),
    iPhone_iOS_6: inSauceLabs("iPhone iOS 6.0", ["mobile"], {
        browser: "iphone",
        desiredCapabilities: {
            platform: "OS X 10.10",
            version: "6.0",
            deviceName: "iPhone Simulator",
            deviceOrientation: "portrait"
        }
    }),
    iPad_6: inSauceLabs("iPad IOS 6.0", ["tablet"], {
        browser: "iphone",
        desiredCapabilities: {
            platform: "OS X 10.10",
            version: "6.0",
            deviceName: "iPad Simulator",
            deviceOrientation: "portrait"
        }
    }),
    iPhone_iOS_8: inSauceLabs("iPhone iOS 8.0", ["mobile"], {
        browser: "iphone",
        desiredCapabilities: {
            platform: "OS X 10.10",
            version: "8.0",
            deviceName: "iPhone Simulator",
            deviceOrientation: "portrait"
        }
    })
};



(function (export) {
    export.sauceLabsDevices = sauceLabsDevices;
    export.inSauceLabs = inSauceLabs;
})(this);
