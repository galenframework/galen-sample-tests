load("init.js");
load("pages/LoginPage.js");
load("pages/MyNotesPage.js");
load("commons.js");

testOnAllDevices("My notes page", "/", function (driver, device) {
    loginAsTestUser(driver);
    checkLayout(driver, "specs/myNotesPage.gspec", device.tags);
});
