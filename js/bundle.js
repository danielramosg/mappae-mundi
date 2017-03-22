(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "tools": {
    "rotate": {
      "name": {
        "en": "the aspect of the map",
        "pt": "aspecto do mapa"
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
        "pt": "a projeção Cilíndrica equidistante"
      }
    },
    "mercator": {
      "file": "mercator",
      "name": {
        "en": "the Mercator projection",
        "pt": "a projeção de Mercator"
      }
    },
    "gallpeters": {
      "file": "gallpeters",
      "name": {
        "en": "the Gall-Peters projection",
        "pt": "a projeção Cilíndrica equivalente"
      }
    },
    "mollweide": {
      "file": "mollweide",
      "name": {
        "en": "the Mollweide projection",
        "pt": "a projeção de Mollweide"
      }
    },
    "aziequi": {
      "file": "aziequi",
      "name": {
        "en": "the Azimuthal equidistant projection",
        "pt": "a projeção Azimutal equidistante"
      }
    },
    "gnomo": {
      "file": "gnomo",
      "name": {
        "en": "the Gnomonic projection",
        "pt": "a projeção Gnomónica"
      }
    },
    "stereo": {
      "file": "stereo",
      "name": {
        "en": "the Stereographic projection",
        "pt": "a projeção Estereográfica"
      }
    },
    "ortho": {
      "file": "ortho",
      "name": {
        "en": "the Orthographic projection",
        "pt": "a projeção Ortográfica"
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
  "INTRO": {
    "en": "Intro",
    "pt": "Intro"
  },
  "CREDITS": {
    "en": "Credits",
    "pt": "Créditos"
  },
  "MORE_ABOUT": {
    "en": "About",
    "pt": "Sobre"
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvaGVscC5qc29uIiwiY29uZmlnL3N0cmluZ3MuanNvbiIsImVzMjAxNS9tYWluLmpzIiwiZXMyMDE1L3VpLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3RE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aUNBRVk7QUFDWDtBQUNBO0FBQ0E7QUFDRDs7OytCQUVVO0FBQ1Q7QUFDRDs7OzhCQUVTLFEsRUFBVTtBQUNsQixVQUFJLGFBQWEsT0FBakIsRUFBMEI7QUFDeEIsbUJBQVcsTUFBWCxDQUFrQixDQUFDLENBQUQsRUFBSSxDQUFDLEVBQUwsQ0FBbEI7QUFDRCxPQUZELE1BRU8sSUFBSSxhQUFhLE9BQWpCLEVBQTBCO0FBQy9CLG1CQUFXLE1BQVgsQ0FBa0IsQ0FBQyxDQUFELEVBQUksRUFBSixDQUFsQjtBQUNELE9BRk0sTUFFQSxJQUFJLGFBQWEsU0FBakIsRUFBNEI7QUFDakMsbUJBQVcsTUFBWCxDQUFrQixDQUFDLENBQUQsRUFBSSxDQUFKLENBQWxCO0FBQ0QsT0FGTSxNQUVBLElBQUksYUFBYSxVQUFqQixFQUE2QjtBQUNsQyxtQkFBVyxNQUFYLENBQWtCLHVCQUFsQjtBQUNEO0FBQ0Q7QUFDRDs7Ozs7O2tCQXZSa0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwidG9vbHNcIjoge1xuICAgIFwicm90YXRlXCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgYXNwZWN0IG9mIHRoZSBtYXBcIixcbiAgICAgICAgXCJwdFwiOiBcImFzcGVjdG8gZG8gbWFwYVwiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19yb3RhdGVcIlxuICAgIH0sXG4gICAgXCJpbmRpY2F0cml4XCI6IHtcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgVGlzc290IGluZGljYXRyaXhcIixcbiAgICAgICAgXCJwdFwiOiBcImEgaW5kaWNhdHJpeiBkZSBUaXNzb3RcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fdGlzc290XCJcbiAgICB9LFxuICAgIFwiZ2VvZGVzaWNcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcImdlb2Rlc2ljc1wiLFxuICAgICAgICBcInB0XCI6IFwiZ2VvZMOpc2ljYXNcIlxuICAgICAgfSxcbiAgICAgIFwiZmlsZVwiOiBcImluZm9fZ2VvZGVzaWNcIlxuICAgIH0sXG4gICAgXCJsb3hvZHJvbWVcIjoge1xuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcImxveG9kcm9tZXNcIixcbiAgICAgICAgXCJwdFwiOiBcImxveG9kcsOzbWlhc1wiXG4gICAgICB9LFxuICAgICAgXCJmaWxlXCI6IFwiaW5mb19sb3hvZHJvbWVcIlxuICAgIH1cbiAgfSxcbiAgXCJwcm9qZWN0aW9uc1wiOiB7XG4gICAgXCJwbGF0ZWNhcnJlXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcInBsYXRlY2FycmVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgUGxhdGUgQ2FycsOpZSBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJhIHByb2plw6fDo28gQ2lsw61uZHJpY2EgZXF1aWRpc3RhbnRlXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwibWVyY2F0b3JcIjoge1xuICAgICAgXCJmaWxlXCI6IFwibWVyY2F0b3JcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTWVyY2F0b3IgcHJvamVjdGlvblwiLFxuICAgICAgICBcInB0XCI6IFwiYSBwcm9qZcOnw6NvIGRlIE1lcmNhdG9yXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwiZ2FsbHBldGVyc1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJnYWxscGV0ZXJzXCIsXG4gICAgICBcIm5hbWVcIjoge1xuICAgICAgICBcImVuXCI6IFwidGhlIEdhbGwtUGV0ZXJzIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcImEgcHJvamXDp8OjbyBDaWzDrW5kcmljYSBlcXVpdmFsZW50ZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm1vbGx3ZWlkZVwiOiB7XG4gICAgICBcImZpbGVcIjogXCJtb2xsd2VpZGVcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgTW9sbHdlaWRlIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcImEgcHJvamXDp8OjbyBkZSBNb2xsd2VpZGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJhemllcXVpXCI6IHtcbiAgICAgIFwiZmlsZVwiOiBcImF6aWVxdWlcIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgQXppbXV0aGFsIGVxdWlkaXN0YW50IHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcImEgcHJvamXDp8OjbyBBemltdXRhbCBlcXVpZGlzdGFudGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgXCJnbm9tb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJnbm9tb1wiLFxuICAgICAgXCJuYW1lXCI6IHtcbiAgICAgICAgXCJlblwiOiBcInRoZSBHbm9tb25pYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJhIHByb2plw6fDo28gR25vbcOzbmljYVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBcInN0ZXJlb1wiOiB7XG4gICAgICBcImZpbGVcIjogXCJzdGVyZW9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgU3RlcmVvZ3JhcGhpYyBwcm9qZWN0aW9uXCIsXG4gICAgICAgIFwicHRcIjogXCJhIHByb2plw6fDo28gRXN0ZXJlb2dyw6FmaWNhXCJcbiAgICAgIH1cbiAgICB9LFxuICAgIFwib3J0aG9cIjoge1xuICAgICAgXCJmaWxlXCI6IFwib3J0aG9cIixcbiAgICAgIFwibmFtZVwiOiB7XG4gICAgICAgIFwiZW5cIjogXCJ0aGUgT3J0aG9ncmFwaGljIHByb2plY3Rpb25cIixcbiAgICAgICAgXCJwdFwiOiBcImEgcHJvamXDp8OjbyBPcnRvZ3LDoWZpY2FcIlxuICAgICAgfVxuICAgIH1cbiAgfVxufSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJBUFBfVElUTEVcIjoge1xuICAgIFwiZW5cIjogXCJNYXBwYWUgTXVuZGlcIixcbiAgICBcInB0XCI6IFwiTWFwcGFlIE11bmRpXCJcbiAgfSxcbiAgXCJJTlRST1wiOiB7XG4gICAgXCJlblwiOiBcIkludHJvXCIsXG4gICAgXCJwdFwiOiBcIkludHJvXCJcbiAgfSxcbiAgXCJDUkVESVRTXCI6IHtcbiAgICBcImVuXCI6IFwiQ3JlZGl0c1wiLFxuICAgIFwicHRcIjogXCJDcsOpZGl0b3NcIlxuICB9LFxuICBcIk1PUkVfQUJPVVRcIjoge1xuICAgIFwiZW5cIjogXCJBYm91dFwiLFxuICAgIFwicHRcIjogXCJTb2JyZVwiXG4gIH0sXG4gIFwiUFJfQUJCUl9QTEFURUNBUlJFXCI6IHtcbiAgICBcImVuXCI6IFwiUGxcIixcbiAgICBcInB0XCI6IFwiQ0VkXCJcbiAgfSxcbiAgXCJQUl9BQkJSX01FUkNBVE9SXCI6IHtcbiAgICBcImVuXCI6IFwiTWVcIixcbiAgICBcInB0XCI6IFwiTWVyXCJcbiAgfSxcbiAgXCJQUl9BQkJSX0dBTExQRVRFUlNcIjoge1xuICAgIFwiZW5cIjogXCJHYVwiLFxuICAgIFwicHRcIjogXCJDRXZcIlxuICB9LFxuICBcIlBSX0FCQlJfTU9MTFdFSURFXCI6IHtcbiAgICBcImVuXCI6IFwiTXdcIixcbiAgICBcInB0XCI6IFwiTWx3XCJcbiAgfSxcbiAgXCJQUl9BQkJSX0FaSUVRVUlcIjoge1xuICAgIFwiZW5cIjogXCJBelwiLFxuICAgIFwicHRcIjogXCJBekVcIlxuICB9LFxuICBcIlBSX0FCQlJfR05PTU9cIjoge1xuICAgIFwiZW5cIjogXCJHblwiLFxuICAgIFwicHRcIjogXCJHbm9cIlxuICB9LFxuICBcIlBSX0FCQlJfU1RFUkVPXCI6IHtcbiAgICBcImVuXCI6IFwiU3RcIixcbiAgICBcInB0XCI6IFwiRXN0XCJcbiAgfSxcbiAgXCJQUl9BQkJSX09SVEhPXCI6IHtcbiAgICBcImVuXCI6IFwiT3JcIixcbiAgICBcInB0XCI6IFwiT3J0XCJcbiAgfSxcbiAgXCJcIjoge1xuICAgIFwiZW5cIjogXCJcIixcbiAgICBcInB0XCI6IFwiXCJcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gJy4vdWknO1xuXG4vLyBJbml0IFVJXG5jb25zdCB1aSA9IG5ldyBVSSgpO1xud2luZG93LlNvRVVJID0gdWk7XG5cbiQoKCkgPT4ge1xuICB1aS5pbml0KCk7XG5cbiAgLy8gSG9vayBsYW5ndWFnZSBjaGFuZ2UgbGlua3NcbiAgJCgnW2RhdGEtdWktbGFuZy1zZXRdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgY29uc3QgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICB1aS5zZXRMYW5ndWFnZSgkdGFyZ2V0LmF0dHIoJ2RhdGEtdWktbGFuZy1zZXQnKSk7XG4gICAgJCgnYVtkYXRhLXVpLWxhbmctc2V0XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkdGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGhlbHAgZmlsZXNcbiAgJCgnW2RhdGEtdWktaGVscF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICB1aS5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktaGVscCcpLCAncmlnaHQnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGluZm8gcGFuZSBjbG9zZSBidXR0b25zXG4gICQoJy5pbmZvX3BhbmUtY2xvc2UnKS5jbGljaygoZXYpID0+IHtcbiAgICB1aS5oaWRlSW5mbygpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFNldCBrZXlib2FyZCBjb21tYW5kc1xuICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgKGV2KSA9PiB7XG4gICAgLy8gMSAtIFRvZ2dsZSBjb3VudHJpZXMgdmlzaWJsZVxuICAgIGlmIChldi53aGljaCA9PT0gJzEnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0Q291bnRyaWVzVmlzaWJsZSghdWkuZ2V0Q291bnRyaWVzVmlzaWJsZSgpKTtcbiAgICAvLyAyIC0gVG9nZ2xlIGdyYXRpY3VsZSB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzInLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0R3JhdGljdWxlVmlzaWJsZSghdWkuZ2V0R3JhdGljdWxlVmlzaWJsZSgpKTtcbiAgICAvLyAzIC0gVG9nZ2xlIHJhc3RlciB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzMnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0UmFzdGVyVmlzaWJsZSghdWkuZ2V0UmFzdGVyVmlzaWJsZSgpKTtcbiAgICB9IGVsc2UgaWYgKGV2LndoaWNoID09PSAnbicuY2hhckNvZGVBdCgpIHx8IGV2LndoaWNoID09PSAnTicuY2hhckNvZGVBdCgpKSB7XG4gICAgICB1aS5jZW50ZXJNYXAoJ25vcnRoJyk7XG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJ3MnLmNoYXJDb2RlQXQoKSB8fCBldi53aGljaCA9PT0gJ1MnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuY2VudGVyTWFwKCdzb3V0aCcpO1xuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICdlJy5jaGFyQ29kZUF0KCkgfHwgZXYud2hpY2ggPT09ICdFJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLmNlbnRlck1hcCgnZXF1YXRvcicpO1xuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICdsJy5jaGFyQ29kZUF0KCkgfHwgZXYud2hpY2ggPT09ICdMJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLmNlbnRlck1hcCgnbG9jYXRpb24nKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgVUlTdHJpbmdzIGZyb20gJy4uL2NvbmZpZy9zdHJpbmdzLmpzb24nO1xuaW1wb3J0IEhlbHBDZmcgZnJvbSAnLi4vY29uZmlnL2hlbHAuanNvbic7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVJIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9ICdlbic7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9IGZhbHNlO1xuXG4gICAgdGhpcy5oZWxwRmlsZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnRvb2wgPSAncm90YXRlJztcbiAgICB0aGlzLnByb2plY3Rpb24gPSAncGxhdGVjYXJyZSc7XG5cbiAgICB0aGlzLmhlbHBCYW5uZXJzID0ge307XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UoJ2VuJyk7XG4gICAgdGhpcy5zZXRUb29sKCdyb3RhdGUnKTtcbiAgICB0aGlzLnNldFByb2plY3Rpb24oJ3BsYXRlY2FycmUnKTtcbiAgICB0aGlzLmluaXRUb29sQnV0dG9ucygpO1xuICAgIHRoaXMuaW5pdFByb2plY3Rpb25CdXR0b25zKCk7XG4gICAgdGhpcy5pbml0Q29tbWFuZEJ1dHRvbnMoKTtcbiAgICB0aGlzLmluaXRIZWxwQmFubmVycygpO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ0NvZGU7XG5cbiAgICAvLyBTZXRzIGEgbGFuZ3VhZ2UgY2xhc3MgaW4gdGhlIGJvZHlcbiAgICAkKCdib2R5JykucmVtb3ZlQ2xhc3MoKGluZGV4LCBjbGFzc05hbWUpID0+IHtcbiAgICAgIHJldHVybiAoY2xhc3NOYW1lLm1hdGNoKC8oXnxcXHMpbGFuZy1cXFMrL2cpIHx8IFtdKS5qb2luKCcgJyk7XG4gICAgfSk7XG4gICAgJCgnYm9keScpLmFkZENsYXNzKGBsYW5nLSR7bGFuZ0NvZGV9YCk7XG5cbiAgICAvLyBBY3RpdmF0ZSB0aGUgc2VsZWN0ZWQgbGFuZ3VhZ2VcbiAgICAkKCcubGFuZy1zZWxlY3RvciBsaSBhW2RhdGEtdWktbGFuZy1zZXRdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoYC5sYW5nLXNlbGVjdG9yIGxpIGFbZGF0YS11aS1sYW5nLXNldD0ke2xhbmdDb2RlfV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG5cbiAgICAvLyBSZWxvYWQgdGhlIGN1cnJlbnQgaGVscCBmaWxlIHdpdGggdGhlIG5ldyBsYW5ndWFnZVxuICAgIGlmICh0aGlzLmhlbHBGaWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCk7XG4gICAgfVxuXG4gICAgLy8gUmVsb2FkIHRoZSBoZWxwIGJhbm5lcnNcbiAgICBmb3IgKGNvbnN0IGJhbm5lcklEIG9mIE9iamVjdC5rZXlzKHRoaXMuaGVscEJhbm5lcnMpKSB7XG4gICAgICBpZiAodGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0pIHtcbiAgICAgICAgdGhpcy5zaG93SGVscEJhbm5lcihcbiAgICAgICAgICBiYW5uZXJJRCxcbiAgICAgICAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXS5jYXRlZ29yeSxcbiAgICAgICAgICB0aGlzLmhlbHBCYW5uZXJzW2Jhbm5lcklEXS5pdGVtXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5qZWN0IHRyYW5zbGF0YWJsZSBzdHJpbmdzXG4gICAgdGhpcy5pbmplY3RTdHJpbmdzKCk7XG4gIH1cblxuICBpbmplY3RTdHJpbmdzKCkge1xuICAgICQoJ1tkYXRhLXVpLXN0cl0nKS5lYWNoKChpLCBlbGVtZW50KSA9PiB7XG4gICAgICAkKGVsZW1lbnQpLmh0bWwodGhpcy5zdHIoJChlbGVtZW50KS5hdHRyKCdkYXRhLXVpLXN0cicpKSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRMYW5ndWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZTtcbiAgfVxuXG4gIGRpc3BsYXlIZWxwRmlsZShoZWxwRmlsZUlEID0gdGhpcy5oZWxwRmlsZSwgcGFuZSA9IHRoaXMuaGVscFBhbmUpIHtcbiAgICBkMy50ZXh0KGAuL3R4dC8ke3RoaXMuZ2V0TGFuZ3VhZ2UoKX0vJHtoZWxwRmlsZUlEfS5odG1sYCwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgdGhpcy5kaXNwbGF5SW5mbyh0ZXh0LCBwYW5lKTtcbiAgICAgIHRoaXMuaGVscEZpbGUgPSBoZWxwRmlsZUlEO1xuICAgICAgdGhpcy5oZWxwUGFuZSA9IHBhbmU7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb3VudHJpZXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZTtcbiAgfVxuXG4gIGdldEdyYXRpY3VsZVZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlO1xuICB9XG5cbiAgZ2V0UmFzdGVyVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Jhc3RlclZpc2libGU7XG4gIH1cblxuICBzZXRDb3VudHJpZXNWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmJvdW5kYXJ5JykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRDb3VudHJpZXNWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldEdyYXRpY3VsZVZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuZ3JhdGljdWxlJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRHcmF0aWN1bGVWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldFJhc3RlclZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcubGFuZCcpLmNzcyh7IHZpc2liaWxpdHk6ICFpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgICAkKCcjbWFwX3RhZyBjYW52YXMnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldFJhc3RlclZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICAgIGlmIChpc1Zpc2libGUpIHtcbiAgICAgICQoJy5tYXBfdGFnJykuYWRkQ2xhc3MoJ3Jhc3Rlci12aXNpYmxlJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ3Jhc3Rlci12aXNpYmxlJyk7XG4gICAgfVxuICB9XG5cbiAgc3RyKGlkZW50aWZpZXIpIHtcbiAgICBpZiAoVUlTdHJpbmdzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldO1xuICAgIH1cbiAgICBjb25zb2xlLnRyYWNlKGBSZXF1ZXN0ZWQgdW5kZWZpbmVkIFVJIFN0cmluZyAnJHtpZGVudGlmaWVyfSdgKTtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBkaXNwbGF5SW5mbyhjb250ZW50LCBwYW5lKSB7XG4gICAgY29uc29sZS5sb2cocGFuZSk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcbiAgICAkKCcubWFwX3RhZycpLmFkZENsYXNzKGBkb2NrZWQtJHtwYW5lfWApO1xuXG4gICAgJChgLmluZm9fcGFuZS0ke3BhbmV9IC5jb250ZW50YCkuaHRtbChjb250ZW50KTtcbiAgICAkKCcuaW5mb19wYW5lJykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKGAuaW5mb19wYW5lLSR7cGFuZX1gKS5hZGRDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm8oKSB7XG4gICAgdGhpcy5oZWxwRmlsZSA9IG51bGw7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcblxuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mb0xlZnQoKSB7XG4gICAgdGhpcy5oZWxwRmlsZSA9IG51bGw7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLWxlZnQnKTtcbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaGlkZUluZm9SaWdodCgpIHtcbiAgICB0aGlzLmhlbHBGaWxlID0gbnVsbDtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGluaXRUb29sQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS10b29sXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRUb29sKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXRvb2wnKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBsZXQgaW5kaWNhdHJpeFRpbWVyID0gbnVsbDtcbiAgICAkKCdbZGF0YS11aS10b29sPWluZGljYXRyaXhdJykub24oJ21vdXNlZG93bicsICgpID0+IHtcbiAgICAgIGluZGljYXRyaXhUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzYW1wbGVFbGxpcHNlcygpO1xuICAgICAgfSwgMTAwMCk7XG4gICAgfSk7XG5cbiAgICAkKGRvY3VtZW50KS5vbignbW91c2V1cCcsICgpID0+IHtcbiAgICAgIGlmIChpbmRpY2F0cml4VGltZXIgIT09IG51bGwpIHtcbiAgICAgICAgd2luZG93LmNsZWFyVGltZW91dChpbmRpY2F0cml4VGltZXIpO1xuICAgICAgICBpbmRpY2F0cml4VGltZXIgPSBudWxsO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgZ2V0VG9vbCgpIHtcbiAgICByZXR1cm4gdGhpcy50b29sO1xuICB9XG5cbiAgc2V0VG9vbChhVG9vbCkge1xuICAgIHRoaXMudG9vbCA9IGFUb29sO1xuICAgICQoJ1tkYXRhLXVpLXRvb2xdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICQoYFtkYXRhLXVpLXRvb2w9JHthVG9vbH1dYCkuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIHVwZGF0ZU1hcCgpO1xuICAgIHRoaXMuaGlkZUluZm9MZWZ0KCk7XG4gICAgdGhpcy5zaG93SGVscEJhbm5lcignbGVmdCcsICd0b29scycsIGFUb29sKTtcbiAgfVxuXG4gIGluaXRQcm9qZWN0aW9uQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRQcm9qZWN0aW9uKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXByb2plY3Rpb24nKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQcm9qZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3Rpb247XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uKGFQcm9qZWN0aW9uKSB7XG4gICAgdGhpcy5wcm9qZWN0aW9uID0gYVByb2plY3Rpb247XG4gICAgJCgnW2RhdGEtdWktcHJvamVjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktcHJvamVjdGlvbj0ke2FQcm9qZWN0aW9ufV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gICAgdGhpcy5oaWRlSW5mb1JpZ2h0KCk7XG4gICAgdGhpcy5zaG93SGVscEJhbm5lcigncmlnaHQnLCAncHJvamVjdGlvbnMnLCBhUHJvamVjdGlvbik7XG4gIH1cblxuICBpbml0SGVscEJhbm5lcnMoKSB7XG4gICAgJCgnLmhlbHAtYmFubmVyLWxlZnQnKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJyksICdsZWZ0Jyk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKCcuaGVscC1iYW5uZXItcmlnaHQnKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWJhbm5lci1oZWxwJyksICdyaWdodCcpO1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0SGVscEJhbm5lclRleHQoY2F0ZWdvcnksIGl0ZW0pIHtcbiAgICByZXR1cm4gYCR7dGhpcy5zdHIoJ01PUkVfQUJPVVQnKX0gJHtIZWxwQ2ZnW2NhdGVnb3J5XVtpdGVtXS5uYW1lW3RoaXMuZ2V0TGFuZ3VhZ2UoKV19YDtcbiAgfVxuXG4gIGdldEhlbHBCYW5uZXJQYWdlKGNhdGVnb3J5LCBpdGVtKSB7XG4gICAgcmV0dXJuIEhlbHBDZmdbY2F0ZWdvcnldW2l0ZW1dLmZpbGU7XG4gIH1cblxuICBzaG93SGVscEJhbm5lcihiYW5uZXJJRCwgY2F0ZWdvcnksIGl0ZW0pIHtcblxuICAgIHRoaXMuaGVscEJhbm5lcnNbYmFubmVySURdID0geyBjYXRlZ29yeSwgaXRlbSB9O1xuXG4gICAgJChgLmhlbHAtYmFubmVyLSR7YmFubmVySUR9YClcbiAgICAgIC5odG1sKHRoaXMuZ2V0SGVscEJhbm5lclRleHQoY2F0ZWdvcnksIGl0ZW0pKVxuICAgICAgLmF0dHIoJ2RhdGEtdWktYmFubmVyLWhlbHAnLCB0aGlzLmdldEhlbHBCYW5uZXJQYWdlKGNhdGVnb3J5LCBpdGVtKSlcbiAgICAgIC5mYWRlSW4oKVxuICAgICAgLmNzcygnZGlzcGxheScsICdpbmxpbmUtYmxvY2snKTtcbiAgfVxuXG4gIGhpZGVIZWxwQmFubmVyKGJhbm5lcklEKSB7XG4gICAgdGhpcy5oZWxwQmFubmVyc1tiYW5uZXJJRF0gPSBudWxsO1xuICAgICQoYC5oZWxwLWJhbm5lci0ke2Jhbm5lcklEfWApLmZhZGVPdXQoKTtcbiAgfVxuXG4gIGluaXRDb21tYW5kQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS1jb21tYW5kPWNsZWFyXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5jbGVhck1hcmtzKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG5cbiAgICAkKCdbZGF0YS11aS1jb21tYW5kPXVuZG9dJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnVuZG9NYXJrKCk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBjbGVhck1hcmtzKCkge1xuICAgIGNsZWFyR2VvZGVzaWMoKTtcbiAgICBjbGVhckxveG9kcm9tZSgpO1xuICAgIGNsZWFyRWxsaXBzZXMoKTtcbiAgfVxuXG4gIHVuZG9NYXJrKCkge1xuICAgIHVuZG9Db21tYW5kKCk7XG4gIH1cblxuICBjZW50ZXJNYXAocG9zaXRpb24pIHtcbiAgICBpZiAocG9zaXRpb24gPT09ICdub3J0aCcpIHtcbiAgICAgIHByb2plY3Rpb24ucm90YXRlKFswLCAtOTBdKTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAnc291dGgnKSB7XG4gICAgICBwcm9qZWN0aW9uLnJvdGF0ZShbMCwgOTBdKTtcbiAgICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSAnZXF1YXRvcicpIHtcbiAgICAgIHByb2plY3Rpb24ucm90YXRlKFswLCAwXSk7XG4gICAgfSBlbHNlIGlmIChwb3NpdGlvbiA9PT0gJ2xvY2F0aW9uJykge1xuICAgICAgcHJvamVjdGlvbi5yb3RhdGUocm90YXRlVG9DdXJyZW50TG9jYXRpb24pO1xuICAgIH1cbiAgICB1cGRhdGVNYXAoKTtcbiAgfVxufVxuIl19
