import UI from './ui';

// Init UI
const ui = new UI();
window.SoEUI = ui;

$(() => {
  ui.init();

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
    ui.displayHelpFile($(ev.target).attr('data-ui-help'), 'right');
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Hook info pane close buttons
  $('.info_pane-close').click((ev) => {
    ui.hideInfo();
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Set keyboard commands
  $(window).on('keypress', (ev) => {
    // 1 - Toggle countries visible
    if (ev.which === '1'.charCodeAt()) {
      ui.setCountriesVisible(!ui.getCountriesVisible());
    // 2 - Toggle graticule visible
    } else if (ev.which === '2'.charCodeAt()) {
      ui.setGraticuleVisible(!ui.getGraticuleVisible());
    // 3 - Toggle raster visible
    } else if (ev.which === '3'.charCodeAt()) {
      ui.setRasterVisible(!ui.getRasterVisible());
    } else if (ev.which === 'n'.charCodeAt() || ev.which === 'N'.charCodeAt()) {
      ui.centerMap('north');
    } else if (ev.which === 's'.charCodeAt() || ev.which === 'S'.charCodeAt()) {
      ui.centerMap('south');
    } else if (ev.which === 'e'.charCodeAt() || ev.which === 'E'.charCodeAt()) {
      ui.centerMap('equator');
    } else if (ev.which === 'l'.charCodeAt() || ev.which === 'L'.charCodeAt()) {
      ui.centerMap('location');
    }
  });
});
