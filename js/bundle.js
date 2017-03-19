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
  // Load default help file
  ui.displayHelpFile('info_map');

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
        document.getElementById('text_tag').innerHTML = text;
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
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/strings.json":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvc3RyaW5ncy5qc29uIiwiZXMyMDE1L21haW4uanMiLCJlczIwMTUvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7Ozs7OztBQUVBO0FBQ0EsSUFBTSxLQUFLLGtCQUFYO0FBQ0EsT0FBTyxLQUFQLEdBQWUsRUFBZjs7QUFFQSxFQUFFLFlBQU07QUFDTixLQUFHLElBQUg7O0FBRUE7QUFDQSxJQUFFLG9CQUFGLEVBQXdCLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFVBQUMsRUFBRCxFQUFRO0FBQzFDLFFBQU0sVUFBVSxFQUFFLEdBQUcsTUFBTCxDQUFoQjtBQUNBLE9BQUcsV0FBSCxDQUFlLFFBQVEsSUFBUixDQUFhLGtCQUFiLENBQWY7QUFDQSxNQUFFLHFCQUFGLEVBQXlCLFdBQXpCLENBQXFDLFFBQXJDO0FBQ0EsWUFBUSxRQUFSLENBQWlCLFFBQWpCO0FBQ0EsT0FBRyxjQUFIO0FBQ0EsT0FBRyxlQUFIO0FBQ0QsR0FQRDs7QUFTQTtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxFQUFELEVBQVE7QUFDdEMsT0FBRyxlQUFILENBQW1CLEVBQUUsR0FBRyxNQUFMLEVBQWEsSUFBYixDQUFrQixjQUFsQixDQUFuQjtBQUNBLE9BQUcsY0FBSDtBQUNBLE9BQUcsZUFBSDtBQUNELEdBSkQ7QUFLQTtBQUNBLEtBQUcsZUFBSCxDQUFtQixVQUFuQjs7QUFFQTtBQUNBLElBQUUsTUFBRixFQUFVLEVBQVYsQ0FBYSxVQUFiLEVBQXlCLFVBQUMsRUFBRCxFQUFRO0FBQy9CO0FBQ0EsUUFBSSxHQUFHLEtBQUgsS0FBYSxJQUFJLFVBQUosRUFBakIsRUFBbUM7QUFDakMsU0FBRyxtQkFBSCxDQUF1QixDQUFD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RUFBZjtBQUNBLFFBQUUsaUJBQUYsRUFBcUIsR0FBckIsQ0FBeUIsRUFBRSxZQUFZLEtBQUssZ0JBQUwsS0FBMEIsU0FBMUIsR0FBc0MsUUFBcEQsRUFBekI7QUFDRDs7O3dCQUVHLFUsRUFBWTtBQUNkLFVBQUksa0JBQVUsVUFBVixNQUEwQixTQUExQixJQUNBLGtCQUFVLFVBQVYsRUFBc0IsS0FBSyxXQUFMLEVBQXRCLE1BQThDLFNBRGxELEVBQzZEO0FBQzNELGVBQU8sa0JBQVUsVUFBVixFQUFzQixLQUFLLFdBQUwsRUFBdEIsQ0FBUDtBQUNEO0FBQ0QsY0FBUSxLQUFSLHNDQUFnRCxVQUFoRDtBQUNBLGFBQU8sRUFBUDtBQUNEOzs7Ozs7a0JBckZrQixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJBUFBfVElUTEVcIjoge1xuICAgIFwiZW5cIjogXCJNYXBzIG9mIHRoZSBFYXJ0aFwiLFxuICAgIFwicHRcIjogXCJNYXBhcyBkYSBUZXJyYVwiXG4gIH0sXG4gIFwiXCI6IHtcbiAgICBcImVuXCI6IFwiXCIsXG4gICAgXCJwdFwiOiBcIlwiXG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tICcuL3VpJztcblxuLy8gSW5pdCBVSVxuY29uc3QgdWkgPSBuZXcgVUkoKTtcbndpbmRvdy5Tb0VVSSA9IHVpO1xuXG4kKCgpID0+IHtcbiAgdWkuaW5pdCgpO1xuXG4gIC8vIEhvb2sgbGFuZ3VhZ2UgY2hhbmdlIGxpbmtzXG4gICQoJ1tkYXRhLXVpLWxhbmctc2V0XScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2LnRhcmdldCk7XG4gICAgdWkuc2V0TGFuZ3VhZ2UoJHRhcmdldC5hdHRyKCdkYXRhLXVpLWxhbmctc2V0JykpO1xuICAgICQoJ2FbZGF0YS11aS1sYW5nLXNldF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBoZWxwIGZpbGVzXG4gICQoJ1tkYXRhLXVpLWhlbHBdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgdWkuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWhlbHAnKSk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG4gIC8vIExvYWQgZGVmYXVsdCBoZWxwIGZpbGVcbiAgdWkuZGlzcGxheUhlbHBGaWxlKCdpbmZvX21hcCcpO1xuXG4gIC8vIFNldCBrZXlib2FyZCBjb21tYW5kc1xuICAkKHdpbmRvdykub24oJ2tleXByZXNzJywgKGV2KSA9PiB7XG4gICAgLy8gMSAtIFRvZ2dsZSBjb3VudHJpZXMgdmlzaWJsZVxuICAgIGlmIChldi53aGljaCA9PT0gJzEnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0Q291bnRyaWVzVmlzaWJsZSghdWkuZ2V0Q291bnRyaWVzVmlzaWJsZSgpKTtcbiAgICAvLyAyIC0gVG9nZ2xlIGdyYXRpY3VsZSB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzInLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0R3JhdGljdWxlVmlzaWJsZSghdWkuZ2V0R3JhdGljdWxlVmlzaWJsZSgpKTtcbiAgICAvLyAzIC0gVG9nZ2xlIHJhc3RlciB2aXNpYmxlXG4gICAgfSBlbHNlIGlmIChldi53aGljaCA9PT0gJzMnLmNoYXJDb2RlQXQoKSkge1xuICAgICAgdWkuc2V0UmFzdGVyVmlzaWJsZSghdWkuZ2V0UmFzdGVyVmlzaWJsZSgpKTtcbiAgICB9XG4gIH0pO1xufSk7XG4iLCJpbXBvcnQgVUlTdHJpbmdzIGZyb20gJy4uL2NvbmZpZy9zdHJpbmdzLmpzb24nO1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSAnZW4nO1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSBmYWxzZTtcblxuICAgIHRoaXMuaGVscEZpbGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMuc2V0TGFuZ3VhZ2UoJ2VuJyk7XG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5nQ29kZSkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5nQ29kZTtcblxuICAgIC8vIFNldHMgYSBsYW5ndWFnZSBjbGFzcyBpbiB0aGUgYm9keVxuICAgICQoJ2JvZHknKS5yZW1vdmVDbGFzcygoaW5kZXgsIGNsYXNzTmFtZSkgPT4ge1xuICAgICAgcmV0dXJuIChjbGFzc05hbWUubWF0Y2goLyhefFxccylsYW5nLVxcUysvZykgfHwgW10pLmpvaW4oJyAnKTtcbiAgICB9KTtcbiAgICAkKCdib2R5JykuYWRkQ2xhc3MoYGxhbmctJHtsYW5nQ29kZX1gKTtcblxuICAgIC8vIFJlbG9hZCB0aGUgY3VycmVudCBoZWxwIGZpbGUgd2l0aCB0aGUgbmV3IGxhbmd1YWdlXG4gICAgaWYgKHRoaXMuaGVscEZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoKTtcbiAgICB9XG5cbiAgICAvLyBJbmplY3QgdHJhbnNsYXRhYmxlIHN0cmluZ3NcbiAgICB0aGlzLmluamVjdFN0cmluZ3MoKTtcbiAgfVxuXG4gIGluamVjdFN0cmluZ3MoKSB7XG4gICAgJCgnW2RhdGEtdWktc3RyXScpLmVhY2goKGksIGVsZW1lbnQpID0+IHtcbiAgICAgICQoZWxlbWVudCkuaHRtbCh0aGlzLnN0cigkKGVsZW1lbnQpLmF0dHIoJ2RhdGEtdWktc3RyJykpKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldExhbmd1YWdlKCkge1xuICAgIHJldHVybiB0aGlzLmxhbmd1YWdlO1xuICB9XG5cbiAgZGlzcGxheUhlbHBGaWxlKGhlbHBGaWxlSUQgPSB0aGlzLmhlbHBGaWxlKSB7XG4gICAgZDMudGV4dChgLi90eHQvJHt0aGlzLmdldExhbmd1YWdlKCl9LyR7aGVscEZpbGVJRH0uaHRtbGAsIChlcnJvciwgdGV4dCkgPT4ge1xuICAgICAgaWYgKGVycm9yKSB0aHJvdyBlcnJvcjtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZXh0X3RhZycpLmlubmVySFRNTCA9IHRleHQ7XG4gICAgICB0aGlzLmhlbHBGaWxlID0gaGVscEZpbGVJRDtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvdW50cmllc1Zpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlO1xuICB9XG5cbiAgZ2V0R3JhdGljdWxlVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0dyYXRpY3VsZVZpc2libGU7XG4gIH1cblxuICBnZXRSYXN0ZXJWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzUmFzdGVyVmlzaWJsZTtcbiAgfVxuXG4gIHNldENvdW50cmllc1Zpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuYm91bmRhcnknKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldENvdW50cmllc1Zpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc2V0R3JhdGljdWxlVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ncmF0aWN1bGUnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldEdyYXRpY3VsZVZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc2V0UmFzdGVyVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5sYW5kJykuY3NzKHsgdmlzaWJpbGl0eTogIWlzVmlzaWJsZSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICAgICQoJyNtYXBfdGFnIGNhbnZhcycpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0UmFzdGVyVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzdHIoaWRlbnRpZmllcikge1xuICAgIGlmIChVSVN0cmluZ3NbaWRlbnRpZmllcl0gIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV07XG4gICAgfVxuICAgIGNvbnNvbGUudHJhY2UoYFJlcXVlc3RlZCB1bmRlZmluZWQgVUkgU3RyaW5nICcke2lkZW50aWZpZXJ9J2ApO1xuICAgIHJldHVybiAnJztcbiAgfVxufVxuIl19
