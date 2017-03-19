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
    this.setLanguage('en');
  }

  setLanguage(langCode) {
    this.language = langCode;

    // Sets a language class in the body
    $('body').removeClass((index, className) => {
      return (className.match(/(^|\s)lang-\S+/g) || []).join(' ');
    });
    $('body').addClass(`lang-${langCode}`);

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
      this.displayInfoRight(text);
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

  displayInfoLeft(content) {
    $('.map_tag').removeClass('docked-left');
    $('.map_tag').addClass('docked-right');

    $('.info_pane-left .content').html(content);
    $('.info_pane-right').removeClass('visible');
    $('.info_pane-left').addClass('visible');
  }

  displayInfoRight(content) {
    $('.map_tag').removeClass('docked-right');
    $('.map_tag').addClass('docked-left');

    $('.info_pane-right .content').html(content);
    $('.info_pane-left').removeClass('visible');
    $('.info_pane-right').addClass('visible');
  }

  hideInfo() {
    $('.map_tag').removeClass('docked-right');
    $('.map_tag').removeClass('docked-left');

    $('.info_pane-left').removeClass('visible');
    $('.info_pane-right').removeClass('visible');
  }
}
