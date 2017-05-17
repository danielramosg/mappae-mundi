(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "tools": {
    "rotate": {
      "name": {
        "en": "the aspect of the map",
        "pt": "o aspecto do mapa",
        "fr": "de l'aspect d'une carte"
      },
      "file": "info_rotate"
    },
    "indicatrix": {
      "name": {
        "en": "the Tissot indicatrix",
        "pt": "a indicatriz de Tissot",
        "fr": "de l'indicatrice de Tissot"
      },
      "file": "info_tissot"
    },
    "geodesic": {
      "name": {
        "en": "geodesics",
        "pt": "as geodésicas",
        "fr": "des géodésiques"
      },
      "file": "info_geodesic"
    },
    "loxodrome": {
      "name": {
        "en": "loxodromes",
        "pt": "as loxodrómias",
        "fr": "des loxodromies"
      },
      "file": "info_loxodrome"
    }
  },
  "projections": {
    "platecarre": {
      "file": "platecarre",
      "name": {
        "en": "the Plate Carrée projection",
        "pt": "a projeção Cilíndrica equidistante",
        "fr": "de la projection plate carrée"
      }
    },
    "mercator": {
      "file": "mercator",
      "name": {
        "en": "the Mercator projection",
        "pt": "a projeção de Mercator",
        "fr": "de la projection de Mercator"
      }
    },
    "gallpeters": {
      "file": "gallpeters",
      "name": {
        "en": "the Gall-Peters projection",
        "pt": "a projeção Cilíndrica equivalente",
        "fr": "de la projection de Gall-Peters"
      }
    },
    "mollweide": {
      "file": "mollweide",
      "name": {
        "en": "the Mollweide projection",
        "pt": "a projeção de Mollweide",
        "fr": "de la projection de Mollweide"
      }
    },
    "aziequi": {
      "file": "aziequi",
      "name": {
        "en": "the Azimuthal equidistant projection",
        "pt": "a projeção Azimutal equidistante",
        "fr": "de la projection de Postel"
      }
    },
    "gnomo": {
      "file": "gnomo",
      "name": {
        "en": "the Gnomonic projection",
        "pt": "a projeção Gnomónica",
        "fr": "de la projection gnomonique"
      }
    },
    "stereo": {
      "file": "stereo",
      "name": {
        "en": "the Stereographic projection",
        "pt": "a projeção Estereográfica",
        "fr": "de la projection stéréographique"
      }
    },
    "ortho": {
      "file": "ortho",
      "name": {
        "en": "the Orthographic projection",
        "pt": "a projeção Ortográfica",
        "fr": "de la projection orthograpique"
      }
    }
  }
}
},{}],2:[function(require,module,exports){
module.exports={
  "APP_TITLE": {
    "en": "Mappae Mundi",
    "pt": "Mappae Mundi",
    "fr": "Mappae Mundi"
  },
  "INTRO": {
    "en": "Intro",
    "pt": "Intro",
    "fr": "Intro"
  },
  "CREDITS": {
    "en": "Credits",
    "pt": "Créditos",
    "fr": "Crédits"
  },
  "MORE_ABOUT": {
    "en": "About",
    "pt": "Sobre",
    "fr": "À propos"
  },
  "PR_ABBR_PLATECARRE": {
    "en": "Pl",
    "pt": "CEd",
    "fr": "Pl"
  },
  "PR_ABBR_MERCATOR": {
    "en": "Me",
    "pt": "Mer",
    "fr": "Me"
  },
  "PR_ABBR_GALLPETERS": {
    "en": "Ga",
    "pt": "CEv",
    "fr": "Ga"
  },
  "PR_ABBR_MOLLWEIDE": {
    "en": "Mw",
    "pt": "Mlw",
    "fr": "Mw"
  },
  "PR_ABBR_AZIEQUI": {
    "en": "Az",
    "pt": "AzE",
    "fr": "Po"
  },
  "PR_ABBR_GNOMO": {
    "en": "Gn",
    "pt": "Gno",
    "fr": "Gn"
  },
  "PR_ABBR_STEREO": {
    "en": "St",
    "pt": "Est",
    "fr": "St"
  },
  "PR_ABBR_ORTHO": {
    "en": "Or",
    "pt": "Ort",
    "fr": "Or"
  },
  "": {
    "en": "",
    "pt": "",
    "fr": ""
  }
}

},{}],3:[function(require,module,exports){
'use strict';

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init UI
var ui = new _ui2.default();
window.SoEUI = ui;

$(function () {
  ui.init();

  // Hook language change links
  $('[data-ui-lang-set]').on('click', function (ev) {
    var $target = $(ev.target);
    ui.setLanguage($target.attr('data-ui-lang-set'));
    $('a[data-ui-lang-set]').removeClass('active');
    $target.addClass('active');
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Hook help files
  $('[data-ui-help]').on('click', function (ev) {
    ui.displayHelpFile($(ev.target).attr('data-ui-help'), 'right');
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Hook info pane close buttons
  $('.info_pane-close').click(function (ev) {
    ui.hideInfo();
    ev.preventDefault();
    ev.stopPropagation();
  });

  // Set keyboard commands
  $(window).on('keypress', function (ev) {
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

},{"./ui":4}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _strings = require('../config/strings.json');

var _strings2 = _interopRequireDefault(_strings);

var _help = require('../config/help.json');

var _help2 = _interopRequireDefault(_help);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
  function UI() {
    _classCallCheck(this, UI);

    this.language = 'en';
    this.isCountriesVisible = true;
    this.isGraticuleVisible = true;
    this.isRasterVisible = false;

    this.helpFile = undefined;
    this.tool = 'rotate';
    this.projection = 'platecarre';

    this.helpBanners = {};
  }

  _createClass(UI, [{
    key: 'init',
    value: function init() {
      this.setLanguage('en');
      this.setTool('rotate');
      this.setProjection('platecarre');
      this.initToolButtons();
      this.initProjectionButtons();
      this.initCommandButtons();
      this.initHelpBanners();
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(langCode) {
      this.language = langCode;

      // Sets a language class in the body
      $('body').removeClass(function (index, className) {
        return (className.match(/(^|\s)lang-\S+/g) || []).join(' ');
      });
      $('body').addClass('lang-' + langCode);

      // Activate the selected language
      $('.lang-selector li a[data-ui-lang-set]').removeClass('active');
      $('.lang-selector li a[data-ui-lang-set=' + langCode + ']').addClass('active');

      // Reload the current help file with the new language
      if (this.helpFile !== undefined) {
        this.displayHelpFile();
      }

      // Reload the help banners
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = Object.keys(this.helpBanners)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var bannerID = _step.value;

          if (this.helpBanners[bannerID]) {
            this.showHelpBanner(bannerID, this.helpBanners[bannerID].category, this.helpBanners[bannerID].item);
          }
        }

        // Inject translatable strings
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.injectStrings();
    }
  }, {
    key: 'injectStrings',
    value: function injectStrings() {
      var _this = this;

      $('[data-ui-str]').each(function (i, element) {
        $(element).html(_this.str($(element).attr('data-ui-str')));
      });
    }
  }, {
    key: 'getLanguage',
    value: function getLanguage() {
      return this.language;
    }
  }, {
    key: 'displayHelpFile',
    value: function displayHelpFile() {
      var _this2 = this;

      var helpFileID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.helpFile;
      var pane = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.helpPane;

      d3.text('./txt/' + this.getLanguage() + '/' + helpFileID + '.html', function (error, text) {
        if (error) throw error;
        _this2.displayInfo(text, pane);
        _this2.helpFile = helpFileID;
        _this2.helpPane = pane;
      });
    }
  }, {
    key: 'getCountriesVisible',
    value: function getCountriesVisible() {
      return this.isCountriesVisible;
    }
  }, {
    key: 'getGraticuleVisible',
    value: function getGraticuleVisible() {
      return this.isGraticuleVisible;
    }
  }, {
    key: 'getRasterVisible',
    value: function getRasterVisible() {
      return this.isRasterVisible;
    }
  }, {
    key: 'setCountriesVisible',
    value: function setCountriesVisible(isVisible) {
      this.isCountriesVisible = !!isVisible;
      $('.boundary').css({ visibility: this.getCountriesVisible() ? 'visible' : 'hidden' });
    }
  }, {
    key: 'setGraticuleVisible',
    value: function setGraticuleVisible(isVisible) {
      this.isGraticuleVisible = !!isVisible;
      $('.graticule').css({ visibility: this.getGraticuleVisible() ? 'visible' : 'hidden' });
    }
  }, {
    key: 'setRasterVisible',
    value: function setRasterVisible(isVisible) {
      this.isRasterVisible = !!isVisible;
      $('.land').css({ visibility: !isVisible ? 'visible' : 'hidden' });
      $('#map_tag canvas').css({ visibility: this.getRasterVisible() ? 'visible' : 'hidden' });
      if (isVisible) {
        $('.map_tag').addClass('raster-visible');
      } else {
        $('.map_tag').removeClass('raster-visible');
      }
    }
  }, {
    key: 'str',
    value: function str(identifier) {
      if (_strings2.default[identifier] !== undefined && _strings2.default[identifier][this.getLanguage()] !== undefined) {
        return _strings2.default[identifier][this.getLanguage()];
      }
      console.trace('Requested undefined UI String \'' + identifier + '\'');
      return '';
    }
  }, {
    key: 'displayInfo',
    value: function displayInfo(content, pane) {
      console.log(pane);
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').removeClass('docked-left');
      $('.map_tag').addClass('docked-' + pane);

      $('.info_pane-' + pane + ' .content').html(content);
      $('.info_pane').removeClass('visible');
      $('.info_pane-' + pane).addClass('visible');
    }
  }, {
    key: 'hideInfo',
    value: function hideInfo() {
      this.helpFile = null;
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').removeClass('docked-left');

      $('.info_pane-left').removeClass('visible');
      $('.info_pane-right').removeClass('visible');
    }
  }, {
    key: 'hideInfoLeft',
    value: function hideInfoLeft() {
      this.helpFile = null;
      $('.map_tag').removeClass('docked-left');
      $('.info_pane-left').removeClass('visible');
    }
  }, {
    key: 'hideInfoRight',
    value: function hideInfoRight() {
      this.helpFile = null;
      $('.map_tag').removeClass('docked-right');
      $('.info_pane-right').removeClass('visible');
    }
  }, {
    key: 'initToolButtons',
    value: function initToolButtons() {
      var _this3 = this;

      $('[data-ui-tool]').on('click', function (ev) {
        _this3.setTool($(ev.target).attr('data-ui-tool'));
        ev.preventDefault();
        ev.stopPropagation();
      });

      var indicatrixTimer = null;
      $('[data-ui-tool=indicatrix]').on('mousedown', function () {
        indicatrixTimer = setTimeout(function () {
          sampleEllipses();
        }, 1000);
      });

      $(document).on('mouseup', function () {
        if (indicatrixTimer !== null) {
          window.clearTimeout(indicatrixTimer);
          indicatrixTimer = null;
        }
      });
    }
  }, {
    key: 'getTool',
    value: function getTool() {
      return this.tool;
    }
  }, {
    key: 'setTool',
    value: function setTool(aTool) {
      this.tool = aTool;
      $('[data-ui-tool]').removeClass('active');
      $('[data-ui-tool=' + aTool + ']').addClass('active');
      updateMap();
      this.hideInfoLeft();
      this.showHelpBanner('left', 'tools', aTool);
    }
  }, {
    key: 'initProjectionButtons',
    value: function initProjectionButtons() {
      var _this4 = this;

      $('[data-ui-projection]').on('click', function (ev) {
        _this4.setProjection($(ev.target).attr('data-ui-projection'));
        ev.preventDefault();
        ev.stopPropagation();
      });
    }
  }, {
    key: 'getProjection',
    value: function getProjection() {
      return this.projection;
    }
  }, {
    key: 'setProjection',
    value: function setProjection(aProjection) {
      this.projection = aProjection;
      $('[data-ui-projection]').removeClass('active');
      $('[data-ui-projection=' + aProjection + ']').addClass('active');
      updateMap();
      this.hideInfoRight();
      this.showHelpBanner('right', 'projections', aProjection);
    }
  }, {
    key: 'initHelpBanners',
    value: function initHelpBanners() {
      var _this5 = this;

      $('.help-banner-left').on('click', function (ev) {
        _this5.displayHelpFile($(ev.target).attr('data-ui-banner-help'), 'left');
        ev.preventDefault();
        ev.stopPropagation();
      });

      $('.help-banner-right').on('click', function (ev) {
        _this5.displayHelpFile($(ev.target).attr('data-ui-banner-help'), 'right');
        ev.preventDefault();
        ev.stopPropagation();
      });
    }
  }, {
    key: 'getHelpBannerText',
    value: function getHelpBannerText(category, item) {
      return this.str('MORE_ABOUT') + ' ' + _help2.default[category][item].name[this.getLanguage()];
    }
  }, {
    key: 'getHelpBannerPage',
    value: function getHelpBannerPage(category, item) {
      return _help2.default[category][item].file;
    }
  }, {
    key: 'showHelpBanner',
    value: function showHelpBanner(bannerID, category, item) {

      this.helpBanners[bannerID] = { category: category, item: item };

      $('.help-banner-' + bannerID).html(this.getHelpBannerText(category, item)).attr('data-ui-banner-help', this.getHelpBannerPage(category, item)).fadeIn().css('display', 'inline-block');
    }
  }, {
    key: 'hideHelpBanner',
    value: function hideHelpBanner(bannerID) {
      this.helpBanners[bannerID] = null;
      $('.help-banner-' + bannerID).fadeOut();
    }
  }, {
    key: 'initCommandButtons',
    value: function initCommandButtons() {
      var _this6 = this;

      $('[data-ui-command=clear]').on('click', function (ev) {
        _this6.clearMarks();
        ev.preventDefault();
        ev.stopPropagation();
      });

      $('[data-ui-command=undo]').on('click', function (ev) {
        _this6.undoMark();
        ev.preventDefault();
        ev.stopPropagation();
      });
    }
  }, {
    key: 'clearMarks',
    value: function clearMarks() {
      clearGeodesic();
      clearLoxodrome();
      clearEllipses();
    }
  }, {
    key: 'undoMark',
    value: function undoMark() {
      undoCommand();
    }
  }, {
    key: 'centerMap',
    value: function centerMap(position) {
      if (position === 'north') {
        projection.rotate([0, -90]);
      } else if (position === 'south') {
        projection.rotate([0, 90]);
      } else if (position === 'equator') {
        projection.rotate([0, 0]);
      } else if (position === 'location') {
        projection.rotate(rotateToCurrentLocation);
      }
      updateMap();
    }
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/help.json":1,"../config/strings.json":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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O0FBTUEsUUFBRSx3QkFBRixFQUE0QixFQUE1QixDQUErQixPQUEvQixFQUF3QyxVQUFDLEVBQUQsRUFBUTtBQUM5QyxlQUFLLFFBQUw7QUFDQSxXQUFHLGNBQUg7QUFDQSxXQUFHLGVBQUg7QUFDRCxPQUpEO0FBS0Q7OztpQ0FFWTtBQUNYO0FBQ0E7QUFDQTtBQUNEOzs7K0JBRVU7QUFDVDtBQUNEOzs7OEJBRVMsUSxFQUFVO0FBQ2xCLFVBQUksYUFBYSxPQUFqQixFQUEwQjtBQUN4QixtQkFBVyxNQUFYLENBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUMsRUFBTCxDQUFsQjtBQUNELE9BRkQsTUFFTyxJQUFJLGFBQWEsT0FBakIsRUFBMEI7QUFDL0IsbUJBQVcsTUFBWCxDQUFrQixDQUFDLENBQUQsRUFBSSxFQUFKLENBQWxCO0FBQ0QsT0FGTSxNQUVBLElBQUksYUFBYSxTQUFqQixFQUE0QjtBQUNqQyxtQkFBVyxNQUFYLENBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBbEI7QUFDRCxPQUZNLE1BRUEsSUFBSSxhQUFhLFVBQWpCLEVBQTZCO0FBQ2xDLG1CQUFXLE1BQVgsQ0FBa0IsdUJBQWxCO0FBQ0Q7QUFDRDtBQUNEOzs7Ozs7a0JBdlJrQixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0b29sc1wiOiB7XG4gICAgXCJyb3RhdGVcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBhc3BlY3Qgb2YgdGhlIG1hcFwiLFxuICAgICAgICBcInB0XCI6IFwibyBhc3BlY3RvIGRvIG1hcGFcIixcbiAgICAgICAgXCJmclwiOiBcImRlIGwnYXNwZWN0IGQndW5lIGNhcnRlXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX3JvdGF0ZVwiXG4gICAgfSxcbiAgICBcImluZGljYXRyaXhcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBUaXNzb3QgaW5kaWNhdHJpeFwiLFxuICAgICAgICBcInB0XCI6IFwiYSBpbmRpY2F0cml6IGRlIFRpc3NvdFwiLFxuICAgICAgICBcImZyXCI6IFwiZGUgbCdpbmRpY2F0cmljZSBkZSBUaXNzb3RcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fdGlzc290XCJcbiAgICB9LFxuICAgIFwiZ2VvZGVzaWNcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcImdlb2Rlc2ljc1wiLFxuICAgICAgICBcInB0XCI6IFwiYXMgZ2VvZMOpc2ljYXNcIixcbiAgICAgICAgXCJmclwiOiBcImRlcyBnw6lvZMOpc2lxdWVzXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX2dlb2Rlc2ljXCJcbiAgICB9LFxuICAgIFwibG94b2Ryb21lXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJsb3hvZHJvbWVzXCIsXG4gICAgICAgIFwicHRcIjogXCJhcyBsb3hvZHLDs21pYXNcIixcbiAgICAgICAgXCJmclwiOiBcImRlcyBsb3hvZHJvbWllc1wiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19sb3hvZHJvbWVcIlxuICAgIH1cbiAgfSxcbiAgXCJwcm9qZWN0aW9uc1wiOiB7XG4gICAgXCJwbGF0ZWNhcnJlXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcInBsYXRlY2FycmVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgUGxhdGUgQ2FycsOpZSBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJhIHByb2plw6fDo28gQ2lsw61uZHJpY2EgZXF1aWRpc3RhbnRlXCIsXG4gICAgICAgIFwiZnJcIjogXCJkZSBsYSBwcm9qZWN0aW9uIHBsYXRlIGNhcnLDqWVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJtZXJjYXRvclwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtZXJjYXRvclwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBNZXJjYXRvciBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJhIHByb2plw6fDo28gZGUgTWVyY2F0b3JcIixcbiAgICAgICAgXCJmclwiOiBcImRlIGxhIHByb2plY3Rpb24gZGUgTWVyY2F0b3JcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJnYWxscGV0ZXJzXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImdhbGxwZXRlcnNcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR2FsbC1QZXRlcnMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwiYSBwcm9qZcOnw6NvIENpbMOtbmRyaWNhIGVxdWl2YWxlbnRlXCIsXG4gICAgICAgIFwiZnJcIjogXCJkZSBsYSBwcm9qZWN0aW9uIGRlIEdhbGwtUGV0ZXJzXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwibW9sbHdlaWRlXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcIm1vbGx3ZWlkZVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBNb2xsd2VpZGUgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwiYSBwcm9qZcOnw6NvIGRlIE1vbGx3ZWlkZVwiLFxuICAgICAgICBcImZyXCI6IFwiZGUgbGEgcHJvamVjdGlvbiBkZSBNb2xsd2VpZGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJhemllcXVpXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImF6aWVxdWlcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgQXppbXV0aGFsIGVxdWlkaXN0YW50IHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcImEgcHJvamXDp8OjbyBBemltdXRhbCBlcXVpZGlzdGFudGVcIixcbiAgICAgICAgXCJmclwiOiBcImRlIGxhIHByb2plY3Rpb24gZGUgUG9zdGVsXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZ25vbW9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ25vbW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR25vbW9uaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwiYSBwcm9qZcOnw6NvIEdub23Ds25pY2FcIixcbiAgICAgICAgXCJmclwiOiBcImRlIGxhIHByb2plY3Rpb24gZ25vbW9uaXF1ZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcInN0ZXJlb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJzdGVyZW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJhIHByb2plw6fDo28gRXN0ZXJlb2dyw6FmaWNhXCIsXG4gICAgICAgIFwiZnJcIjogXCJkZSBsYSBwcm9qZWN0aW9uIHN0w6lyw6lvZ3JhcGhpcXVlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwib3J0aG9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwib3J0aG9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgT3J0aG9ncmFwaGljIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcImEgcHJvamXDp8OjbyBPcnRvZ3LDoWZpY2FcIixcbiAgICAgICAgXCJmclwiOiBcImRlIGxhIHByb2plY3Rpb24gb3J0aG9ncmFwaXF1ZVwiXG4gICAgICB9XG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIkFQUF9USVRMRVwiOiB7XG4gICAgXCJlblwiOiBcIk1hcHBhZSBNdW5kaVwiLFxuICAgIFwicHRcIjogXCJNYXBwYWUgTXVuZGlcIixcbiAgICBcImZyXCI6IFwiTWFwcGFlIE11bmRpXCJcbiAgfSxcbiAgXCJJTlRST1wiOiB7XG4gICAgXCJlblwiOiBcIkludHJvXCIsXG4gICAgXCJwdFwiOiBcIkludHJvXCIsXG4gICAgXCJmclwiOiBcIkludHJvXCJcbiAgfSxcbiAgXCJDUkVESVRTXCI6IHtcbiAgICBcImVuXCI6IFwiQ3JlZGl0c1wiLFxuICAgIFwicHRcIjogXCJDcsOpZGl0b3NcIixcbiAgICBcImZyXCI6IFwiQ3LDqWRpdHNcIlxuICB9LFxuICBcIk1PUkVfQUJPVVRcIjoge1xuICAgIFwiZW5cIjogXCJBYm91dFwiLFxuICAgIFwicHRcIjogXCJTb2JyZVwiLFxuICAgIFwiZnJcIjogXCLDgCBwcm9wb3NcIlxuICB9LFxuICBcIlBSX0FCQlJfUExBVEVDQVJSRVwiOiB7XG4gICAgXCJlblwiOiBcIlBsXCIsXG4gICAgXCJwdFwiOiBcIkNFZFwiLFxuICAgIFwiZnJcIjogXCJQbFwiXG4gIH0sXG4gIFwiUFJfQUJCUl9NRVJDQVRPUlwiOiB7XG4gICAgXCJlblwiOiBcIk1lXCIsXG4gICAgXCJwdFwiOiBcIk1lclwiLFxuICAgIFwiZnJcIjogXCJNZVwiXG4gIH0sXG4gIFwiUFJfQUJCUl9HQUxMUEVURVJTXCI6IHtcbiAgICBcImVuXCI6IFwiR2FcIixcbiAgICBcInB0XCI6IFwiQ0V2XCIsXG4gICAgXCJmclwiOiBcIkdhXCJcbiAgfSxcbiAgXCJQUl9BQkJSX01PTExXRUlERVwiOiB7XG4gICAgXCJlblwiOiBcIk13XCIsXG4gICAgXCJwdFwiOiBcIk1sd1wiLFxuICAgIFwiZnJcIjogXCJNd1wiXG4gIH0sXG4gIFwiUFJfQUJCUl9BWklFUVVJXCI6IHtcbiAgICBcImVuXCI6IFwiQXpcIixcbiAgICBcInB0XCI6IFwiQXpFXCIsXG4gICAgXCJmclwiOiBcIlBvXCJcbiAgfSxcbiAgXCJQUl9BQkJSX0dOT01PXCI6IHtcbiAgICBcImVuXCI6IFwiR25cIixcbiAgICBcInB0XCI6IFwiR25vXCIsXG4gICAgXCJmclwiOiBcIkduXCJcbiAgfSxcbiAgXCJQUl9BQkJSX1NURVJFT1wiOiB7XG4gICAgXCJlblwiOiBcIlN0XCIsXG4gICAgXCJwdFwiOiBcIkVzdFwiLFxuICAgIFwiZnJcIjogXCJTdFwiXG4gIH0sXG4gIFwiUFJfQUJCUl9PUlRIT1wiOiB7XG4gICAgXCJlblwiOiBcIk9yXCIsXG4gICAgXCJwdFwiOiBcIk9ydFwiLFxuICAgIFwiZnJcIjogXCJPclwiXG4gIH0sXG4gIFwiXCI6IHtcbiAgICBcImVuXCI6IFwiXCIsXG4gICAgXCJwdFwiOiBcIlwiLFxuICAgIFwiZnJcIjogXCJcIlxuICB9XG59XG4iLCJpbXBvcnQgVUkgZnJvbSAnLi91aSc7XG5cbi8vIEluaXQgVUlcbmNvbnN0IHVpID0gbmV3IFVJKCk7XG53aW5kb3cuU29FVUkgPSB1aTtcblxuJCgoKSA9PiB7XG4gIHVpLmluaXQoKTtcblxuICAvLyBIb29rIGxhbmd1YWdlIGNoYW5nZSBsaW5rc1xuICAkKCdbZGF0YS11aS1sYW5nLXNldF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0ID0gJChldi50YXJnZXQpO1xuICAgIHVpLnNldExhbmd1YWdlKCR0YXJnZXQuYXR0cignZGF0YS11aS1sYW5nLXNldCcpKTtcbiAgICAkKCdhW2RhdGEtdWktbGFuZy1zZXRdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIEhvb2sgaGVscCBmaWxlc1xuICAkKCdbZGF0YS11aS1oZWxwXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIHVpLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1oZWxwJyksICdyaWdodCcpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIEhvb2sgaW5mbyBwYW5lIGNsb3NlIGJ1dHRvbnNcbiAgJCgnLmluZm9fcGFuZS1jbG9zZScpLmNsaWNrKChldikgPT4ge1xuICAgIHVpLmhpZGVJbmZvKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gU2V0IGtleWJvYXJkIGNvbW1hbmRzXG4gICQod2luZG93KS5vbigna2V5cHJlc3MnLCAoZXYpID0+IHtcbiAgICAvLyAxIC0gVG9nZ2xlIGNvdW50cmllcyB2aXNpYmxlXG4gICAgaWYgKGV2LndoaWNoID09PSAnMScuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5zZXRDb3VudHJpZXNWaXNpYmxlKCF1aS5nZXRDb3VudHJpZXNWaXNpYmxlKCkpO1xuICAgIC8vIDIgLSBUb2dnbGUgZ3JhdGljdWxlIHZpc2libGVcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnMicuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5zZXRHcmF0aWN1bGVWaXNpYmxlKCF1aS5nZXRHcmF0aWN1bGVWaXNpYmxlKCkpO1xuICAgIC8vIDMgLSBUb2dnbGUgcmFzdGVyIHZpc2libGVcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnMycuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5zZXRSYXN0ZXJWaXNpYmxlKCF1aS5nZXRSYXN0ZXJWaXNpYmxlKCkpO1xuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICduJy5jaGFyQ29kZUF0KCkgfHwgZXYud2hpY2ggPT09ICdOJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLmNlbnRlck1hcCgnbm9ydGgnKTtcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAncycuY2hhckNvZGVBdCgpIHx8IGV2LndoaWNoID09PSAnUycuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5jZW50ZXJNYXAoJ3NvdXRoJyk7XG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJ2UnLmNoYXJDb2RlQXQoKSB8fCBldi53aGljaCA9PT0gJ0UnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuY2VudGVyTWFwKCdlcXVhdG9yJyk7XG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJ2wnLmNoYXJDb2RlQXQoKSB8fCBldi53aGljaCA9PT0gJ0wnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuY2VudGVyTWFwKCdsb2NhdGlvbicpO1xuICAgIH1cbiAgfSk7XG59KTtcbiIsImltcG9ydCBVSVN0cmluZ3MgZnJvbSAnLi4vY29uZmlnL3N0cmluZ3MuanNvbic7XG5pbXBvcnQgSGVscENmZyBmcm9tICcuLi9jb25maWcvaGVscC5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gJ2VuJztcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gZmFsc2U7XG5cbiAgICB0aGlzLmhlbHBGaWxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudG9vbCA9ICdyb3RhdGUnO1xuICAgIHRoaXMucHJvamVjdGlvbiA9ICdwbGF0ZWNhcnJlJztcblxuICAgIHRoaXMuaGVscEJhbm5lcnMgPSB7fTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXRMYW5ndWFnZSgnZW4nKTtcbiAgICB0aGlzLnNldFRvb2woJ3JvdGF0ZScpO1xuICAgIHRoaXMuc2V0UHJvamVjdGlvbigncGxhdGVjYXJyZScpO1xuICAgIHRoaXMuaW5pdFRvb2xCdXR0b25zKCk7XG4gICAgdGhpcy5pbml0UHJvamVjdGlvbkJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRDb21tYW5kQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdEhlbHBCYW5uZXJzKCk7XG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5nQ29kZSkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5nQ29kZTtcblxuICAgIC8vIFNldHMgYSBsYW5ndWFnZSBjbGFzcyBpbiB0aGUgYm9keVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccylsYW5nLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICB9KTtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoYGxhbmctJHtsYW5nQ29kZX1gKTtcblxuICAgIC8vIEFjdGl2YXRlIHRoZSBzZWxlY3RlZCBsYW5ndWFnZVxuICAgICQoJy5sYW5nLXNlbGVjdG9yIGxpIGFbZGF0YS11aS1sYW5nLXNldF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgLmxhbmctc2VsZWN0b3IgbGkgYVtkYXRhLXVpLWxhbmctc2V0PSR7bGFuZ0NvZGV9XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcblxuICAgIC8vIFJlbG9hZCB0aGUgY3VycmVudCBoZWxwIGZpbGUgd2l0aCB0aGUgbmV3IGxhbmd1YWdlXG4gICAgaWYgKHRoaXMuaGVscEZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoKTtcbiAgICB9XG5cbiAgICAvLyBSZWxvYWQgdGhlIGhlbHAgYmFubmVyc1xuICAgIGZvciAoY29uc3QgYmFubmVySUQgb2YgT2JqZWN0LmtleXModGhpcy5oZWxwQmFubmVycykpIHtcbiAgICAgIGlmICh0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXSkge1xuICAgICAgICB0aGlzLnNob3dIZWxwQmFubmVyKFxuICAgICAgICAgIGJhbm5lcklELFxuICAgICAgICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdLmNhdGVnb3J5LFxuICAgICAgICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdLml0ZW1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbmplY3QgdHJhbnNsYXRhYmxlIHN0cmluZ3NcbiAgICB0aGlzLmluamVjdFN0cmluZ3MoKTtcbiAgfVxuXG4gIGluamVjdFN0cmluZ3MoKSB7XG4gICAgJCgnW2RhdGEtdWktc3RyXScpLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICQoZWxlbWVudCkuaHRtbCh0aGlzLnN0cigkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtdWktc3RyJykpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldExhbmd1YWdlKCkge1xuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlO1xuICB9XG5cbiAgZGlzcGxheUhlbHBGaWxlKGhlbHBGaWxlSUQgPSB0aGlzLmhlbHBGaWxlLCBwYW5lID0gdGhpcy5oZWxwUGFuZSkge1xuICAgIGQzLnRleHQoYC4vdHh0LyR7dGhpcy5nZXRMYW5ndWFnZSgpfS8ke2hlbHBGaWxlSUR9Lmh0bWxgLCAoZXJyb3IsIHRleHQpID0+IHtcbiAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICB0aGlzLmRpc3BsYXlJbmZvKHRleHQsIHBhbmUpO1xuICAgICAgdGhpcy5oZWxwRmlsZSA9IGhlbHBGaWxlSUQ7XG4gICAgICB0aGlzLmhlbHBQYW5lID0gcGFuZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvdW50cmllc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlO1xuICB9XG5cbiAgZ2V0R3JhdGljdWxlVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0dyYXRpY3VsZVZpc2libGU7XG4gIH1cblxuICBnZXRSYXN0ZXJWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzUmFzdGVyVmlzaWJsZTtcbiAgfVxuXG4gIHNldENvdW50cmllc1Zpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuYm91bmRhcnknKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldENvdW50cmllc1Zpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc2V0R3JhdGljdWxlVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ncmF0aWN1bGUnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldEdyYXRpY3VsZVZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc2V0UmFzdGVyVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5sYW5kJykuY3NzKHsgdmlzaWJpbGl0eTogIWlzVmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICAgICQoJyNtYXBfdGFnIGNhbnZhcycpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0UmFzdGVyVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcygncmFzdGVyLXZpc2libGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygncmFzdGVyLXZpc2libGUnKTtcbiAgICB9XG4gIH1cblxuICBzdHIoaWRlbnRpZmllcikge1xuICAgIGlmIChVSVN0cmluZ3NbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV07XG4gICAgfVxuICAgIGNvbnNvbGUudHJhY2UoYFJlcXVlc3RlZCB1bmRlZmluZWQgVUkgU3RyaW5nICcke2lkZW50aWZpZXJ9J2ApO1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGRpc3BsYXlJbmZvKGNvbnRlbnQsIHBhbmUpIHtcbiAgICBjb25zb2xlLmxvZyhwYW5lKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuICAgICQoJy5tYXBfdGFnJykuYWRkQ2xhc3MoYGRvY2tlZC0ke3BhbmV9YCk7XG5cbiAgICAkKGAuaW5mb19wYW5lLSR7cGFuZX0gLmNvbnRlbnRgKS5odG1sKGNvbnRlbnQpO1xuICAgICQoJy5pbmZvX3BhbmUnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoYC5pbmZvX3BhbmUtJHtwYW5lfWApLmFkZENsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mbygpIHtcbiAgICB0aGlzLmhlbHBGaWxlID0gbnVsbDtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuXG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvTGVmdCgpIHtcbiAgICB0aGlzLmhlbHBGaWxlID0gbnVsbDtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mb1JpZ2h0KCkge1xuICAgIHRoaXMuaGVscEZpbGUgPSBudWxsO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaW5pdFRvb2xCdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLXRvb2xdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnNldFRvb2woJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktdG9vbCcpKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgIGxldCBpbmRpY2F0cml4VGltZXIgPSBudWxsO1xuICAgICQoJ1tkYXRhLXVpLXRvb2w9aW5kaWNhdHJpeF0nKS5vbignbW91c2Vkb3duJywgKCkgPT4ge1xuICAgICAgaW5kaWNhdHJpeFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHNhbXBsZUVsbGlwc2VzKCk7XG4gICAgICB9LCAxMDAwKTtcbiAgICB9KTtcblxuICAgICQoZG9jdW1lbnQpLm9uKCdtb3VzZXVwJywgKCkgPT4ge1xuICAgICAgaWYgKGluZGljYXRyaXhUaW1lciAhPT0gbnVsbCkge1xuICAgICAgICB3aW5kb3cuY2xlYXJUaW1lb3V0KGluZGljYXRyaXhUaW1lcik7XG4gICAgICAgIGluZGljYXRyaXhUaW1lciA9IG51bGw7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBnZXRUb29sKCkge1xuICAgIHJldHVybiB0aGlzLnRvb2w7XG4gIH1cblxuICBzZXRUb29sKGFUb29sKSB7XG4gICAgdGhpcy50b29sID0gYVRvb2w7XG4gICAgJCgnW2RhdGEtdWktdG9vbF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktdG9vbD0ke2FUb29sfV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gICAgdGhpcy5oaWRlSW5mb0xlZnQoKTtcbiAgICB0aGlzLnNob3dIZWxwQmFubmVyKCdsZWZ0JywgJ3Rvb2xzJywgYVRvb2wpO1xuICB9XG5cbiAgaW5pdFByb2plY3Rpb25CdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLXByb2plY3Rpb25dJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnNldFByb2plY3Rpb24oJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktcHJvamVjdGlvbicpKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFByb2plY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdGlvbjtcbiAgfVxuXG4gIHNldFByb2plY3Rpb24oYVByb2plY3Rpb24pIHtcbiAgICB0aGlzLnByb2plY3Rpb24gPSBhUHJvamVjdGlvbjtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGBbZGF0YS11aS1wcm9qZWN0aW9uPSR7YVByb2plY3Rpb259XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgICB0aGlzLmhpZGVJbmZvUmlnaHQoKTtcbiAgICB0aGlzLnNob3dIZWxwQmFubmVyKCdyaWdodCcsICdwcm9qZWN0aW9ucycsIGFQcm9qZWN0aW9uKTtcbiAgfVxuXG4gIGluaXRIZWxwQmFubmVycygpIHtcbiAgICAkKCcuaGVscC1iYW5uZXItbGVmdCcpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnKSwgJ2xlZnQnKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoJy5oZWxwLWJhbm5lci1yaWdodCcpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnKSwgJ3JpZ2h0Jyk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBgJHt0aGlzLnN0cignTU9SRV9BQk9VVCcpfSAke0hlbHBDZmdbY2F0ZWdvcnldW2l0ZW1dLm5hbWVbdGhpcy5nZXRMYW5ndWFnZSgpXX1gO1xuICB9XG5cbiAgZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gSGVscENmZ1tjYXRlZ29yeV1baXRlbV0uZmlsZTtcbiAgfVxuXG4gIHNob3dIZWxwQmFubmVyKGJhbm5lcklELCBjYXRlZ29yeSwgaXRlbSkge1xuXG4gICAgdGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0gPSB7IGNhdGVnb3J5LCBpdGVtIH07XG5cbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKVxuICAgICAgLmh0bWwodGhpcy5nZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcsIHRoaXMuZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pKVxuICAgICAgLmZhZGVJbigpXG4gICAgICAuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICB9XG5cbiAgaGlkZUhlbHBCYW5uZXIoYmFubmVySUQpIHtcbiAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXSA9IG51bGw7XG4gICAgJChgLmhlbHAtYmFubmVyLSR7YmFubmVySUR9YCkuZmFkZU91dCgpO1xuICB9XG5cbiAgaW5pdENvbW1hbmRCdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLWNvbW1hbmQ9Y2xlYXJdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLmNsZWFyTWFya3MoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXVpLWNvbW1hbmQ9dW5kb10nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMudW5kb01hcmsoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyTWFya3MoKSB7XG4gICAgY2xlYXJHZW9kZXNpYygpO1xuICAgIGNsZWFyTG94b2Ryb21lKCk7XG4gICAgY2xlYXJFbGxpcHNlcygpO1xuICB9XG5cbiAgdW5kb01hcmsoKSB7XG4gICAgdW5kb0NvbW1hbmQoKTtcbiAgfVxuXG4gIGNlbnRlck1hcChwb3NpdGlvbikge1xuICAgIGlmIChwb3NpdGlvbiA9PT0gJ25vcnRoJykge1xuICAgICAgcHJvamVjdGlvbi5yb3RhdGUoWzAsIC05MF0pO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdzb3V0aCcpIHtcbiAgICAgIHByb2plY3Rpb24ucm90YXRlKFswLCA5MF0pO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdlcXVhdG9yJykge1xuICAgICAgcHJvamVjdGlvbi5yb3RhdGUoWzAsIDBdKTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAnbG9jYXRpb24nKSB7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyb3RhdGVUb0N1cnJlbnRMb2NhdGlvbik7XG4gICAgfVxuICAgIHVwZGF0ZU1hcCgpO1xuICB9XG59XG4iXX0=
