load("WelcomePage.js");

this.LoginPage = function (driver) {
    GalenPages.extendPage(this, driver, {
        username: "input[name='login.username']",
        password: "input[name='login.password']",
        loginButton: "button.button-login"
    }, {
        // Declaring secondary fields so they are not used in 'waitForIt' function
        errorMessage: "#login-error-message"
    });
};
