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

// Init UI
const ui = new UI();
window.SoEUI = ui;

$(() => {
  // Hook language change links
  $('[data-ui-lang-set]').on('click', (ev) => {
    const $target = $(ev.target);
    ui.setLanguage($target.attr('data-ui-lang-set'));
    $('a[data-ui-lang-set]').removeClass('active');
    $target.addClass('active');
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Hook help files
  $('[data-ui-help]').on('click', (ev) => {
    ui.displayHelpFile($(ev.target).attr('data-ui-help'));
    ev.preventDefault();
    ev.stopPropagation();
  });
  // Load default help file
  ui.displayHelpFile('info_map');
});
