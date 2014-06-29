this.MyNotesPage = function (driver) {
    GalenPages.extendPage(this, driver,  {
        addNoteButton: "xpath: //button[.='Add note']"
    });
};
