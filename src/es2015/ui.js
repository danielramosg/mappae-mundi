export default class UI {
  constructor() {
    this.language = 'en';
    this.helpFile = undefined;
  }

  setLanguage(langCode) {
    this.language = langCode;

    // Reload the current help file with the new language
    if (this.helpFile !== undefined) {
      this.displayHelpFile();
    }
  }

  getLanguage() {
    return this.language;
  }

  displayHelpFile(helpFileID = this.helpFile) {
    d3.text(`./txt/${this.getLanguage()}/${helpFileID}.html`, (error, text) => {
      if (error) throw error;
      document.getElementById('text_tag').innerHTML = text;
      this.helpFile = helpFileID;
    });
  }
}
