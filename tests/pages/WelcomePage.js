this.WelcomePage = function (driver) {
    GalenPages.extendPage(this, driver, {
        loginButton: "#welcome-page .button-login"
    });
};
