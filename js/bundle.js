(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "tools": {
    "rotate": {
      "name": {
        "en": "rotating the globe",
        "pt": "girar o globo"
      },
      "file": "info_rotate"
    },
    "indicatrix": {
      "name": {
        "en": "the Tissot indicatrix",
        "pt": "a indicatriz de Tissot"
      },
      "file": "info_tissot"
    },
    "geodesic": {
      "name": {
        "en": "geodesics",
        "pt": "geodésicas"
      },
      "file": "info_geodesic"
    },
    "loxodrome": {
      "name": {
        "en": "loxodromes",
        "pt": "loxodrómias"
      },
      "file": "info_loxodrome"
    }
  },
  "projections": {
    "platecarre": {
      "file": "platecarre",
      "name": {
        "en": "the Plate Carrée projection",
        "pt": "projeção Cilíndrica equidistante"
      }
    },
    "mercator": {
      "file": "mercator",
      "name": {
        "en": "the Mercator projection",
        "pt": "projeção de Mercator"
      }
    },
    "gallpeters": {
      "file": "gallpeters",
      "name": {
        "en": "the Gall-Peters projection",
        "pt": "projeção Cilíndrica equivalente"
      }
    },
    "mollweide": {
      "file": "mollweide",
      "name": {
        "en": "the Mollweide projection",
        "pt": "projeção de Mollweide"
      }
    },
    "aziequi": {
      "file": "aziequi",
      "name": {
        "en": "the Azimuthal equidistant projection",
        "pt": "projeção Azimutal equidistante"
      }
    },
    "gnomo": {
      "file": "gnomo",
      "name": {
        "en": "the Gnomonic projection",
        "pt": "projeção Gnomónica"
      }
    },
    "stereo": {
      "file": "stereo",
      "name": {
        "en": "the Stereographic projection",
        "pt": "projeção Estereográfica"
      }
    },
    "ortho": {
      "file": "ortho",
      "name": {
        "en": "the Orthographic projection",
        "pt": "projeção Ortográfica"
      }
    }
  }
}
},{}],2:[function(require,module,exports){
module.exports={
  "APP_TITLE": {
    "en": "Mappae Mundi",
    "pt": "Mappae Mundi"
  },
  "MORE_ABOUT": {
    "en": "More about",
    "pt": "Mais sobre"
  },
  "PR_ABBR_PLATECARRE": {
    "en": "Pl",
    "pt": "CEd"
  },
  "PR_ABBR_MERCATOR": {
    "en": "Me",
    "pt": "Mer"
  },
  "PR_ABBR_GALLPETERS": {
    "en": "Ga",
    "pt": "CEv"
  },
  "PR_ABBR_MOLLWEIDE": {
    "en": "Mw",
    "pt": "Mlw"
  },
  "PR_ABBR_AZIEQUI": {
    "en": "Az",
    "pt": "AzE"
  },
  "PR_ABBR_GNOMO": {
    "en": "Gn",
    "pt": "Gno"
  },
  "PR_ABBR_STEREO": {
    "en": "St",
    "pt": "Est"
  },
  "PR_ABBR_ORTHO": {
    "en": "Or",
    "pt": "Ort"
  },
  "": {
    "en": "",
    "pt": ""
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBOzs7Ozs7QUFFQTtBQUNBLElBQU0sS0FBSyxrQkFBWDtBQUNBLE9B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QUNEOzs7OEJBRVMsUSxFQUFVO0FBQ2xCLFVBQUksYUFBYSxPQUFqQixFQUEwQjtBQUN4QixtQkFBVyxNQUFYLENBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUMsRUFBTCxDQUFsQjtBQUNELE9BRkQsTUFFTyxJQUFJLGFBQWEsT0FBakIsRUFBMEI7QUFDL0IsbUJBQVcsTUFBWCxDQUFrQixDQUFDLENBQUQsRUFBSSxFQUFKLENBQWxCO0FBQ0QsT0FGTSxNQUVBLElBQUksYUFBYSxTQUFqQixFQUE0QjtBQUNqQyxtQkFBVyxNQUFYLENBQWtCLENBQUMsQ0FBRCxFQUFJLENBQUosQ0FBbEI7QUFDRCxPQUZNLE1BRUEsSUFBSSxhQUFhLFVBQWpCLEVBQTZCO0FBQ2xDLG1CQUFXLE1BQVgsQ0FBa0IsdUJBQWxCO0FBQ0Q7QUFDRDtBQUNEOzs7Ozs7a0JBdlJrQixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJ0b29sc1wiOiB7XG4gICAgXCJyb3RhdGVcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInJvdGF0aW5nIHRoZSBnbG9iZVwiLFxuICAgICAgICBcInB0XCI6IFwiZ2lyYXIgbyBnbG9ib1wiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19yb3RhdGVcIlxuICAgIH0sXG4gICAgXCJpbmRpY2F0cml4XCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgVGlzc290IGluZGljYXRyaXhcIixcbiAgICAgICAgXCJwdFwiOiBcImEgaW5kaWNhdHJpeiBkZSBUaXNzb3RcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fdGlzc290XCJcbiAgICB9LFxuICAgIFwiZ2VvZGVzaWNcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcImdlb2Rlc2ljc1wiLFxuICAgICAgICBcInB0XCI6IFwiZ2VvZMOpc2ljYXNcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fZ2VvZGVzaWNcIlxuICAgIH0sXG4gICAgXCJsb3hvZHJvbWVcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcImxveG9kcm9tZXNcIixcbiAgICAgICAgXCJwdFwiOiBcImxveG9kcsOzbWlhc1wiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19sb3hvZHJvbWVcIlxuICAgIH1cbiAgfSxcbiAgXCJwcm9qZWN0aW9uc1wiOiB7XG4gICAgXCJwbGF0ZWNhcnJlXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcInBsYXRlY2FycmVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgUGxhdGUgQ2FycsOpZSBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIENpbMOtbmRyaWNhIGVxdWlkaXN0YW50ZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm1lcmNhdG9yXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcIm1lcmNhdG9yXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIE1lcmNhdG9yIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gZGUgTWVyY2F0b3JcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJnYWxscGV0ZXJzXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImdhbGxwZXRlcnNcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR2FsbC1QZXRlcnMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBDaWzDrW5kcmljYSBlcXVpdmFsZW50ZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm1vbGx3ZWlkZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtb2xsd2VpZGVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTW9sbHdlaWRlIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gZGUgTW9sbHdlaWRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiYXppZXF1aVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJhemllcXVpXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIEF6aW11dGhhbCBlcXVpZGlzdGFudCBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIEF6aW11dGFsIGVxdWlkaXN0YW50ZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImdub21vXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImdub21vXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIEdub21vbmljIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gR25vbcOzbmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcInN0ZXJlb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJzdGVyZW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIEVzdGVyZW9ncsOhZmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm9ydGhvXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcIm9ydGhvXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIE9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIE9ydG9ncsOhZmljYVwiXG4gICAgICB9XG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIkFQUF9USVRMRVwiOiB7XG4gICAgXCJlblwiOiBcIk1hcHBhZSBNdW5kaVwiLFxuICAgIFwicHRcIjogXCJNYXBwYWUgTXVuZGlcIlxuICB9LFxuICBcIk1PUkVfQUJPVVRcIjoge1xuICAgIFwiZW5cIjogXCJNb3JlIGFib3V0XCIsXG4gICAgXCJwdFwiOiBcIk1haXMgc29icmVcIlxuICB9LFxuICBcIlBSX0FCQlJfUExBVEVDQVJSRVwiOiB7XG4gICAgXCJlblwiOiBcIlBsXCIsXG4gICAgXCJwdFwiOiBcIkNFZFwiXG4gIH0sXG4gIFwiUFJfQUJCUl9NRVJDQVRPUlwiOiB7XG4gICAgXCJlblwiOiBcIk1lXCIsXG4gICAgXCJwdFwiOiBcIk1lclwiXG4gIH0sXG4gIFwiUFJfQUJCUl9HQUxMUEVURVJTXCI6IHtcbiAgICBcImVuXCI6IFwiR2FcIixcbiAgICBcInB0XCI6IFwiQ0V2XCJcbiAgfSxcbiAgXCJQUl9BQkJSX01PTExXRUlERVwiOiB7XG4gICAgXCJlblwiOiBcIk13XCIsXG4gICAgXCJwdFwiOiBcIk1sd1wiXG4gIH0sXG4gIFwiUFJfQUJCUl9BWklFUVVJXCI6IHtcbiAgICBcImVuXCI6IFwiQXpcIixcbiAgICBcInB0XCI6IFwiQXpFXCJcbiAgfSxcbiAgXCJQUl9BQkJSX0dOT01PXCI6IHtcbiAgICBcImVuXCI6IFwiR25cIixcbiAgICBcInB0XCI6IFwiR25vXCJcbiAgfSxcbiAgXCJQUl9BQkJSX1NURVJFT1wiOiB7XG4gICAgXCJlblwiOiBcIlN0XCIsXG4gICAgXCJwdFwiOiBcIkVzdFwiXG4gIH0sXG4gIFwiUFJfQUJCUl9PUlRIT1wiOiB7XG4gICAgXCJlblwiOiBcIk9yXCIsXG4gICAgXCJwdFwiOiBcIk9ydFwiXG4gIH0sXG4gIFwiXCI6IHtcbiAgICBcImVuXCI6IFwiXCIsXG4gICAgXCJwdFwiOiBcIlwiXG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tICcuL3VpJztcblxuLy8gSW5pdCBVSVxuY29uc3QgdWkgPSBuZXcgVUkoKTtcbndpbmRvdy5Tb0VVSSA9IHVpO1xuXG4kKCgpID0+IHtcbiAgdWkuaW5pdCgpO1xuXG4gIC8vIEhvb2sgbGFuZ3VhZ2UgY2hhbmdlIGxpbmtzXG4gICQoJ1tkYXRhLXVpLWxhbmctc2V0XScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2LnRhcmdldCk7XG4gICAgdWkuc2V0TGFuZ3VhZ2UoJHRhcmdldC5hdHRyKCdkYXRhLXVpLWxhbmctc2V0JykpO1xuICAgICQoJ2FbZGF0YS11aS1sYW5nLXNldF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBoZWxwIGZpbGVzXG4gICQoJ1tkYXRhLXVpLWhlbHBdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgdWkuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWhlbHAnKSwgJ3JpZ2h0Jyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBpbmZvIHBhbmUgY2xvc2UgYnV0dG9uc1xuICAkKCcuaW5mb19wYW5lLWNsb3NlJykuY2xpY2soKGV2KSA9PiB7XG4gICAgdWkuaGlkZUluZm8oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBTZXQga2V5Ym9hcmQgY29tbWFuZHNcbiAgJCh3aW5kb3cpLm9uKCdrZXlwcmVzcycsIChldikgPT4ge1xuICAgIC8vIDEgLSBUb2dnbGUgY291bnRyaWVzIHZpc2libGVcbiAgICBpZiAoZXYud2hpY2ggPT09ICcxJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldENvdW50cmllc1Zpc2libGUoIXVpLmdldENvdW50cmllc1Zpc2libGUoKSk7XG4gICAgLy8gMiAtIFRvZ2dsZSBncmF0aWN1bGUgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICcyJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldEdyYXRpY3VsZVZpc2libGUoIXVpLmdldEdyYXRpY3VsZVZpc2libGUoKSk7XG4gICAgLy8gMyAtIFRvZ2dsZSByYXN0ZXIgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICczJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldFJhc3RlclZpc2libGUoIXVpLmdldFJhc3RlclZpc2libGUoKSk7XG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJ24nLmNoYXJDb2RlQXQoKSB8fCBldi53aGljaCA9PT0gJ04nLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuY2VudGVyTWFwKCdub3J0aCcpO1xuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICdzJy5jaGFyQ29kZUF0KCkgfHwgZXYud2hpY2ggPT09ICdTJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLmNlbnRlck1hcCgnc291dGgnKTtcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnZScuY2hhckNvZGVBdCgpIHx8IGV2LndoaWNoID09PSAnRScuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5jZW50ZXJNYXAoJ2VxdWF0b3InKTtcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnbCcuY2hhckNvZGVBdCgpIHx8IGV2LndoaWNoID09PSAnTCcuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5jZW50ZXJNYXAoJ2xvY2F0aW9uJyk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFVJU3RyaW5ncyBmcm9tICcuLi9jb25maWcvc3RyaW5ncy5qc29uJztcbmltcG9ydCBIZWxwQ2ZnIGZyb20gJy4uL2NvbmZpZy9oZWxwLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSAnZW4nO1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuaGVscEZpbGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50b29sID0gJ3JvdGF0ZSc7XG4gICAgdGhpcy5wcm9qZWN0aW9uID0gJ3BsYXRlY2FycmUnO1xuXG4gICAgdGhpcy5oZWxwQmFubmVycyA9IHt9O1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldExhbmd1YWdlKCdlbicpO1xuICAgIHRoaXMuc2V0VG9vbCgncm90YXRlJyk7XG4gICAgdGhpcy5zZXRQcm9qZWN0aW9uKCdwbGF0ZWNhcnJlJyk7XG4gICAgdGhpcy5pbml0VG9vbEJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRQcm9qZWN0aW9uQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdENvbW1hbmRCdXR0b25zKCk7XG4gICAgdGhpcy5pbml0SGVscEJhbm5lcnMoKTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmdDb2RlO1xuXG4gICAgLy8gU2V0cyBhIGxhbmd1YWdlIGNsYXNzIGluIHRoZSBib2R5XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCgvKF58XFxzKWxhbmctXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgIH0pO1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhgbGFuZy0ke2xhbmdDb2RlfWApO1xuXG4gICAgLy8gQWN0aXZhdGUgdGhlIHNlbGVjdGVkIGxhbmd1YWdlXG4gICAgJCgnLmxhbmctc2VsZWN0b3IgbGkgYVtkYXRhLXVpLWxhbmctc2V0XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGAubGFuZy1zZWxlY3RvciBsaSBhW2RhdGEtdWktbGFuZy1zZXQ9JHtsYW5nQ29kZX1dYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuXG4gICAgLy8gUmVsb2FkIHRoZSBjdXJyZW50IGhlbHAgZmlsZSB3aXRoIHRoZSBuZXcgbGFuZ3VhZ2VcbiAgICBpZiAodGhpcy5oZWxwRmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgpO1xuICAgIH1cblxuICAgIC8vIFJlbG9hZCB0aGUgaGVscCBiYW5uZXJzXG4gICAgZm9yIChjb25zdCBiYW5uZXJJRCBvZiBPYmplY3Qua2V5cyh0aGlzLmhlbHBCYW5uZXJzKSkge1xuICAgICAgaWYgKHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdKSB7XG4gICAgICAgIHRoaXMuc2hvd0hlbHBCYW5uZXIoXG4gICAgICAgICAgYmFubmVySUQsXG4gICAgICAgICAgdGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0uY2F0ZWdvcnksXG4gICAgICAgICAgdGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0uaXRlbVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIEluamVjdCB0cmFuc2xhdGFibGUgc3RyaW5nc1xuICAgIHRoaXMuaW5qZWN0U3RyaW5ncygpO1xuICB9XG5cbiAgaW5qZWN0U3RyaW5ncygpIHtcbiAgICAkKCdbZGF0YS11aS1zdHJdJykuZWFjaCgoaSwgZWxlbWVudCkgPT4ge1xuICAgICAgJChlbGVtZW50KS5odG1sKHRoaXMuc3RyKCQoZWxlbWVudCkuYXR0cignZGF0YS11aS1zdHInKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2U7XG4gIH1cblxuICBkaXNwbGF5SGVscEZpbGUoaGVscEZpbGVJRCA9IHRoaXMuaGVscEZpbGUsIHBhbmUgPSB0aGlzLmhlbHBQYW5lKSB7XG4gICAgZDMudGV4dChgLi90eHQvJHt0aGlzLmdldExhbmd1YWdlKCl9LyR7aGVscEZpbGVJRH0uaHRtbGAsIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIHRoaXMuZGlzcGxheUluZm8odGV4dCwgcGFuZSk7XG4gICAgICB0aGlzLmhlbHBGaWxlID0gaGVscEZpbGVJRDtcbiAgICAgIHRoaXMuaGVscFBhbmUgPSBwYW5lO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvdW50cmllc1Zpc2libGU7XG4gIH1cblxuICBnZXRHcmF0aWN1bGVWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZTtcbiAgfVxuXG4gIGdldFJhc3RlclZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYXN0ZXJWaXNpYmxlO1xuICB9XG5cbiAgc2V0Q291bnRyaWVzVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ib3VuZGFyeScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0Q291bnRyaWVzVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRHcmF0aWN1bGVWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmdyYXRpY3VsZScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0R3JhdGljdWxlVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRSYXN0ZXJWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmxhbmQnKS5jc3MoeyB2aXNpYmlsaXR5OiAhaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgJCgnI21hcF90YWcgY2FudmFzJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRSYXN0ZXJWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgICBpZiAoaXNWaXNpYmxlKSB7XG4gICAgICAkKCcubWFwX3RhZycpLmFkZENsYXNzKCdyYXN0ZXItdmlzaWJsZScpO1xuICAgIH0gZWxzZSB7XG4gICAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdyYXN0ZXItdmlzaWJsZScpO1xuICAgIH1cbiAgfVxuXG4gIHN0cihpZGVudGlmaWVyKSB7XG4gICAgaWYgKFVJU3RyaW5nc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgY29uc29sZS50cmFjZShgUmVxdWVzdGVkIHVuZGVmaW5lZCBVSSBTdHJpbmcgJyR7aWRlbnRpZmllcn0nYCk7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZGlzcGxheUluZm8oY29udGVudCwgcGFuZSkge1xuICAgIGNvbnNvbGUubG9nKHBhbmUpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcyhgZG9ja2VkLSR7cGFuZX1gKTtcblxuICAgICQoYC5pbmZvX3BhbmUtJHtwYW5lfSAuY29udGVudGApLmh0bWwoY29udGVudCk7XG4gICAgJCgnLmluZm9fcGFuZScpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJChgLmluZm9fcGFuZS0ke3BhbmV9YCkuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvKCkge1xuICAgIHRoaXMuaGVscEZpbGUgPSBudWxsO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG5cbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm9MZWZ0KCkge1xuICAgIHRoaXMuaGVscEZpbGUgPSBudWxsO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvUmlnaHQoKSB7XG4gICAgdGhpcy5oZWxwRmlsZSA9IG51bGw7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBpbml0VG9vbEJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktdG9vbF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuc2V0VG9vbCgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS10b29sJykpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgbGV0IGluZGljYXRyaXhUaW1lciA9IG51bGw7XG4gICAgJCgnW2RhdGEtdWktdG9vbD1pbmRpY2F0cml4XScpLm9uKCdtb3VzZWRvd24nLCAoKSA9PiB7XG4gICAgICBpbmRpY2F0cml4VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgc2FtcGxlRWxsaXBzZXMoKTtcbiAgICAgIH0sIDEwMDApO1xuICAgIH0pO1xuXG4gICAgJChkb2N1bWVudCkub24oJ21vdXNldXAnLCAoKSA9PiB7XG4gICAgICBpZiAoaW5kaWNhdHJpeFRpbWVyICE9PSBudWxsKSB7XG4gICAgICAgIHdpbmRvdy5jbGVhclRpbWVvdXQoaW5kaWNhdHJpeFRpbWVyKTtcbiAgICAgICAgaW5kaWNhdHJpeFRpbWVyID0gbnVsbDtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudG9vbDtcbiAgfVxuXG4gIHNldFRvb2woYVRvb2wpIHtcbiAgICB0aGlzLnRvb2wgPSBhVG9vbDtcbiAgICAkKCdbZGF0YS11aS10b29sXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGBbZGF0YS11aS10b29sPSR7YVRvb2x9XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgICB0aGlzLmhpZGVJbmZvTGVmdCgpO1xuICAgIHRoaXMuc2hvd0hlbHBCYW5uZXIoJ2xlZnQnLCAndG9vbHMnLCBhVG9vbCk7XG4gIH1cblxuICBpbml0UHJvamVjdGlvbkJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktcHJvamVjdGlvbl0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuc2V0UHJvamVjdGlvbigkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1wcm9qZWN0aW9uJykpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHJvamVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0aW9uO1xuICB9XG5cbiAgc2V0UHJvamVjdGlvbihhUHJvamVjdGlvbikge1xuICAgIHRoaXMucHJvamVjdGlvbiA9IGFQcm9qZWN0aW9uO1xuICAgICQoJ1tkYXRhLXVpLXByb2plY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoYFtkYXRhLXVpLXByb2plY3Rpb249JHthUHJvamVjdGlvbn1dYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHVwZGF0ZU1hcCgpO1xuICAgIHRoaXMuaGlkZUluZm9SaWdodCgpO1xuICAgIHRoaXMuc2hvd0hlbHBCYW5uZXIoJ3JpZ2h0JywgJ3Byb2plY3Rpb25zJywgYVByb2plY3Rpb24pO1xuICB9XG5cbiAgaW5pdEhlbHBCYW5uZXJzKCkge1xuICAgICQoJy5oZWxwLWJhbm5lci1sZWZ0Jykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcpLCAnbGVmdCcpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJCgnLmhlbHAtYmFubmVyLXJpZ2h0Jykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcpLCAncmlnaHQnKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEhlbHBCYW5uZXJUZXh0KGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuc3RyKCdNT1JFX0FCT1VUJyl9ICR7SGVscENmZ1tjYXRlZ29yeV1baXRlbV0ubmFtZVt0aGlzLmdldExhbmd1YWdlKCldfWA7XG4gIH1cblxuICBnZXRIZWxwQmFubmVyUGFnZShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBIZWxwQ2ZnW2NhdGVnb3J5XVtpdGVtXS5maWxlO1xuICB9XG5cbiAgc2hvd0hlbHBCYW5uZXIoYmFubmVySUQsIGNhdGVnb3J5LCBpdGVtKSB7XG5cbiAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXSA9IHsgY2F0ZWdvcnksIGl0ZW0gfTtcblxuICAgICQoYC5oZWxwLWJhbm5lci0ke2Jhbm5lcklEfWApXG4gICAgICAuaHRtbCh0aGlzLmdldEhlbHBCYW5uZXJUZXh0KGNhdGVnb3J5LCBpdGVtKSlcbiAgICAgIC5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJywgdGhpcy5nZXRIZWxwQmFubmVyUGFnZShjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuZmFkZUluKClcbiAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gIH1cblxuICBoaWRlSGVscEJhbm5lcihiYW5uZXJJRCkge1xuICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdID0gbnVsbDtcbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKS5mYWRlT3V0KCk7XG4gIH1cblxuICBpbml0Q29tbWFuZEJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktY29tbWFuZD1jbGVhcl0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJNYXJrcygpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtdWktY29tbWFuZD11bmRvXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy51bmRvTWFyaygpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJNYXJrcygpIHtcbiAgICBjbGVhckdlb2Rlc2ljKCk7XG4gICAgY2xlYXJMb3hvZHJvbWUoKTtcbiAgICBjbGVhckVsbGlwc2VzKCk7XG4gIH1cblxuICB1bmRvTWFyaygpIHtcbiAgICB1bmRvQ29tbWFuZCgpO1xuICB9XG5cbiAgY2VudGVyTWFwKHBvc2l0aW9uKSB7XG4gICAgaWYgKHBvc2l0aW9uID09PSAnbm9ydGgnKSB7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbMCwgLTkwXSk7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ3NvdXRoJykge1xuICAgICAgcHJvamVjdGlvbi5yb3RhdGUoWzAsIDkwXSk7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2VxdWF0b3InKSB7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbMCwgMF0pO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdsb2NhdGlvbicpIHtcbiAgICAgIHByb2plY3Rpb24ucm90YXRlKHJvdGF0ZVRvQ3VycmVudExvY2F0aW9uKTtcbiAgICB9XG4gICAgdXBkYXRlTWFwKCk7XG4gIH1cbn1cbiJdfQ==
