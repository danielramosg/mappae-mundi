import UIStrings from '../config/strings.json';
import HelpCfg from '../config/help.json';

export default class UI {
  constructor() {
    this.language = 'en';
    this.isCountriesVisible = true;
    this.isGraticuleVisible = true;
    this.isRasterVisible = false;

    this.helpFile = undefined;
    this.tool = 'rotate';
    this.projection = 'platecarre';
  }

  init() {
    this.setLanguage('en');
    this.setTool('rotate');
    this.setProjection('platecarre');
    this.initToolButtons();
    this.initProjectionButtons();
    this.initCommandButtons();
    this.initHelpBanners();
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

  displayHelpFile(helpFileID = this.helpFile, pane = this.helpPane) {
    d3.text(`./txt/${this.getLanguage()}/${helpFileID}.html`, (error, text) => {
      if (error) throw error;
      this.displayInfo(text, pane);
      this.helpFile = helpFileID;
      this.helpPane = pane;
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
    if (isVisible) {
      $('.map_tag').addClass('raster-visible');
    } else {
      $('.map_tag').removeClass('raster-visible');
    }
  }

  str(identifier) {
    if (UIStrings[identifier] !== undefined &&
        UIStrings[identifier][this.getLanguage()] !== undefined) {
      return UIStrings[identifier][this.getLanguage()];
    }
    console.trace(`Requested undefined UI String '${identifier}'`);
    return '';
  }

  displayInfo(content, pane) {
    console.log(pane);
    $('.map_tag').removeClass('docked-right');
    $('.map_tag').removeClass('docked-left');
    $('.map_tag').addClass(`docked-${pane}`);

    $(`.info_pane-${pane} .content`).html(content);
    $('.info_pane').removeClass('visible');
    $(`.info_pane-${pane}`).addClass('visible');
  }

  hideInfo() {
    $('.map_tag').removeClass('docked-right');
    $('.map_tag').removeClass('docked-left');

    $('.info_pane-left').removeClass('visible');
    $('.info_pane-right').removeClass('visible');
  }

  hideInfoLeft() {
    $('.map_tag').removeClass('docked-left');
    $('.info_pane-left').removeClass('visible');
  }

  hideInfoRight() {
    $('.map_tag').removeClass('docked-right');
    $('.info_pane-right').removeClass('visible');
  }

  initToolButtons() {
    $('[data-ui-tool]').on('click', (ev) => {
      this.setTool($(ev.target).attr('data-ui-tool'));
      ev.preventDefault();
      ev.stopPropagation();
    });
  }

  getTool() {
    return this.tool;
  }

  setTool(aTool) {
    this.tool = aTool;
    $('[data-ui-tool]').removeClass('active');
    $(`[data-ui-tool=${aTool}]`).addClass('active');
    updateMap();
    this.hideInfoLeft();
    this.showHelpBanner('left', 'tools', aTool);
  }

  initProjectionButtons() {
    $('[data-ui-projection]').on('click', (ev) => {
      this.setProjection($(ev.target).attr('data-ui-projection'));
      ev.preventDefault();
      ev.stopPropagation();
    });
  }

  getProjection() {
    return this.projection;
  }

  setProjection(aProjection) {
    this.projection = aProjection;
    $('[data-ui-projection]').removeClass('active');
    $(`[data-ui-projection=${aProjection}]`).addClass('active');
    updateMap();
    this.hideInfoRight();
    this.showHelpBanner('right', 'projections', aProjection);
  }

  initHelpBanners() {
    $('.help-banner-left').on('click', (ev) => {
      this.displayHelpFile($(ev.target).attr('data-ui-banner-help'), 'left');
      ev.preventDefault();
      ev.stopPropagation();
    });

    $('.help-banner-right').on('click', (ev) => {
      this.displayHelpFile($(ev.target).attr('data-ui-banner-help'), 'right');
      ev.preventDefault();
      ev.stopPropagation();
    });
  }

  getHelpBannerText(category, item) {
    return `${this.str('MORE_ABOUT')} ${HelpCfg[category][item].name[this.getLanguage()]}`;
  }

  getHelpBannerPage(category, item) {
    return HelpCfg[category][item].file;
  }

  showHelpBanner(bannerID, category, item) {
    $(`.help-banner-${bannerID}`)
      .html(this.getHelpBannerText(category, item))
      .attr('data-ui-banner-help', this.getHelpBannerPage(category, item))
      .fadeIn()
      .css('display', 'inline-block');
  }

  hideHelpBanner(bannerID) {
    $(`.help-banner-${bannerID}`).fadeOut();
  }

  initCommandButtons() {
    $('[data-ui-command=clear]').on('click', (ev) => {
      this.clearMarks();
      ev.preventDefault();
      ev.stopPropagation();
    });

    $('[data-ui-command=undo]').on('click', (ev) => {
      this.undoMark();
      ev.preventDefault();
      ev.stopPropagation();
    });
  }

  clearMarks() {
    clearGeodesic();
    clearLoxodrome();
    clearEllipses();
  }

  undoMark() {
    undoCommand();
  }
}
