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
        "pt": "projeção Equirectangular"
      }
    },
    "mercator": {
      "file": "mercator",
      "name": {
        "en": "the Mercator projection",
        "pt": "projecção de Mercator"
      }
    },
    "gallpeters": {
      "file": "gallpeters",
      "name": {
        "en": "the Gall-Peters projection",
        "pt": "projecção de Gall-Peters"
      }
    },
    "mollweide": {
      "file": "mollweide",
      "name": {
        "en": "the Mollweide projection",
        "pt": "projecção de Mollweide"
      }
    },
    "aziequi": {
      "file": "aziequi",
      "name": {
        "en": "the Azimuthal equidistant projection",
        "pt": "projecção azimutal equidistante"
      }
    },
    "gnomo": {
      "file": "gnomo",
      "name": {
        "en": "the Gnomonic projection",
        "pt": "projecção gnomônica"
      }
    },
    "stereo": {
      "file": "stereo",
      "name": {
        "en": "the Stereographic projection",
        "pt": "projeção estereográfica"
      }
    },
    "ortho": {
      "file": "ortho",
      "name": {
        "en": "the Orthographic projection",
        "pt": "projecção ortográfic"
      }
    }
  }
}
},{}],2:[function(require,module,exports){
module.exports={
  "APP_TITLE": {
    "en": "Maps of the Earth",
    "pt": "Mapas da Terra"
  },
  "MORE_ABOUT": {
    "en": "More about",
    "pt": "Mais sobre"
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

      // Inject translatable strings
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
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').removeClass('docked-left');

      $('.info_pane-left').removeClass('visible');
      $('.info_pane-right').removeClass('visible');
    }
  }, {
    key: 'hideInfoLeft',
    value: function hideInfoLeft() {
      $('.map_tag').removeClass('docked-left');
      $('.info_pane-left').removeClass('visible');
    }
  }, {
    key: 'hideInfoRight',
    value: function hideInfoRight() {
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
      $('.help-banner-' + bannerID).html(this.getHelpBannerText(category, item)).attr('data-ui-banner-help', this.getHelpBannerPage(category, item)).fadeIn().css('display', 'inline-block');
    }
  }, {
    key: 'hideHelpBanner',
    value: function hideHelpBanner(bannerID) {
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
    value: function undoMark() {}
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/help.json":1,"../config/strings.json":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTs7Ozs7O0FBRUE7QUFDQSxJQUFNLEtBQUssa0JBQVg7QUFDQSxPQUFPLEtBQVAsR0FBZSxFQUFmOztBQUVBLEVBQUUsWUFBTTtBQUNOLEtBQUcsSUFBSDs7QUFFQTtBQUNBLElBQUUsb0JBQUYsRUFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQyxFQUFELEVBQVE7QUFDMUMsUUFBTSxVQUFVLEVBQUUsR0FBRyxNQUFMLENBQWhCO0FBQ0EsT0FB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K0IsT0FBL0IsRUFBd0MsVUFBQyxFQUFELEVBQVE7QUFDOUMsZUFBSyxRQUFMO0FBQ0EsV0FBRyxjQUFIO0FBQ0EsV0FBRyxlQUFIO0FBQ0QsT0FKRDtBQUtEOzs7aUNBRVk7QUFDWDtBQUNBO0FBQ0E7QUFDRDs7OytCQUVVLENBRVY7Ozs7OztrQkEvTmtCLEUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcInRvb2xzXCI6IHtcbiAgICBcInJvdGF0ZVwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwicm90YXRpbmcgdGhlIGdsb2JlXCIsXG4gICAgICAgIFwicHRcIjogXCJnaXJhciBvIGdsb2JvXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX3JvdGF0ZVwiXG4gICAgfSxcbiAgICBcImluZGljYXRyaXhcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBUaXNzb3QgaW5kaWNhdHJpeFwiLFxuICAgICAgICBcInB0XCI6IFwiYSBpbmRpY2F0cml6IGRlIFRpc3NvdFwiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb190aXNzb3RcIlxuICAgIH0sXG4gICAgXCJnZW9kZXNpY1wiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwiZ2VvZGVzaWNzXCIsXG4gICAgICAgIFwicHRcIjogXCJnZW9kw6lzaWNhc1wiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19nZW9kZXNpY1wiXG4gICAgfSxcbiAgICBcImxveG9kcm9tZVwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwibG94b2Ryb21lc1wiLFxuICAgICAgICBcInB0XCI6IFwibG94b2Ryw7NtaWFzXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX2xveG9kcm9tZVwiXG4gICAgfVxuICB9LFxuICBcInByb2plY3Rpb25zXCI6IHtcbiAgICBcInBsYXRlY2FycmVcIjoge1xuICAgICAgXCJmaWxlXCI6IFwicGxhdGVjYXJyZVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBQbGF0ZSBDYXJyw6llIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gRXF1aXJlY3Rhbmd1bGFyXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwibWVyY2F0b3JcIjoge1xuICAgICAgXCJmaWxlXCI6IFwibWVyY2F0b3JcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTWVyY2F0b3IgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gZGUgTWVyY2F0b3JcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJnYWxscGV0ZXJzXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImdhbGxwZXRlcnNcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR2FsbC1QZXRlcnMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gZGUgR2FsbC1QZXRlcnNcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJtb2xsd2VpZGVcIjoge1xuICAgICAgXCJmaWxlXCI6IFwibW9sbHdlaWRlXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIE1vbGx3ZWlkZSBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBkZSBNb2xsd2VpZGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJhemllcXVpXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImF6aWVxdWlcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgQXppbXV0aGFsIGVxdWlkaXN0YW50IHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plY8Onw6NvIGF6aW11dGFsIGVxdWlkaXN0YW50ZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImdub21vXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImdub21vXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIEdub21vbmljIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plY8Onw6NvIGdub23DtG5pY2FcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJzdGVyZW9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwic3RlcmVvXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFN0ZXJlb2dyYXBoaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBlc3RlcmVvZ3LDoWZpY2FcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJvcnRob1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJvcnRob1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBPcnRob2dyYXBoaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gb3J0b2dyw6FmaWNcIlxuICAgICAgfVxuICAgIH1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJBUFBfVElUTEVcIjoge1xuICAgIFwiZW5cIjogXCJNYXBzIG9mIHRoZSBFYXJ0aFwiLFxuICAgIFwicHRcIjogXCJNYXBhcyBkYSBUZXJyYVwiXG4gIH0sXG4gIFwiTU9SRV9BQk9VVFwiOiB7XG4gICAgXCJlblwiOiBcIk1vcmUgYWJvdXRcIixcbiAgICBcInB0XCI6IFwiTWFpcyBzb2JyZVwiXG4gIH0sXG4gIFwiXCI6IHtcbiAgICBcImVuXCI6IFwiXCIsXG4gICAgXCJwdFwiOiBcIlwiXG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tICcuL3VpJztcblxuLy8gSW5pdCBVSVxuY29uc3QgdWkgPSBuZXcgVUkoKTtcbndpbmRvdy5Tb0VVSSA9IHVpO1xuXG4kKCgpID0+IHtcbiAgdWkuaW5pdCgpO1xuXG4gIC8vIEhvb2sgbGFuZ3VhZ2UgY2hhbmdlIGxpbmtzXG4gICQoJ1tkYXRhLXVpLWxhbmctc2V0XScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2LnRhcmdldCk7XG4gICAgdWkuc2V0TGFuZ3VhZ2UoJHRhcmdldC5hdHRyKCdkYXRhLXVpLWxhbmctc2V0JykpO1xuICAgICQoJ2FbZGF0YS11aS1sYW5nLXNldF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBoZWxwIGZpbGVzXG4gICQoJ1tkYXRhLXVpLWhlbHBdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgdWkuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWhlbHAnKSwgJ3JpZ2h0Jyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBpbmZvIHBhbmUgY2xvc2UgYnV0dG9uc1xuICAkKCcuaW5mb19wYW5lLWNsb3NlJykuY2xpY2soKGV2KSA9PiB7XG4gICAgdWkuaGlkZUluZm8oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBTZXQga2V5Ym9hcmQgY29tbWFuZHNcbiAgJCh3aW5kb3cpLm9uKCdrZXlwcmVzcycsIChldikgPT4ge1xuICAgIC8vIDEgLSBUb2dnbGUgY291bnRyaWVzIHZpc2libGVcbiAgICBpZiAoZXYud2hpY2ggPT09ICcxJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldENvdW50cmllc1Zpc2libGUoIXVpLmdldENvdW50cmllc1Zpc2libGUoKSk7XG4gICAgLy8gMiAtIFRvZ2dsZSBncmF0aWN1bGUgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICcyJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldEdyYXRpY3VsZVZpc2libGUoIXVpLmdldEdyYXRpY3VsZVZpc2libGUoKSk7XG4gICAgLy8gMyAtIFRvZ2dsZSByYXN0ZXIgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICczJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldFJhc3RlclZpc2libGUoIXVpLmdldFJhc3RlclZpc2libGUoKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFVJU3RyaW5ncyBmcm9tICcuLi9jb25maWcvc3RyaW5ncy5qc29uJztcbmltcG9ydCBIZWxwQ2ZnIGZyb20gJy4uL2NvbmZpZy9oZWxwLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSAnZW4nO1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuaGVscEZpbGUgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy50b29sID0gJ3JvdGF0ZSc7XG4gICAgdGhpcy5wcm9qZWN0aW9uID0gJ3BsYXRlY2FycmUnO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLnNldExhbmd1YWdlKCdlbicpO1xuICAgIHRoaXMuc2V0VG9vbCgncm90YXRlJyk7XG4gICAgdGhpcy5zZXRQcm9qZWN0aW9uKCdwbGF0ZWNhcnJlJyk7XG4gICAgdGhpcy5pbml0VG9vbEJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRQcm9qZWN0aW9uQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdENvbW1hbmRCdXR0b25zKCk7XG4gICAgdGhpcy5pbml0SGVscEJhbm5lcnMoKTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmdDb2RlO1xuXG4gICAgLy8gU2V0cyBhIGxhbmd1YWdlIGNsYXNzIGluIHRoZSBib2R5XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCgvKF58XFxzKWxhbmctXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgIH0pO1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhgbGFuZy0ke2xhbmdDb2RlfWApO1xuXG4gICAgLy8gUmVsb2FkIHRoZSBjdXJyZW50IGhlbHAgZmlsZSB3aXRoIHRoZSBuZXcgbGFuZ3VhZ2VcbiAgICBpZiAodGhpcy5oZWxwRmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgpO1xuICAgIH1cblxuICAgIC8vIEluamVjdCB0cmFuc2xhdGFibGUgc3RyaW5nc1xuICAgIHRoaXMuaW5qZWN0U3RyaW5ncygpO1xuICB9XG5cbiAgaW5qZWN0U3RyaW5ncygpIHtcbiAgICAkKCdbZGF0YS11aS1zdHJdJykuZWFjaCgoaSwgZWxlbWVudCkgPT4ge1xuICAgICAgJChlbGVtZW50KS5odG1sKHRoaXMuc3RyKCQoZWxlbWVudCkuYXR0cignZGF0YS11aS1zdHInKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2U7XG4gIH1cblxuICBkaXNwbGF5SGVscEZpbGUoaGVscEZpbGVJRCA9IHRoaXMuaGVscEZpbGUsIHBhbmUgPSB0aGlzLmhlbHBQYW5lKSB7XG4gICAgZDMudGV4dChgLi90eHQvJHt0aGlzLmdldExhbmd1YWdlKCl9LyR7aGVscEZpbGVJRH0uaHRtbGAsIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIHRoaXMuZGlzcGxheUluZm8odGV4dCwgcGFuZSk7XG4gICAgICB0aGlzLmhlbHBGaWxlID0gaGVscEZpbGVJRDtcbiAgICAgIHRoaXMuaGVscFBhbmUgPSBwYW5lO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvdW50cmllc1Zpc2libGU7XG4gIH1cblxuICBnZXRHcmF0aWN1bGVWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZTtcbiAgfVxuXG4gIGdldFJhc3RlclZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYXN0ZXJWaXNpYmxlO1xuICB9XG5cbiAgc2V0Q291bnRyaWVzVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ib3VuZGFyeScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0Q291bnRyaWVzVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRHcmF0aWN1bGVWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmdyYXRpY3VsZScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0R3JhdGljdWxlVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRSYXN0ZXJWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmxhbmQnKS5jc3MoeyB2aXNpYmlsaXR5OiAhaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgJCgnI21hcF90YWcgY2FudmFzJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRSYXN0ZXJWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHN0cihpZGVudGlmaWVyKSB7XG4gICAgaWYgKFVJU3RyaW5nc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgY29uc29sZS50cmFjZShgUmVxdWVzdGVkIHVuZGVmaW5lZCBVSSBTdHJpbmcgJyR7aWRlbnRpZmllcn0nYCk7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZGlzcGxheUluZm8oY29udGVudCwgcGFuZSkge1xuICAgIGNvbnNvbGUubG9nKHBhbmUpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcyhgZG9ja2VkLSR7cGFuZX1gKTtcblxuICAgICQoYC5pbmZvX3BhbmUtJHtwYW5lfSAuY29udGVudGApLmh0bWwoY29udGVudCk7XG4gICAgJCgnLmluZm9fcGFuZScpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJChgLmluZm9fcGFuZS0ke3BhbmV9YCkuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvKCkge1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG5cbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm9MZWZ0KCkge1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvUmlnaHQoKSB7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBpbml0VG9vbEJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktdG9vbF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuc2V0VG9vbCgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS10b29sJykpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy50b29sO1xuICB9XG5cbiAgc2V0VG9vbChhVG9vbCkge1xuICAgIHRoaXMudG9vbCA9IGFUb29sO1xuICAgICQoJ1tkYXRhLXVpLXRvb2xdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoYFtkYXRhLXVpLXRvb2w9JHthVG9vbH1dYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHVwZGF0ZU1hcCgpO1xuICAgIHRoaXMuaGlkZUluZm9MZWZ0KCk7XG4gICAgdGhpcy5zaG93SGVscEJhbm5lcignbGVmdCcsICd0b29scycsIGFUb29sKTtcbiAgfVxuXG4gIGluaXRQcm9qZWN0aW9uQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRQcm9qZWN0aW9uKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXByb2plY3Rpb24nKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQcm9qZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3Rpb247XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uKGFQcm9qZWN0aW9uKSB7XG4gICAgdGhpcy5wcm9qZWN0aW9uID0gYVByb2plY3Rpb247XG4gICAgJCgnW2RhdGEtdWktcHJvamVjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktcHJvamVjdGlvbj0ke2FQcm9qZWN0aW9ufV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gICAgdGhpcy5oaWRlSW5mb1JpZ2h0KCk7XG4gICAgdGhpcy5zaG93SGVscEJhbm5lcigncmlnaHQnLCAncHJvamVjdGlvbnMnLCBhUHJvamVjdGlvbik7XG4gIH1cblxuICBpbml0SGVscEJhbm5lcnMoKSB7XG4gICAgJCgnLmhlbHAtYmFubmVyLWxlZnQnKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJyksICdsZWZ0Jyk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKCcuaGVscC1iYW5uZXItcmlnaHQnKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJyksICdyaWdodCcpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SGVscEJhbm5lclRleHQoY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zdHIoJ01PUkVfQUJPVVQnKX0gJHtIZWxwQ2ZnW2NhdGVnb3J5XVtpdGVtXS5uYW1lW3RoaXMuZ2V0TGFuZ3VhZ2UoKV19YDtcbiAgfVxuXG4gIGdldEhlbHBCYW5uZXJQYWdlKGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIEhlbHBDZmdbY2F0ZWdvcnldW2l0ZW1dLmZpbGU7XG4gIH1cblxuICBzaG93SGVscEJhbm5lcihiYW5uZXJJRCwgY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKVxuICAgICAgLmh0bWwodGhpcy5nZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcsIHRoaXMuZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pKVxuICAgICAgLmZhZGVJbigpXG4gICAgICAuY3NzKCdkaXNwbGF5JywgJ2lubGluZS1ibG9jaycpO1xuICB9XG5cbiAgaGlkZUhlbHBCYW5uZXIoYmFubmVySUQpIHtcbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKS5mYWRlT3V0KCk7XG4gIH1cblxuICBpbml0Q29tbWFuZEJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktY29tbWFuZD1jbGVhcl0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJNYXJrcygpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtdWktY29tbWFuZD11bmRvXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy51bmRvTWFyaygpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJNYXJrcygpIHtcbiAgICBjbGVhckdlb2Rlc2ljKCk7XG4gICAgY2xlYXJMb3hvZHJvbWUoKTtcbiAgICBjbGVhckVsbGlwc2VzKCk7XG4gIH1cblxuICB1bmRvTWFyaygpIHtcblxuICB9XG59XG4iXX0=
