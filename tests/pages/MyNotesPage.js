this.MyNotesPage = function (driver) {
    GalenPage.extendPage(this, driver,  {
        addNoteButton: "xpath: //button[.='Add note']"
    });
};
