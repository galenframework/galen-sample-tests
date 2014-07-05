this.AddNotePage = function (driver) {
    GalenPages.extendPage(this, driver, {
        title: "input[name='note.title']",
        description: "textarea[name='note.description']",
        addNoteButton: "button.btn-primary"
    });
};