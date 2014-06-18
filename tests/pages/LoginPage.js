load("WelcomePage.js");

this.LoginPage = function (driver) {
    GalenPages.extendPage(this, driver, {
        usernameTextfield: "input[name='login.username']",
        passwordTextfield: "input[name='login.password']",
        loginButton: "button.button-login"
    });
};
