load("init.js");
load("pages/LoginPage.js");


testOnAllDevices("Login page", "/", function (driver, device) {
    var welcomePage = new WelcomePage(driver).waitForIt();
    welcomePage.loginButton.click();

    var loginPage = new LoginPage(driver).waitForIt();

    checkLayout(driver, "specs/loginPage.spec", device.tags);
});
