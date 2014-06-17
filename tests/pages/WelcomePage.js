importClass(org.openqa.selenium.interactions.Actions);

this.WelcomePage = function (driver) {
    GalenPages.extendPage(this, driver, {
        loginButton: "#welcome-page .button-login",

        hoverFirstMenuItem: function () {
            var actions = new Actions(this.driver);
            actions.moveToElement(this.findChild("xpath: //*[@id='menu']//li/a[1]")).perform();
        }
    });
};
