load("pages/LoginPage.js");
load("pages/MyNotesPage.js");

var config = getConfig();

function loginAsTestUser(driver) {
    new WelcomePage(driver)
        .waitForIt()
        .loginButton.click();

    new LoginPage(driver)
        .waitForIt()
        .loginAs(config.TEST_USER);

    return new MyNotesPage(driver).waitForIt();
}
