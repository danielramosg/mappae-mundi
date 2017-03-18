import UI from './ui';

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
