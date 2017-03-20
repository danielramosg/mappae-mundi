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
    value: function undoMark() {
      undoCommand();
    }
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/help.json":1,"../config/strings.json":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNkQTs7Ozs7O0FBRUE7QUFDQSxJQUFNLEtBQUssa0JBQVg7QUFDQSxPQUFPLEtBQVAsR0FBZSxFQUFmOztBQUVBLEVBQUUsWUFBTTtBQUNOLEtBQUcsSUFBSDs7QUFFQTtBQUNBLElBQUUsb0JBQUYsRUFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQyxFQUFELEVBQVE7QUFDMUMsUUFBTSxVQUFVLEVBQUUsR0FBRyxNQUFMLENBQWhCO0FBQ0EsT0FB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K0IsT0FBL0IsRUFBd0MsVUFBQyxFQUFELEVBQVE7QUFDOUMsZUFBSyxRQUFMO0FBQ0EsV0FBRyxjQUFIO0FBQ0EsV0FBRyxlQUFIO0FBQ0QsT0FKRDtBQUtEOzs7aUNBRVk7QUFDWDtBQUNBO0FBQ0E7QUFDRDs7OytCQUVVO0FBQ1Q7QUFDRDs7Ozs7O2tCQS9Oa0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidG9vbHNcIjoge1xuICAgIFwicm90YXRlXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJyb3RhdGluZyB0aGUgZ2xvYmVcIixcbiAgICAgICAgXCJwdFwiOiBcImdpcmFyIG8gZ2xvYm9cIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fcm90YXRlXCJcbiAgICB9LFxuICAgIFwiaW5kaWNhdHJpeFwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFRpc3NvdCBpbmRpY2F0cml4XCIsXG4gICAgICAgIFwicHRcIjogXCJhIGluZGljYXRyaXogZGUgVGlzc290XCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX3Rpc3NvdFwiXG4gICAgfSxcbiAgICBcImdlb2Rlc2ljXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJnZW9kZXNpY3NcIixcbiAgICAgICAgXCJwdFwiOiBcImdlb2TDqXNpY2FzXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX2dlb2Rlc2ljXCJcbiAgICB9LFxuICAgIFwibG94b2Ryb21lXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJsb3hvZHJvbWVzXCIsXG4gICAgICAgIFwicHRcIjogXCJsb3hvZHLDs21pYXNcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fbG94b2Ryb21lXCJcbiAgICB9XG4gIH0sXG4gIFwicHJvamVjdGlvbnNcIjoge1xuICAgIFwicGxhdGVjYXJyZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJwbGF0ZWNhcnJlXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFBsYXRlIENhcnLDqWUgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBFcXVpcmVjdGFuZ3VsYXJcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJtZXJjYXRvclwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtZXJjYXRvclwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBNZXJjYXRvciBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBkZSBNZXJjYXRvclwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImdhbGxwZXRlcnNcIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ2FsbHBldGVyc1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBHYWxsLVBldGVycyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBkZSBHYWxsLVBldGVyc1wiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm1vbGx3ZWlkZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtb2xsd2VpZGVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTW9sbHdlaWRlIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plY8Onw6NvIGRlIE1vbGx3ZWlkZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImF6aWVxdWlcIjoge1xuICAgICAgXCJmaWxlXCI6IFwiYXppZXF1aVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBBemltdXRoYWwgZXF1aWRpc3RhbnQgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gYXppbXV0YWwgZXF1aWRpc3RhbnRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZ25vbW9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwiZ25vbW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgR25vbW9uaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamVjw6fDo28gZ25vbcO0bmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcInN0ZXJlb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJzdGVyZW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIGVzdGVyZW9ncsOhZmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm9ydGhvXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcIm9ydGhvXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIE9ydGhvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZWPDp8OjbyBvcnRvZ3LDoWZpY1wiXG4gICAgICB9XG4gICAgfVxuICB9XG59IiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIkFQUF9USVRMRVwiOiB7XG4gICAgXCJlblwiOiBcIk1hcHMgb2YgdGhlIEVhcnRoXCIsXG4gICAgXCJwdFwiOiBcIk1hcGFzIGRhIFRlcnJhXCJcbiAgfSxcbiAgXCJNT1JFX0FCT1VUXCI6IHtcbiAgICBcImVuXCI6IFwiTW9yZSBhYm91dFwiLFxuICAgIFwicHRcIjogXCJNYWlzIHNvYnJlXCJcbiAgfSxcbiAgXCJcIjoge1xuICAgIFwiZW5cIjogXCJcIixcbiAgICBcInB0XCI6IFwiXCJcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gJy4vdWknO1xuXG4vLyBJbml0IFVJXG5jb25zdCB1aSA9IG5ldyBVSSgpO1xud2luZG93LlNvRVVJID0gdWk7XG5cbiQoKCkgPT4ge1xuICB1aS5pbml0KCk7XG5cbiAgLy8gSG9vayBsYW5ndWFnZSBjaGFuZ2UgbGlua3NcbiAgJCgnW2RhdGEtdWktbGFuZy1zZXRdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgY29uc3QgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICB1aS5zZXRMYW5ndWFnZSgkdGFyZ2V0LmF0dHIoJ2RhdGEtdWktbGFuZy1zZXQnKSk7XG4gICAgJCgnYVtkYXRhLXVpLWxhbmctc2V0XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkdGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGhlbHAgZmlsZXNcbiAgJCgnW2RhdGEtdWktaGVscF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICB1aS5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktaGVscCcpLCAncmlnaHQnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGluZm8gcGFuZSBjbG9zZSBidXR0b25zXG4gICQoJy5pbmZvX3BhbmUtY2xvc2UnKS5jbGljaygoZXYpID0+IHtcbiAgICB1aS5oaWRlSW5mbygpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFNldCBrZXlib2FyZCBjb21tYW5kc1xuICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgKGV2KSA9PiB7XG4gICAgLy8gMSAtIFRvZ2dsZSBjb3VudHJpZXMgdmlzaWJsZVxuICAgIGlmIChldi53aGljaCA9PT0gJzEnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0Q291bnRyaWVzVmlzaWJsZSghdWkuZ2V0Q291bnRyaWVzVmlzaWJsZSgpKTtcbiAgICAvLyAyIC0gVG9nZ2xlIGdyYXRpY3VsZSB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzInLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0R3JhdGljdWxlVmlzaWJsZSghdWkuZ2V0R3JhdGljdWxlVmlzaWJsZSgpKTtcbiAgICAvLyAzIC0gVG9nZ2xlIHJhc3RlciB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzMnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0UmFzdGVyVmlzaWJsZSghdWkuZ2V0UmFzdGVyVmlzaWJsZSgpKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgVUlTdHJpbmdzIGZyb20gJy4uL2NvbmZpZy9zdHJpbmdzLmpzb24nO1xuaW1wb3J0IEhlbHBDZmcgZnJvbSAnLi4vY29uZmlnL2hlbHAuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9ICdlbic7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5oZWxwRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvb2wgPSAncm90YXRlJztcbiAgICB0aGlzLnByb2plY3Rpb24gPSAncGxhdGVjYXJyZSc7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UoJ2VuJyk7XG4gICAgdGhpcy5zZXRUb29sKCdyb3RhdGUnKTtcbiAgICB0aGlzLnNldFByb2plY3Rpb24oJ3BsYXRlY2FycmUnKTtcbiAgICB0aGlzLmluaXRUb29sQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdFByb2plY3Rpb25CdXR0b25zKCk7XG4gICAgdGhpcy5pbml0Q29tbWFuZEJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRIZWxwQmFubmVycygpO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ0NvZGU7XG5cbiAgICAvLyBTZXRzIGEgbGFuZ3VhZ2UgY2xhc3MgaW4gdGhlIGJvZHlcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgIHJldHVybiAoY2xhc3NOYW1lLm1hdGNoKC8oXnxcXHMpbGFuZy1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgfSk7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKGBsYW5nLSR7bGFuZ0NvZGV9YCk7XG5cbiAgICAvLyBSZWxvYWQgdGhlIGN1cnJlbnQgaGVscCBmaWxlIHdpdGggdGhlIG5ldyBsYW5ndWFnZVxuICAgIGlmICh0aGlzLmhlbHBGaWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCk7XG4gICAgfVxuXG4gICAgLy8gSW5qZWN0IHRyYW5zbGF0YWJsZSBzdHJpbmdzXG4gICAgdGhpcy5pbmplY3RTdHJpbmdzKCk7XG4gIH1cblxuICBpbmplY3RTdHJpbmdzKCkge1xuICAgICQoJ1tkYXRhLXVpLXN0cl0nKS5lYWNoKChpLCBlbGVtZW50KSA9PiB7XG4gICAgICAkKGVsZW1lbnQpLmh0bWwodGhpcy5zdHIoJChlbGVtZW50KS5hdHRyKCdkYXRhLXVpLXN0cicpKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRMYW5ndWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZTtcbiAgfVxuXG4gIGRpc3BsYXlIZWxwRmlsZShoZWxwRmlsZUlEID0gdGhpcy5oZWxwRmlsZSwgcGFuZSA9IHRoaXMuaGVscFBhbmUpIHtcbiAgICBkMy50ZXh0KGAuL3R4dC8ke3RoaXMuZ2V0TGFuZ3VhZ2UoKX0vJHtoZWxwRmlsZUlEfS5odG1sYCwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgdGhpcy5kaXNwbGF5SW5mbyh0ZXh0LCBwYW5lKTtcbiAgICAgIHRoaXMuaGVscEZpbGUgPSBoZWxwRmlsZUlEO1xuICAgICAgdGhpcy5oZWxwUGFuZSA9IHBhbmU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb3VudHJpZXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZTtcbiAgfVxuXG4gIGdldEdyYXRpY3VsZVZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlO1xuICB9XG5cbiAgZ2V0UmFzdGVyVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Jhc3RlclZpc2libGU7XG4gIH1cblxuICBzZXRDb3VudHJpZXNWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmJvdW5kYXJ5JykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRDb3VudHJpZXNWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldEdyYXRpY3VsZVZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuZ3JhdGljdWxlJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRHcmF0aWN1bGVWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldFJhc3RlclZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcubGFuZCcpLmNzcyh7IHZpc2liaWxpdHk6ICFpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgICAkKCcjbWFwX3RhZyBjYW52YXMnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldFJhc3RlclZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc3RyKGlkZW50aWZpZXIpIHtcbiAgICBpZiAoVUlTdHJpbmdzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldO1xuICAgIH1cbiAgICBjb25zb2xlLnRyYWNlKGBSZXF1ZXN0ZWQgdW5kZWZpbmVkIFVJIFN0cmluZyAnJHtpZGVudGlmaWVyfSdgKTtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBkaXNwbGF5SW5mbyhjb250ZW50LCBwYW5lKSB7XG4gICAgY29uc29sZS5sb2cocGFuZSk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcbiAgICAkKCcubWFwX3RhZycpLmFkZENsYXNzKGBkb2NrZWQtJHtwYW5lfWApO1xuXG4gICAgJChgLmluZm9fcGFuZS0ke3BhbmV9IC5jb250ZW50YCkuaHRtbChjb250ZW50KTtcbiAgICAkKCcuaW5mb19wYW5lJykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKGAuaW5mb19wYW5lLSR7cGFuZX1gKS5hZGRDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm8oKSB7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcblxuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mb0xlZnQoKSB7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm9SaWdodCgpIHtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGluaXRUb29sQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS10b29sXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRUb29sKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXRvb2wnKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRUb29sKCkge1xuICAgIHJldHVybiB0aGlzLnRvb2w7XG4gIH1cblxuICBzZXRUb29sKGFUb29sKSB7XG4gICAgdGhpcy50b29sID0gYVRvb2w7XG4gICAgJCgnW2RhdGEtdWktdG9vbF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktdG9vbD0ke2FUb29sfV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gICAgdGhpcy5oaWRlSW5mb0xlZnQoKTtcbiAgICB0aGlzLnNob3dIZWxwQmFubmVyKCdsZWZ0JywgJ3Rvb2xzJywgYVRvb2wpO1xuICB9XG5cbiAgaW5pdFByb2plY3Rpb25CdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLXByb2plY3Rpb25dJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnNldFByb2plY3Rpb24oJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktcHJvamVjdGlvbicpKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFByb2plY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMucHJvamVjdGlvbjtcbiAgfVxuXG4gIHNldFByb2plY3Rpb24oYVByb2plY3Rpb24pIHtcbiAgICB0aGlzLnByb2plY3Rpb24gPSBhUHJvamVjdGlvbjtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGBbZGF0YS11aS1wcm9qZWN0aW9uPSR7YVByb2plY3Rpb259XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgICB0aGlzLmhpZGVJbmZvUmlnaHQoKTtcbiAgICB0aGlzLnNob3dIZWxwQmFubmVyKCdyaWdodCcsICdwcm9qZWN0aW9ucycsIGFQcm9qZWN0aW9uKTtcbiAgfVxuXG4gIGluaXRIZWxwQmFubmVycygpIHtcbiAgICAkKCcuaGVscC1iYW5uZXItbGVmdCcpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnKSwgJ2xlZnQnKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcblxuICAgICQoJy5oZWxwLWJhbm5lci1yaWdodCcpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnKSwgJ3JpZ2h0Jyk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRIZWxwQmFubmVyVGV4dChjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBgJHt0aGlzLnN0cignTU9SRV9BQk9VVCcpfSAke0hlbHBDZmdbY2F0ZWdvcnldW2l0ZW1dLm5hbWVbdGhpcy5nZXRMYW5ndWFnZSgpXX1gO1xuICB9XG5cbiAgZ2V0SGVscEJhbm5lclBhZ2UoY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gSGVscENmZ1tjYXRlZ29yeV1baXRlbV0uZmlsZTtcbiAgfVxuXG4gIHNob3dIZWxwQmFubmVyKGJhbm5lcklELCBjYXRlZ29yeSwgaXRlbSkge1xuICAgICQoYC5oZWxwLWJhbm5lci0ke2Jhbm5lcklEfWApXG4gICAgICAuaHRtbCh0aGlzLmdldEhlbHBCYW5uZXJUZXh0KGNhdGVnb3J5LCBpdGVtKSlcbiAgICAgIC5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJywgdGhpcy5nZXRIZWxwQmFubmVyUGFnZShjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuZmFkZUluKClcbiAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gIH1cblxuICBoaWRlSGVscEJhbm5lcihiYW5uZXJJRCkge1xuICAgICQoYC5oZWxwLWJhbm5lci0ke2Jhbm5lcklEfWApLmZhZGVPdXQoKTtcbiAgfVxuXG4gIGluaXRDb21tYW5kQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS1jb21tYW5kPWNsZWFyXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5jbGVhck1hcmtzKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS11aS1jb21tYW5kPXVuZG9dJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnVuZG9NYXJrKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhck1hcmtzKCkge1xuICAgIGNsZWFyR2VvZGVzaWMoKTtcbiAgICBjbGVhckxveG9kcm9tZSgpO1xuICAgIGNsZWFyRWxsaXBzZXMoKTtcbiAgfVxuXG4gIHVuZG9NYXJrKCkge1xuICAgIHVuZG9Db21tYW5kKCk7XG4gIH1cbn1cbiJdfQ==
