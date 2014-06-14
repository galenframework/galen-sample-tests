load("init.js");

testOnAllDevices("Welcome page", "/", function (driver, device) {
    checkLayout(driver, "specs/welcomePage.spec", device.tags);
});
