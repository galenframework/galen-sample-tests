load("init.js");
load("pages/WelcomePage.js");

testOnAllDevices("Welcome page", "/", function (driver, device) {
    new WelcomePage(driver).waitForIt();
    checkLayout(driver, "specs/welcomePage.spec", device.tags);
});



testOnDevice(devices.desktop, "Menu Highlight", "/", function (driver, device) {
    var welcomePage = new WelcomePage(driver).waitForIt();

    checkLayout(driver, "specs/menuHighlight.spec", ["usual"]);

    welcomePage.hoverFirstMenuItem();

    checkLayout(driver, "specs/menuHighlight.spec", ["hovered"]);
});
