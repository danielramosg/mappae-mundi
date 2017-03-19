import UIStrings from '../config/strings.json';

export default class UI {
  constructor() {
    this.language = 'en';
    this.isCountriesVisible = true;
    this.isGraticuleVisible = true;
    this.isRasterVisible = false;

    this.helpFile = undefined;
  }

  init() {
    this.injectStrings();
  }

  setLanguage(langCode) {
    this.language = langCode;

    // Reload the current help file with the new language
    if (this.helpFile !== undefined) {
      this.displayHelpFile();
    }

    // Inject translatable strings
    this.injectStrings();
  }

  injectStrings() {
    $('[data-ui-str]').each((i, element) => {
      $(element).html(this.str($(element).attr('data-ui-str')));
    });
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

  str(identifier) {
    if (UIStrings[identifier] !== undefined &&
        UIStrings[identifier][this.getLanguage()] !== undefined) {
      return UIStrings[identifier][this.getLanguage()];
    }
    console.trace(`Requested undefined UI String '${identifier}'`);
    return '';
  }
}
