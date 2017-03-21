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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBOzs7Ozs7QUFFQTtBQUNBLElBQU0sS0FBSyxrQkFBWDtBQUNBLE9B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LCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInRvb2xzXCI6IHtcbiAgICBcInJvdGF0ZVwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwicm90YXRpbmcgdGhlIGdsb2JlXCIsXG4gICAgICAgIFwicHRcIjogXCJnaXJhciBvIGdsb2JvXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX3JvdGF0ZVwiXG4gICAgfSxcbiAgICBcImluZGljYXRyaXhcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBUaXNzb3QgaW5kaWNhdHJpeFwiLFxuICAgICAgICBcInB0XCI6IFwiYSBpbmRpY2F0cml6IGRlIFRpc3NvdFwiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb190aXNzb3RcIlxuICAgIH0sXG4gICAgXCJnZW9kZXNpY1wiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwiZ2VvZGVzaWNzXCIsXG4gICAgICAgIFwicHRcIjogXCJnZW9kw6lzaWNhc1wiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19nZW9kZXNpY1wiXG4gICAgfSxcbiAgICBcImxveG9kcm9tZVwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwibG94b2Ryb21lc1wiLFxuICAgICAgICBcInB0XCI6IFwibG94b2Ryw7NtaWFzXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX2xveG9kcm9tZVwiXG4gICAgfVxuICB9LFxuICBcInByb2plY3Rpb25zXCI6IHtcbiAgICBcInBsYXRlY2FycmVcIjoge1xuICAgICAgXCJmaWxlXCI6IFwicGxhdGVjYXJyZVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBQbGF0ZSBDYXJyw6llIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gQ2lsw61uZHJpY2EgZXF1aWRpc3RhbnRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwibWVyY2F0b3JcIjoge1xuICAgICAgXCJmaWxlXCI6IFwibWVyY2F0b3JcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTWVyY2F0b3IgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBkZSBNZXJjYXRvclwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImdhbGxwZXRlcnNcIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ2FsbHBldGVyc1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBHYWxsLVBldGVycyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIENpbMOtbmRyaWNhIGVxdWl2YWxlbnRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwibW9sbHdlaWRlXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcIm1vbGx3ZWlkZVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBNb2xsd2VpZGUgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBkZSBNb2xsd2VpZGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJhemllcXVpXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImF6aWVxdWlcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgQXppbXV0aGFsIGVxdWlkaXN0YW50IHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gQXppbXV0YWwgZXF1aWRpc3RhbnRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZ25vbW9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ25vbW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR25vbW9uaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBHbm9tw7NuaWNhXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwic3RlcmVvXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcInN0ZXJlb1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBTdGVyZW9ncmFwaGljIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gRXN0ZXJlb2dyw6FmaWNhXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwib3J0aG9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwib3J0aG9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgT3J0aG9ncmFwaGljIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gT3J0b2dyw6FmaWNhXCJcbiAgICAgIH1cbiAgICB9XG4gIH1cbn0iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiQVBQX1RJVExFXCI6IHtcbiAgICBcImVuXCI6IFwiTWFwcGFlIE11bmRpXCIsXG4gICAgXCJwdFwiOiBcIk1hcHBhZSBNdW5kaVwiXG4gIH0sXG4gIFwiTU9SRV9BQk9VVFwiOiB7XG4gICAgXCJlblwiOiBcIk1vcmUgYWJvdXRcIixcbiAgICBcInB0XCI6IFwiTWFpcyBzb2JyZVwiXG4gIH0sXG4gIFwiUFJfQUJCUl9QTEFURUNBUlJFXCI6IHtcbiAgICBcImVuXCI6IFwiUGxcIixcbiAgICBcInB0XCI6IFwiQ0VkXCJcbiAgfSxcbiAgXCJQUl9BQkJSX01FUkNBVE9SXCI6IHtcbiAgICBcImVuXCI6IFwiTWVcIixcbiAgICBcInB0XCI6IFwiTWVyXCJcbiAgfSxcbiAgXCJQUl9BQkJSX0dBTExQRVRFUlNcIjoge1xuICAgIFwiZW5cIjogXCJHYVwiLFxuICAgIFwicHRcIjogXCJDRXZcIlxuICB9LFxuICBcIlBSX0FCQlJfTU9MTFdFSURFXCI6IHtcbiAgICBcImVuXCI6IFwiTXdcIixcbiAgICBcInB0XCI6IFwiTWx3XCJcbiAgfSxcbiAgXCJQUl9BQkJSX0FaSUVRVUlcIjoge1xuICAgIFwiZW5cIjogXCJBelwiLFxuICAgIFwicHRcIjogXCJBekVcIlxuICB9LFxuICBcIlBSX0FCQlJfR05PTU9cIjoge1xuICAgIFwiZW5cIjogXCJHblwiLFxuICAgIFwicHRcIjogXCJHbm9cIlxuICB9LFxuICBcIlBSX0FCQlJfU1RFUkVPXCI6IHtcbiAgICBcImVuXCI6IFwiU3RcIixcbiAgICBcInB0XCI6IFwiRXN0XCJcbiAgfSxcbiAgXCJQUl9BQkJSX09SVEhPXCI6IHtcbiAgICBcImVuXCI6IFwiT3JcIixcbiAgICBcInB0XCI6IFwiT3J0XCJcbiAgfSxcbiAgXCJcIjoge1xuICAgIFwiZW5cIjogXCJcIixcbiAgICBcInB0XCI6IFwiXCJcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gJy4vdWknO1xuXG4vLyBJbml0IFVJXG5jb25zdCB1aSA9IG5ldyBVSSgpO1xud2luZG93LlNvRVVJID0gdWk7XG5cbiQoKCkgPT4ge1xuICB1aS5pbml0KCk7XG5cbiAgLy8gSG9vayBsYW5ndWFnZSBjaGFuZ2UgbGlua3NcbiAgJCgnW2RhdGEtdWktbGFuZy1zZXRdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgY29uc3QgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICB1aS5zZXRMYW5ndWFnZSgkdGFyZ2V0LmF0dHIoJ2RhdGEtdWktbGFuZy1zZXQnKSk7XG4gICAgJCgnYVtkYXRhLXVpLWxhbmctc2V0XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkdGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGhlbHAgZmlsZXNcbiAgJCgnW2RhdGEtdWktaGVscF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICB1aS5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktaGVscCcpLCAncmlnaHQnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGluZm8gcGFuZSBjbG9zZSBidXR0b25zXG4gICQoJy5pbmZvX3BhbmUtY2xvc2UnKS5jbGljaygoZXYpID0+IHtcbiAgICB1aS5oaWRlSW5mbygpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFNldCBrZXlib2FyZCBjb21tYW5kc1xuICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgKGV2KSA9PiB7XG4gICAgLy8gMSAtIFRvZ2dsZSBjb3VudHJpZXMgdmlzaWJsZVxuICAgIGlmIChldi53aGljaCA9PT0gJzEnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0Q291bnRyaWVzVmlzaWJsZSghdWkuZ2V0Q291bnRyaWVzVmlzaWJsZSgpKTtcbiAgICAvLyAyIC0gVG9nZ2xlIGdyYXRpY3VsZSB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzInLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0R3JhdGljdWxlVmlzaWJsZSghdWkuZ2V0R3JhdGljdWxlVmlzaWJsZSgpKTtcbiAgICAvLyAzIC0gVG9nZ2xlIHJhc3RlciB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzMnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0UmFzdGVyVmlzaWJsZSghdWkuZ2V0UmFzdGVyVmlzaWJsZSgpKTtcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnbicuY2hhckNvZGVBdCgpIHx8IGV2LndoaWNoID09PSAnTicuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5jZW50ZXJNYXAoJ25vcnRoJyk7XG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJ3MnLmNoYXJDb2RlQXQoKSB8fCBldi53aGljaCA9PT0gJ1MnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuY2VudGVyTWFwKCdzb3V0aCcpO1xuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICdlJy5jaGFyQ29kZUF0KCkgfHwgZXYud2hpY2ggPT09ICdFJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLmNlbnRlck1hcCgnZXF1YXRvcicpO1xuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICdsJy5jaGFyQ29kZUF0KCkgfHwgZXYud2hpY2ggPT09ICdMJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLmNlbnRlck1hcCgnbG9jYXRpb24nKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgVUlTdHJpbmdzIGZyb20gJy4uL2NvbmZpZy9zdHJpbmdzLmpzb24nO1xuaW1wb3J0IEhlbHBDZmcgZnJvbSAnLi4vY29uZmlnL2hlbHAuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9ICdlbic7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5oZWxwRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvb2wgPSAncm90YXRlJztcbiAgICB0aGlzLnByb2plY3Rpb24gPSAncGxhdGVjYXJyZSc7XG5cbiAgICB0aGlzLmhlbHBCYW5uZXJzID0ge307XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UoJ2VuJyk7XG4gICAgdGhpcy5zZXRUb29sKCdyb3RhdGUnKTtcbiAgICB0aGlzLnNldFByb2plY3Rpb24oJ3BsYXRlY2FycmUnKTtcbiAgICB0aGlzLmluaXRUb29sQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdFByb2plY3Rpb25CdXR0b25zKCk7XG4gICAgdGhpcy5pbml0Q29tbWFuZEJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRIZWxwQmFubmVycygpO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ0NvZGU7XG5cbiAgICAvLyBTZXRzIGEgbGFuZ3VhZ2UgY2xhc3MgaW4gdGhlIGJvZHlcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgIHJldHVybiAoY2xhc3NOYW1lLm1hdGNoKC8oXnxcXHMpbGFuZy1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgfSk7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKGBsYW5nLSR7bGFuZ0NvZGV9YCk7XG5cbiAgICAvLyBSZWxvYWQgdGhlIGN1cnJlbnQgaGVscCBmaWxlIHdpdGggdGhlIG5ldyBsYW5ndWFnZVxuICAgIGlmICh0aGlzLmhlbHBGaWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCk7XG4gICAgfVxuXG4gICAgLy8gUmVsb2FkIHRoZSBoZWxwIGJhbm5lcnNcbiAgICBmb3IgKGNvbnN0IGJhbm5lcklEIG9mIE9iamVjdC5rZXlzKHRoaXMuaGVscEJhbm5lcnMpKSB7XG4gICAgICBpZiAodGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0pIHtcbiAgICAgICAgdGhpcy5zaG93SGVscEJhbm5lcihcbiAgICAgICAgICBiYW5uZXJJRCxcbiAgICAgICAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXS5jYXRlZ29yeSxcbiAgICAgICAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXS5pdGVtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5qZWN0IHRyYW5zbGF0YWJsZSBzdHJpbmdzXG4gICAgdGhpcy5pbmplY3RTdHJpbmdzKCk7XG4gIH1cblxuICBpbmplY3RTdHJpbmdzKCkge1xuICAgICQoJ1tkYXRhLXVpLXN0cl0nKS5lYWNoKChpLCBlbGVtZW50KSA9PiB7XG4gICAgICAkKGVsZW1lbnQpLmh0bWwodGhpcy5zdHIoJChlbGVtZW50KS5hdHRyKCdkYXRhLXVpLXN0cicpKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRMYW5ndWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZTtcbiAgfVxuXG4gIGRpc3BsYXlIZWxwRmlsZShoZWxwRmlsZUlEID0gdGhpcy5oZWxwRmlsZSwgcGFuZSA9IHRoaXMuaGVscFBhbmUpIHtcbiAgICBkMy50ZXh0KGAuL3R4dC8ke3RoaXMuZ2V0TGFuZ3VhZ2UoKX0vJHtoZWxwRmlsZUlEfS5odG1sYCwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgdGhpcy5kaXNwbGF5SW5mbyh0ZXh0LCBwYW5lKTtcbiAgICAgIHRoaXMuaGVscEZpbGUgPSBoZWxwRmlsZUlEO1xuICAgICAgdGhpcy5oZWxwUGFuZSA9IHBhbmU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb3VudHJpZXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZTtcbiAgfVxuXG4gIGdldEdyYXRpY3VsZVZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlO1xuICB9XG5cbiAgZ2V0UmFzdGVyVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Jhc3RlclZpc2libGU7XG4gIH1cblxuICBzZXRDb3VudHJpZXNWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmJvdW5kYXJ5JykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRDb3VudHJpZXNWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldEdyYXRpY3VsZVZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuZ3JhdGljdWxlJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRHcmF0aWN1bGVWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldFJhc3RlclZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcubGFuZCcpLmNzcyh7IHZpc2liaWxpdHk6ICFpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgICAkKCcjbWFwX3RhZyBjYW52YXMnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldFJhc3RlclZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICQoJy5tYXBfdGFnJykuYWRkQ2xhc3MoJ3Jhc3Rlci12aXNpYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ3Jhc3Rlci12aXNpYmxlJyk7XG4gICAgfVxuICB9XG5cbiAgc3RyKGlkZW50aWZpZXIpIHtcbiAgICBpZiAoVUlTdHJpbmdzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldO1xuICAgIH1cbiAgICBjb25zb2xlLnRyYWNlKGBSZXF1ZXN0ZWQgdW5kZWZpbmVkIFVJIFN0cmluZyAnJHtpZGVudGlmaWVyfSdgKTtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBkaXNwbGF5SW5mbyhjb250ZW50LCBwYW5lKSB7XG4gICAgY29uc29sZS5sb2cocGFuZSk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcbiAgICAkKCcubWFwX3RhZycpLmFkZENsYXNzKGBkb2NrZWQtJHtwYW5lfWApO1xuXG4gICAgJChgLmluZm9fcGFuZS0ke3BhbmV9IC5jb250ZW50YCkuaHRtbChjb250ZW50KTtcbiAgICAkKCcuaW5mb19wYW5lJykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKGAuaW5mb19wYW5lLSR7cGFuZX1gKS5hZGRDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm8oKSB7XG4gICAgdGhpcy5oZWxwRmlsZSA9IG51bGw7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcblxuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mb0xlZnQoKSB7XG4gICAgdGhpcy5oZWxwRmlsZSA9IG51bGw7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm9SaWdodCgpIHtcbiAgICB0aGlzLmhlbHBGaWxlID0gbnVsbDtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGluaXRUb29sQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS10b29sXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRUb29sKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXRvb2wnKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRUb29sKCkge1xuICAgIHJldHVybiB0aGlzLnRvb2w7XG4gIH1cblxuICBzZXRUb29sKGFUb29sKSB7XG4gICAgdGhpcy50b29sID0gYVRvb2w7XG4gICAgJCgnW2RhdGEtdWktdG9vbF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktdG9vbD0ke2FUb29sfV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gICAgdGhpcy5oaWRlSW5mb0xlZnQoKTtcbiAgICB0aGlzLnNob3dIZWxwQmFubmVyKCdsZWZ0JywgJ3Rvb2xzJywgYVRvb2wpO1xuICB9XG5cbiAgaW5pdFByb2plY3Rpb25CdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLXByb2plY3Rpb25dJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnNldFByb2plY3Rpb24oJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktcHJvamVjdGlvbicpKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFByb2plY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdGlvbjtcbiAgfVxuXG4gIHNldFByb2plY3Rpb24oYVByb2plY3Rpb24pIHtcbiAgICB0aGlzLnByb2plY3Rpb24gPSBhUHJvamVjdGlvbjtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGBbZGF0YS11aS1wcm9qZWN0aW9uPSR7YVByb2plY3Rpb259XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgICB0aGlzLmhpZGVJbmZvUmlnaHQoKTtcbiAgICB0aGlzLnNob3dIZWxwQmFubmVyKCdyaWdodCcsICdwcm9qZWN0aW9ucycsIGFQcm9qZWN0aW9uKTtcbiAgfVxuXG4gIGluaXRIZWxwQmFubmVycygpIHtcbiAgICAkKCcuaGVscC1iYW5uZXItbGVmdCcpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnKSwgJ2xlZnQnKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoJy5oZWxwLWJhbm5lci1yaWdodCcpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnKSwgJ3JpZ2h0Jyk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBgJHt0aGlzLnN0cignTU9SRV9BQk9VVCcpfSAke0hlbHBDZmdbY2F0ZWdvcnldW2l0ZW1dLm5hbWVbdGhpcy5nZXRMYW5ndWFnZSgpXX1gO1xuICB9XG5cbiAgZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gSGVscENmZ1tjYXRlZ29yeV1baXRlbV0uZmlsZTtcbiAgfVxuXG4gIHNob3dIZWxwQmFubmVyKGJhbm5lcklELCBjYXRlZ29yeSwgaXRlbSkge1xuXG4gICAgdGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0gPSB7IGNhdGVnb3J5LCBpdGVtIH07XG5cbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKVxuICAgICAgLmh0bWwodGhpcy5nZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcsIHRoaXMuZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pKVxuICAgICAgLmZhZGVJbigpXG4gICAgICAuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICB9XG5cbiAgaGlkZUhlbHBCYW5uZXIoYmFubmVySUQpIHtcbiAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXSA9IG51bGw7XG4gICAgJChgLmhlbHAtYmFubmVyLSR7YmFubmVySUR9YCkuZmFkZU91dCgpO1xuICB9XG5cbiAgaW5pdENvbW1hbmRCdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLWNvbW1hbmQ9Y2xlYXJdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLmNsZWFyTWFya3MoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoJ1tkYXRhLXVpLWNvbW1hbmQ9dW5kb10nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMudW5kb01hcmsoKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFyTWFya3MoKSB7XG4gICAgY2xlYXJHZW9kZXNpYygpO1xuICAgIGNsZWFyTG94b2Ryb21lKCk7XG4gICAgY2xlYXJFbGxpcHNlcygpO1xuICB9XG5cbiAgdW5kb01hcmsoKSB7XG4gICAgdW5kb0NvbW1hbmQoKTtcbiAgfVxuXG4gIGNlbnRlck1hcChwb3NpdGlvbikge1xuICAgIGlmIChwb3NpdGlvbiA9PT0gJ25vcnRoJykge1xuICAgICAgcHJvamVjdGlvbi5yb3RhdGUoWzAsIC05MF0pO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdzb3V0aCcpIHtcbiAgICAgIHByb2plY3Rpb24ucm90YXRlKFswLCA5MF0pO1xuICAgIH0gZWxzZSBpZiAocG9zaXRpb24gPT09ICdlcXVhdG9yJykge1xuICAgICAgcHJvamVjdGlvbi5yb3RhdGUoWzAsIDBdKTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAnbG9jYXRpb24nKSB7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShyb3RhdGVUb0N1cnJlbnRMb2NhdGlvbik7XG4gICAgfVxuICAgIHVwZGF0ZU1hcCgpO1xuICB9XG59XG4iXX0=
