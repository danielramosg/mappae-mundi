export default class UI {
  constructor() {
    this.language = 'en';
    this.helpFile = undefined;

    this.isCountriesVisible = true;
    this.isGraticuleVisible = true;
    this.isRasterVisible = false;
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

  getCountriesVisible() {
    return this.isCountriesVisible;
  }

  getGraticuleVisible() {
    return this.isGraticuleVisible;
  }

  getRasterVisible() {
    return this.isRasterVisible;
  }

  setCountriesVisible(isVisible) {
    this.isCountriesVisible = !!isVisible;
    $('.boundary').css({ visibility: this.getCountriesVisible() ? 'visible' : 'hidden' });
  }

  setGraticuleVisible(isVisible) {
    this.isGraticuleVisible = !!isVisible;
    $('.graticule').css({ visibility: this.getGraticuleVisible() ? 'visible' : 'hidden' });
  }

  setRasterVisible(isVisible) {
    this.isRasterVisible = !!isVisible;
    $('.land').css({ visibility: !isVisible ? 'visible' : 'hidden' });
    $('#map_tag canvas').css({ visibility: this.getRasterVisible() ? 'visible' : 'hidden' });
  }


}
