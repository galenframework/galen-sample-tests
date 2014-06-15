load("init.js");
load("pages/WelcomePage.js");

testOnAllDevices("Welcome page", "/", function (driver, device) {
    new WelcomePage(driver).waitForIt();
    checkLayout(driver, "specs/welcomePage.spec", device.tags);
});
