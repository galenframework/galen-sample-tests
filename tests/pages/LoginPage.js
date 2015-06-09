load("WelcomePage.js");

this.LoginPage = $page("Login page", {
    username: "input[name='login.username']",
    password: "input[name='login.password']",
    loginButton: "button.button-login"
}, {
    // Declaring secondary fields so they are not used in 'waitForIt' function
    errorMessage: "#login-error-message",

    loginAs: function (user) {
        var thisPage = this;
        logged("Login as " + user.username + " with password " + user.password, function () {
            thisPage.username.typeText(user.username);
            thisPage.password.typeText(user.password);
            thisPage.loginButton.click();
        });
    }
});
