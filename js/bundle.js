(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "APP_TITLE": {
    "en": "Maps of the Earth",
    "pt": "Mapas da Terra"
  },
  "": {
    "en": "",
    "pt": ""
  }
}

},{}],2:[function(require,module,exports){
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
    ui.displayHelpFile($(ev.target).attr('data-ui-help'));
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

},{"./ui":3}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _strings = require('../config/strings.json');

var _strings2 = _interopRequireDefault(_strings);

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
  }

  _createClass(UI, [{
    key: 'init',
    value: function init() {
      this.setLanguage('en');
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

      d3.text('./txt/' + this.getLanguage() + '/' + helpFileID + '.html', function (error, text) {
        if (error) throw error;
        _this2.displayInfoRight(text);
        _this2.helpFile = helpFileID;
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
    key: 'displayInfoLeft',
    value: function displayInfoLeft(content) {
      $('.map_tag').removeClass('docked-left');
      $('.map_tag').addClass('docked-right');

      $('.info_pane-left .content').html(content);
      $('.info_pane-right').removeClass('visible');
      $('.info_pane-left').addClass('visible');
    }
  }, {
    key: 'displayInfoRight',
    value: function displayInfoRight(content) {
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').addClass('docked-left');

      $('.info_pane-right .content').html(content);
      $('.info_pane-left').removeClass('visible');
      $('.info_pane-right').addClass('visible');
    }
  }, {
    key: 'hideInfo',
    value: function hideInfo() {
      $('.map_tag').removeClass('docked-right');
      $('.map_tag').removeClass('docked-left');

      $('.info_pane-left').removeClass('visible');
      $('.info_pane-right').removeClass('visible');
    }
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/strings.json":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvc3RyaW5ncy5qc29uIiwiZXMyMDE1L21haW4uanMiLCJlczIwMTUvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7Ozs7OztBQUVBO0FBQ0EsSUFBTSxLQUFLLGtCQUFYO0FBQ0EsT0FBTyxLQUFQLEdBQWUsRUFBZjs7QUFFQSxFQUFFLFlBQU07QUFDTixLQUFHLElBQUg7O0FBRUE7QUFDQSxJQUFFLG9CQUFGLEVBQXdCLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFVBQUMsRUFBRCxFQUFRO0FBQzFDLFFBQU0sVUFBVSxFQUFFLEdBQUcsTUFBTCxDQUFoQjtBQUNBLE9BQUcsV0FBSCxDQUFlLFFBQVEsSUFBUixDQUFhLGtCQUFiLENBQWY7QUFDQSxNQUFFLHFCQUFGLEVBQXlCLFdBQXpCLENBQXFDLFFBQXJDO0FBQ0EsWUFBUSxRQUFSLENBQWlCLFFBQWpCO0FBQ0EsT0FBRyxjQUFIO0FBQ0EsT0FBRyxlQUFIO0FBQ0QsR0FQRDs7QUFTQTtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxFQUFELEVBQVE7QUFDdEMsT0FBRyxlQUFILENBQW1CLEVBQUUsR0FBRyxNQUFMLEVBQWEsSUFBYixDQUFrQixjQUFsQixDQUFuQjtBQUNBLE9BQUcsY0FBSDtBQUNBLE9BQUcsZUFBSDtBQUNELEdBSkQ7O0FBTUE7QUFDQSxJQUFFLGtCQUFGLEVBQXNCLEtBQXRCLENBQTRCLFVBQUMsRUFBRCxFQUFRO0FBQ2xDLE9BQUcsUUFBSDtBQUNBLE9BQUcsY0FBSDtBQUNBLE9BQUcsZUFBSDtBQUNELEdBSkQ7O0FBTUE7QUFDQSxJQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsVUFBYixFQUF5QixVQUFDLEVBQUQsRUFBUTtB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Q0FBaUMsU0FBakM7QUFDQSxRQUFFLGtCQUFGLEVBQXNCLFdBQXRCLENBQWtDLFNBQWxDO0FBQ0Q7Ozs7OztrQkEvR2tCLEUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwibW9kdWxlLmV4cG9ydHM9e1xuICBcIkFQUF9USVRMRVwiOiB7XG4gICAgXCJlblwiOiBcIk1hcHMgb2YgdGhlIEVhcnRoXCIsXG4gICAgXCJwdFwiOiBcIk1hcGFzIGRhIFRlcnJhXCJcbiAgfSxcbiAgXCJcIjoge1xuICAgIFwiZW5cIjogXCJcIixcbiAgICBcInB0XCI6IFwiXCJcbiAgfVxufVxuIiwiaW1wb3J0IFVJIGZyb20gJy4vdWknO1xuXG4vLyBJbml0IFVJXG5jb25zdCB1aSA9IG5ldyBVSSgpO1xud2luZG93LlNvRVVJID0gdWk7XG5cbiQoKCkgPT4ge1xuICB1aS5pbml0KCk7XG5cbiAgLy8gSG9vayBsYW5ndWFnZSBjaGFuZ2UgbGlua3NcbiAgJCgnW2RhdGEtdWktbGFuZy1zZXRdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgY29uc3QgJHRhcmdldCA9ICQoZXYudGFyZ2V0KTtcbiAgICB1aS5zZXRMYW5ndWFnZSgkdGFyZ2V0LmF0dHIoJ2RhdGEtdWktbGFuZy1zZXQnKSk7XG4gICAgJCgnYVtkYXRhLXVpLWxhbmctc2V0XScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkdGFyZ2V0LmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGhlbHAgZmlsZXNcbiAgJCgnW2RhdGEtdWktaGVscF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICB1aS5kaXNwbGF5SGVscEZpbGUoJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktaGVscCcpKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBIb29rIGluZm8gcGFuZSBjbG9zZSBidXR0b25zXG4gICQoJy5pbmZvX3BhbmUtY2xvc2UnKS5jbGljaygoZXYpID0+IHtcbiAgICB1aS5oaWRlSW5mbygpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIFNldCBrZXlib2FyZCBjb21tYW5kc1xuICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgKGV2KSA9PiB7XG4gICAgLy8gMSAtIFRvZ2dsZSBjb3VudHJpZXMgdmlzaWJsZVxuICAgIGlmIChldi53aGljaCA9PT0gJzEnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0Q291bnRyaWVzVmlzaWJsZSghdWkuZ2V0Q291bnRyaWVzVmlzaWJsZSgpKTtcbiAgICAvLyAyIC0gVG9nZ2xlIGdyYXRpY3VsZSB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzInLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0R3JhdGljdWxlVmlzaWJsZSghdWkuZ2V0R3JhdGljdWxlVmlzaWJsZSgpKTtcbiAgICAvLyAzIC0gVG9nZ2xlIHJhc3RlciB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzMnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0UmFzdGVyVmlzaWJsZSghdWkuZ2V0UmFzdGVyVmlzaWJsZSgpKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgVUlTdHJpbmdzIGZyb20gJy4uL2NvbmZpZy9zdHJpbmdzLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSAnZW4nO1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuaGVscEZpbGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UoJ2VuJyk7XG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5nQ29kZSkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5nQ29kZTtcblxuICAgIC8vIFNldHMgYSBsYW5ndWFnZSBjbGFzcyBpbiB0aGUgYm9keVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccylsYW5nLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICB9KTtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoYGxhbmctJHtsYW5nQ29kZX1gKTtcblxuICAgIC8vIFJlbG9hZCB0aGUgY3VycmVudCBoZWxwIGZpbGUgd2l0aCB0aGUgbmV3IGxhbmd1YWdlXG4gICAgaWYgKHRoaXMuaGVscEZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoKTtcbiAgICB9XG5cbiAgICAvLyBJbmplY3QgdHJhbnNsYXRhYmxlIHN0cmluZ3NcbiAgICB0aGlzLmluamVjdFN0cmluZ3MoKTtcbiAgfVxuXG4gIGluamVjdFN0cmluZ3MoKSB7XG4gICAgJCgnW2RhdGEtdWktc3RyXScpLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICQoZWxlbWVudCkuaHRtbCh0aGlzLnN0cigkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtdWktc3RyJykpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldExhbmd1YWdlKCkge1xuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlO1xuICB9XG5cbiAgZGlzcGxheUhlbHBGaWxlKGhlbHBGaWxlSUQgPSB0aGlzLmhlbHBGaWxlKSB7XG4gICAgZDMudGV4dChgLi90eHQvJHt0aGlzLmdldExhbmd1YWdlKCl9LyR7aGVscEZpbGVJRH0uaHRtbGAsIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIHRoaXMuZGlzcGxheUluZm9SaWdodCh0ZXh0KTtcbiAgICAgIHRoaXMuaGVscEZpbGUgPSBoZWxwRmlsZUlEO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvdW50cmllc1Zpc2libGU7XG4gIH1cblxuICBnZXRHcmF0aWN1bGVWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZTtcbiAgfVxuXG4gIGdldFJhc3RlclZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYXN0ZXJWaXNpYmxlO1xuICB9XG5cbiAgc2V0Q291bnRyaWVzVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ib3VuZGFyeScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0Q291bnRyaWVzVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRHcmF0aWN1bGVWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmdyYXRpY3VsZScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0R3JhdGljdWxlVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRSYXN0ZXJWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmxhbmQnKS5jc3MoeyB2aXNpYmlsaXR5OiAhaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgJCgnI21hcF90YWcgY2FudmFzJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRSYXN0ZXJWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHN0cihpZGVudGlmaWVyKSB7XG4gICAgaWYgKFVJU3RyaW5nc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgY29uc29sZS50cmFjZShgUmVxdWVzdGVkIHVuZGVmaW5lZCBVSSBTdHJpbmcgJyR7aWRlbnRpZmllcn0nYCk7XG4gICAgcmV0dXJuICcnO1xuICB9XG5cbiAgZGlzcGxheUluZm9MZWZ0KGNvbnRlbnQpIHtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuICAgICQoJy5tYXBfdGFnJykuYWRkQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuXG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0IC5jb250ZW50JykuaHRtbChjb250ZW50KTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5hZGRDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgZGlzcGxheUluZm9SaWdodChjb250ZW50KSB7XG4gICAgJCgnLm1hcF90YWcnKS5yZW1vdmVDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcygnZG9ja2VkLWxlZnQnKTtcblxuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQgLmNvbnRlbnQnKS5odG1sKGNvbnRlbnQpO1xuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLnJlbW92ZUNsYXNzKCd2aXNpYmxlJyk7XG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCcpLmFkZENsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBoaWRlSW5mbygpIHtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtbGVmdCcpO1xuXG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxufVxuIl19
