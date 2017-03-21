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
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/help.json":1,"../config/strings.json":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDOUNBOzs7Ozs7QUFFQTtBQUNBLElBQU0sS0FBSyxrQkFBWDtBQUNBLE9B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T0FKRDtBQUtEOzs7aUNBRVk7QUFDWDtBQUNBO0FBQ0E7QUFDRDs7OytCQUVVO0FBQ1Q7QUFDRDs7Ozs7O2tCQXhQa0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidG9vbHNcIjoge1xuICAgIFwicm90YXRlXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJyb3RhdGluZyB0aGUgZ2xvYmVcIixcbiAgICAgICAgXCJwdFwiOiBcImdpcmFyIG8gZ2xvYm9cIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fcm90YXRlXCJcbiAgICB9LFxuICAgIFwiaW5kaWNhdHJpeFwiOiB7XG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFRpc3NvdCBpbmRpY2F0cml4XCIsXG4gICAgICAgIFwicHRcIjogXCJhIGluZGljYXRyaXogZGUgVGlzc290XCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX3Rpc3NvdFwiXG4gICAgfSxcbiAgICBcImdlb2Rlc2ljXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJnZW9kZXNpY3NcIixcbiAgICAgICAgXCJwdFwiOiBcImdlb2TDqXNpY2FzXCJcbiAgICAgIH0sXG4gICAgICBcImZpbGVcIjogXCJpbmZvX2dlb2Rlc2ljXCJcbiAgICB9LFxuICAgIFwibG94b2Ryb21lXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJsb3hvZHJvbWVzXCIsXG4gICAgICAgIFwicHRcIjogXCJsb3hvZHLDs21pYXNcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fbG94b2Ryb21lXCJcbiAgICB9XG4gIH0sXG4gIFwicHJvamVjdGlvbnNcIjoge1xuICAgIFwicGxhdGVjYXJyZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJwbGF0ZWNhcnJlXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFBsYXRlIENhcnLDqWUgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBDaWzDrW5kcmljYSBlcXVpZGlzdGFudGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJtZXJjYXRvclwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtZXJjYXRvclwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBNZXJjYXRvciBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIGRlIE1lcmNhdG9yXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZ2FsbHBldGVyc1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJnYWxscGV0ZXJzXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIEdhbGwtUGV0ZXJzIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcInByb2plw6fDo28gQ2lsw61uZHJpY2EgZXF1aXZhbGVudGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJtb2xsd2VpZGVcIjoge1xuICAgICAgXCJmaWxlXCI6IFwibW9sbHdlaWRlXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIE1vbGx3ZWlkZSBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIGRlIE1vbGx3ZWlkZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcImF6aWVxdWlcIjoge1xuICAgICAgXCJmaWxlXCI6IFwiYXppZXF1aVwiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBBemltdXRoYWwgZXF1aWRpc3RhbnQgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBBemltdXRhbCBlcXVpZGlzdGFudGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJnbm9tb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJnbm9tb1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBHbm9tb25pYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJwcm9qZcOnw6NvIEdub23Ds25pY2FcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJzdGVyZW9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwic3RlcmVvXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIFN0ZXJlb2dyYXBoaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBFc3RlcmVvZ3LDoWZpY2FcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJvcnRob1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJvcnRob1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBPcnRob2dyYXBoaWMgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwicHJvamXDp8OjbyBPcnRvZ3LDoWZpY2FcIlxuICAgICAgfVxuICAgIH1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJBUFBfVElUTEVcIjoge1xuICAgIFwiZW5cIjogXCJNYXBwYWUgTXVuZGlcIixcbiAgICBcInB0XCI6IFwiTWFwcGFlIE11bmRpXCJcbiAgfSxcbiAgXCJNT1JFX0FCT1VUXCI6IHtcbiAgICBcImVuXCI6IFwiTW9yZSBhYm91dFwiLFxuICAgIFwicHRcIjogXCJNYWlzIHNvYnJlXCJcbiAgfSxcbiAgXCJQUl9BQkJSX1BMQVRFQ0FSUkVcIjoge1xuICAgIFwiZW5cIjogXCJQbFwiLFxuICAgIFwicHRcIjogXCJDRWRcIlxuICB9LFxuICBcIlBSX0FCQlJfTUVSQ0FUT1JcIjoge1xuICAgIFwiZW5cIjogXCJNZVwiLFxuICAgIFwicHRcIjogXCJNZXJcIlxuICB9LFxuICBcIlBSX0FCQlJfR0FMTFBFVEVSU1wiOiB7XG4gICAgXCJlblwiOiBcIkdhXCIsXG4gICAgXCJwdFwiOiBcIkNFdlwiXG4gIH0sXG4gIFwiUFJfQUJCUl9NT0xMV0VJREVcIjoge1xuICAgIFwiZW5cIjogXCJNd1wiLFxuICAgIFwicHRcIjogXCJNbHdcIlxuICB9LFxuICBcIlBSX0FCQlJfQVpJRVFVSVwiOiB7XG4gICAgXCJlblwiOiBcIkF6XCIsXG4gICAgXCJwdFwiOiBcIkF6RVwiXG4gIH0sXG4gIFwiUFJfQUJCUl9HTk9NT1wiOiB7XG4gICAgXCJlblwiOiBcIkduXCIsXG4gICAgXCJwdFwiOiBcIkdub1wiXG4gIH0sXG4gIFwiUFJfQUJCUl9TVEVSRU9cIjoge1xuICAgIFwiZW5cIjogXCJTdFwiLFxuICAgIFwicHRcIjogXCJFc3RcIlxuICB9LFxuICBcIlBSX0FCQlJfT1JUSE9cIjoge1xuICAgIFwiZW5cIjogXCJPclwiLFxuICAgIFwicHRcIjogXCJPcnRcIlxuICB9LFxuICBcIlwiOiB7XG4gICAgXCJlblwiOiBcIlwiLFxuICAgIFwicHRcIjogXCJcIlxuICB9XG59XG4iLCJpbXBvcnQgVUkgZnJvbSAnLi91aSc7XG5cbi8vIEluaXQgVUlcbmNvbnN0IHVpID0gbmV3IFVJKCk7XG53aW5kb3cuU29FVUkgPSB1aTtcblxuJCgoKSA9PiB7XG4gIHVpLmluaXQoKTtcblxuICAvLyBIb29rIGxhbmd1YWdlIGNoYW5nZSBsaW5rc1xuICAkKCdbZGF0YS11aS1sYW5nLXNldF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0ID0gJChldi50YXJnZXQpO1xuICAgIHVpLnNldExhbmd1YWdlKCR0YXJnZXQuYXR0cignZGF0YS11aS1sYW5nLXNldCcpKTtcbiAgICAkKCdhW2RhdGEtdWktbGFuZy1zZXRdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIEhvb2sgaGVscCBmaWxlc1xuICAkKCdbZGF0YS11aS1oZWxwXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIHVpLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1oZWxwJyksICdyaWdodCcpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIEhvb2sgaW5mbyBwYW5lIGNsb3NlIGJ1dHRvbnNcbiAgJCgnLmluZm9fcGFuZS1jbG9zZScpLmNsaWNrKChldikgPT4ge1xuICAgIHVpLmhpZGVJbmZvKCk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gU2V0IGtleWJvYXJkIGNvbW1hbmRzXG4gICQod2luZG93KS5vbigna2V5cHJlc3MnLCAoZXYpID0+IHtcbiAgICAvLyAxIC0gVG9nZ2xlIGNvdW50cmllcyB2aXNpYmxlXG4gICAgaWYgKGV2LndoaWNoID09PSAnMScuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5zZXRDb3VudHJpZXNWaXNpYmxlKCF1aS5nZXRDb3VudHJpZXNWaXNpYmxlKCkpO1xuICAgIC8vIDIgLSBUb2dnbGUgZ3JhdGljdWxlIHZpc2libGVcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnMicuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5zZXRHcmF0aWN1bGVWaXNpYmxlKCF1aS5nZXRHcmF0aWN1bGVWaXNpYmxlKCkpO1xuICAgIC8vIDMgLSBUb2dnbGUgcmFzdGVyIHZpc2libGVcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnMycuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5zZXRSYXN0ZXJWaXNpYmxlKCF1aS5nZXRSYXN0ZXJWaXNpYmxlKCkpO1xuICAgIH1cbiAgfSk7XG59KTtcbiIsImltcG9ydCBVSVN0cmluZ3MgZnJvbSAnLi4vY29uZmlnL3N0cmluZ3MuanNvbic7XG5pbXBvcnQgSGVscENmZyBmcm9tICcuLi9jb25maWcvaGVscC5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gJ2VuJztcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gZmFsc2U7XG5cbiAgICB0aGlzLmhlbHBGaWxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudG9vbCA9ICdyb3RhdGUnO1xuICAgIHRoaXMucHJvamVjdGlvbiA9ICdwbGF0ZWNhcnJlJztcblxuICAgIHRoaXMuaGVscEJhbm5lcnMgPSB7fTtcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXRMYW5ndWFnZSgnZW4nKTtcbiAgICB0aGlzLnNldFRvb2woJ3JvdGF0ZScpO1xuICAgIHRoaXMuc2V0UHJvamVjdGlvbigncGxhdGVjYXJyZScpO1xuICAgIHRoaXMuaW5pdFRvb2xCdXR0b25zKCk7XG4gICAgdGhpcy5pbml0UHJvamVjdGlvbkJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRDb21tYW5kQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdEhlbHBCYW5uZXJzKCk7XG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5nQ29kZSkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5nQ29kZTtcblxuICAgIC8vIFNldHMgYSBsYW5ndWFnZSBjbGFzcyBpbiB0aGUgYm9keVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccylsYW5nLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICB9KTtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoYGxhbmctJHtsYW5nQ29kZX1gKTtcblxuICAgIC8vIFJlbG9hZCB0aGUgY3VycmVudCBoZWxwIGZpbGUgd2l0aCB0aGUgbmV3IGxhbmd1YWdlXG4gICAgaWYgKHRoaXMuaGVscEZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoKTtcbiAgICB9XG5cbiAgICAvLyBSZWxvYWQgdGhlIGhlbHAgYmFubmVyc1xuICAgIGZvciAoY29uc3QgYmFubmVySUQgb2YgT2JqZWN0LmtleXModGhpcy5oZWxwQmFubmVycykpIHtcbiAgICAgIGlmICh0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXSkge1xuICAgICAgICB0aGlzLnNob3dIZWxwQmFubmVyKFxuICAgICAgICAgIGJhbm5lcklELFxuICAgICAgICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdLmNhdGVnb3J5LFxuICAgICAgICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdLml0ZW1cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBJbmplY3QgdHJhbnNsYXRhYmxlIHN0cmluZ3NcbiAgICB0aGlzLmluamVjdFN0cmluZ3MoKTtcbiAgfVxuXG4gIGluamVjdFN0cmluZ3MoKSB7XG4gICAgJCgnW2RhdGEtdWktc3RyXScpLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICQoZWxlbWVudCkuaHRtbCh0aGlzLnN0cigkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtdWktc3RyJykpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldExhbmd1YWdlKCkge1xuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlO1xuICB9XG5cbiAgZGlzcGxheUhlbHBGaWxlKGhlbHBGaWxlSUQgPSB0aGlzLmhlbHBGaWxlLCBwYW5lID0gdGhpcy5oZWxwUGFuZSkge1xuICAgIGQzLnRleHQoYC4vdHh0LyR7dGhpcy5nZXRMYW5ndWFnZSgpfS8ke2hlbHBGaWxlSUR9Lmh0bWxgLCAoZXJyb3IsIHRleHQpID0+IHtcbiAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICB0aGlzLmRpc3BsYXlJbmZvKHRleHQsIHBhbmUpO1xuICAgICAgdGhpcy5oZWxwRmlsZSA9IGhlbHBGaWxlSUQ7XG4gICAgICB0aGlzLmhlbHBQYW5lID0gcGFuZTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvdW50cmllc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlO1xuICB9XG5cbiAgZ2V0R3JhdGljdWxlVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0dyYXRpY3VsZVZpc2libGU7XG4gIH1cblxuICBnZXRSYXN0ZXJWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzUmFzdGVyVmlzaWJsZTtcbiAgfVxuXG4gIHNldENvdW50cmllc1Zpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuYm91bmRhcnknKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldENvdW50cmllc1Zpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc2V0R3JhdGljdWxlVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ncmF0aWN1bGUnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldEdyYXRpY3VsZVZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc2V0UmFzdGVyVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5sYW5kJykuY3NzKHsgdmlzaWJpbGl0eTogIWlzVmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICAgICQoJyNtYXBfdGFnIGNhbnZhcycpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0UmFzdGVyVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgaWYgKGlzVmlzaWJsZSkge1xuICAgICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcygncmFzdGVyLXZpc2libGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygncmFzdGVyLXZpc2libGUnKTtcbiAgICB9XG4gIH1cblxuICBzdHIoaWRlbnRpZmllcikge1xuICAgIGlmIChVSVN0cmluZ3NbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV07XG4gICAgfVxuICAgIGNvbnNvbGUudHJhY2UoYFJlcXVlc3RlZCB1bmRlZmluZWQgVUkgU3RyaW5nICcke2lkZW50aWZpZXJ9J2ApO1xuICAgIHJldHVybiAnJztcbiAgfVxuXG4gIGRpc3BsYXlJbmZvKGNvbnRlbnQsIHBhbmUpIHtcbiAgICBjb25zb2xlLmxvZyhwYW5lKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuICAgICQoJy5tYXBfdGFnJykuYWRkQ2xhc3MoYGRvY2tlZC0ke3BhbmV9YCk7XG5cbiAgICAkKGAuaW5mb19wYW5lLSR7cGFuZX0gLmNvbnRlbnRgKS5odG1sKGNvbnRlbnQpO1xuICAgICQoJy5pbmZvX3BhbmUnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoYC5pbmZvX3BhbmUtJHtwYW5lfWApLmFkZENsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mbygpIHtcbiAgICB0aGlzLmhlbHBGaWxlID0gbnVsbDtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuXG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvTGVmdCgpIHtcbiAgICB0aGlzLmhlbHBGaWxlID0gbnVsbDtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mb1JpZ2h0KCkge1xuICAgIHRoaXMuaGVscEZpbGUgPSBudWxsO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaW5pdFRvb2xCdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLXRvb2xdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnNldFRvb2woJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktdG9vbCcpKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudG9vbDtcbiAgfVxuXG4gIHNldFRvb2woYVRvb2wpIHtcbiAgICB0aGlzLnRvb2wgPSBhVG9vbDtcbiAgICAkKCdbZGF0YS11aS10b29sXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGBbZGF0YS11aS10b29sPSR7YVRvb2x9XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgICB0aGlzLmhpZGVJbmZvTGVmdCgpO1xuICAgIHRoaXMuc2hvd0hlbHBCYW5uZXIoJ2xlZnQnLCAndG9vbHMnLCBhVG9vbCk7XG4gIH1cblxuICBpbml0UHJvamVjdGlvbkJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktcHJvamVjdGlvbl0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuc2V0UHJvamVjdGlvbigkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1wcm9qZWN0aW9uJykpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHJvamVjdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5wcm9qZWN0aW9uO1xuICB9XG5cbiAgc2V0UHJvamVjdGlvbihhUHJvamVjdGlvbikge1xuICAgIHRoaXMucHJvamVjdGlvbiA9IGFQcm9qZWN0aW9uO1xuICAgICQoJ1tkYXRhLXVpLXByb2plY3Rpb25dJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoYFtkYXRhLXVpLXByb2plY3Rpb249JHthUHJvamVjdGlvbn1dYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHVwZGF0ZU1hcCgpO1xuICAgIHRoaXMuaGlkZUluZm9SaWdodCgpO1xuICAgIHRoaXMuc2hvd0hlbHBCYW5uZXIoJ3JpZ2h0JywgJ3Byb2plY3Rpb25zJywgYVByb2plY3Rpb24pO1xuICB9XG5cbiAgaW5pdEhlbHBCYW5uZXJzKCkge1xuICAgICQoJy5oZWxwLWJhbm5lci1sZWZ0Jykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcpLCAnbGVmdCcpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJCgnLmhlbHAtYmFubmVyLXJpZ2h0Jykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1iYW5uZXItaGVscCcpLCAncmlnaHQnKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldEhlbHBCYW5uZXJUZXh0KGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIGAke3RoaXMuc3RyKCdNT1JFX0FCT1VUJyl9ICR7SGVscENmZ1tjYXRlZ29yeV1baXRlbV0ubmFtZVt0aGlzLmdldExhbmd1YWdlKCldfWA7XG4gIH1cblxuICBnZXRIZWxwQmFubmVyUGFnZShjYXRlZ29yeSwgaXRlbSkge1xuICAgIHJldHVybiBIZWxwQ2ZnW2NhdGVnb3J5XVtpdGVtXS5maWxlO1xuICB9XG5cbiAgc2hvd0hlbHBCYW5uZXIoYmFubmVySUQsIGNhdGVnb3J5LCBpdGVtKSB7XG5cbiAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXSA9IHsgY2F0ZWdvcnksIGl0ZW0gfTtcblxuICAgICQoYC5oZWxwLWJhbm5lci0ke2Jhbm5lcklEfWApXG4gICAgICAuaHRtbCh0aGlzLmdldEhlbHBCYW5uZXJUZXh0KGNhdGVnb3J5LCBpdGVtKSlcbiAgICAgIC5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJywgdGhpcy5nZXRIZWxwQmFubmVyUGFnZShjYXRlZ29yeSwgaXRlbSkpXG4gICAgICAuZmFkZUluKClcbiAgICAgIC5jc3MoJ2Rpc3BsYXknLCAnaW5saW5lLWJsb2NrJyk7XG4gIH1cblxuICBoaWRlSGVscEJhbm5lcihiYW5uZXJJRCkge1xuICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdID0gbnVsbDtcbiAgICAkKGAuaGVscC1iYW5uZXItJHtiYW5uZXJJRH1gKS5mYWRlT3V0KCk7XG4gIH1cblxuICBpbml0Q29tbWFuZEJ1dHRvbnMoKSB7XG4gICAgJCgnW2RhdGEtdWktY29tbWFuZD1jbGVhcl0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuY2xlYXJNYXJrcygpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuXG4gICAgJCgnW2RhdGEtdWktY29tbWFuZD11bmRvXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy51bmRvTWFyaygpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYXJNYXJrcygpIHtcbiAgICBjbGVhckdlb2Rlc2ljKCk7XG4gICAgY2xlYXJMb3hvZHJvbWUoKTtcbiAgICBjbGVhckVsbGlwc2VzKCk7XG4gIH1cblxuICB1bmRvTWFyaygpIHtcbiAgICB1bmRvQ29tbWFuZCgpO1xuICB9XG59XG4iXX0=
