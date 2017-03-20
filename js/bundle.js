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
    }
  }]);

  return UI;
}();

exports.default = UI;

},{"../config/strings.json":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvc3RyaW5ncy5qc29uIiwiZXMyMDE1L21haW4uanMiLCJlczIwMTUvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FDVkE7Ozs7OztBQUVBO0FBQ0EsSUFBTSxLQUFLLGtCQUFYO0FBQ0EsT0FBTyxLQUFQLEdBQWUsRUFBZjs7QUFFQSxFQUFFLFlBQU07QUFDTixLQUFHLElBQUg7O0FBRUE7QUFDQSxJQUFFLG9CQUFGLEVBQXdCLEVBQXhCLENBQTJCLE9BQTNCLEVBQW9DLFVBQUMsRUFBRCxFQUFRO0FBQzFDLFFBQU0sVUFBVSxFQUFFLEdBQUcsTUFBTCxDQUFoQjtBQUNBLE9BQUcsV0FBSCxDQUFlLFFBQVEsSUFBUixDQUFhLGtCQUFiLENBQWY7QUFDQSxNQUFFLHFCQUFGLEVBQXlCLFdBQXpCLENBQXFDLFFBQXJDO0FBQ0EsWUFBUSxRQUFSLENBQWlCLFFBQWpCO0FBQ0EsT0FBRyxjQUFIO0FBQ0EsT0FBRyxlQUFIO0FBQ0QsR0FQRDs7QUFTQTtBQUNBLElBQUUsZ0JBQUYsRUFBb0IsRUFBcEIsQ0FBdUIsT0FBdkIsRUFBZ0MsVUFBQyxFQUFELEVBQVE7QUFDdEMsT0FBRyxlQUFILENBQW1CLEVBQUUsR0FBRyxNQUFMLEVBQWEsSUFBYixDQUFrQixjQUFsQixDQUFuQjtBQUNBLE9BQUcsY0FBSDtBQUNBLE9BQUcsZUFBSDtBQUNELEdBSkQ7O0FBTUE7QUFDQSxJQUFFLGtCQUFGLEVBQXNCLEtBQXRCLENBQTRCLFVBQUMsRUFBRCxFQUFRO0FBQ2xDLE9BQUcsUUFBSDtBQUNBLE9BQUcsY0FBSDtBQUNBLE9BQUcsZUFBSDtBQUNELEdBSkQ7O0FBTUE7QUFDQSxJQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsVUFBYixFQUF5QixVQUFDLEVBQUQsRUFBUTtB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Ozs7a0JBM0prQixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJBUFBfVElUTEVcIjoge1xuICAgIFwiZW5cIjogXCJNYXBzIG9mIHRoZSBFYXJ0aFwiLFxuICAgIFwicHRcIjogXCJNYXBhcyBkYSBUZXJyYVwiXG4gIH0sXG4gIFwiXCI6IHtcbiAgICBcImVuXCI6IFwiXCIsXG4gICAgXCJwdFwiOiBcIlwiXG4gIH1cbn1cbiIsImltcG9ydCBVSSBmcm9tICcuL3VpJztcblxuLy8gSW5pdCBVSVxuY29uc3QgdWkgPSBuZXcgVUkoKTtcbndpbmRvdy5Tb0VVSSA9IHVpO1xuXG4kKCgpID0+IHtcbiAgdWkuaW5pdCgpO1xuXG4gIC8vIEhvb2sgbGFuZ3VhZ2UgY2hhbmdlIGxpbmtzXG4gICQoJ1tkYXRhLXVpLWxhbmctc2V0XScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2LnRhcmdldCk7XG4gICAgdWkuc2V0TGFuZ3VhZ2UoJHRhcmdldC5hdHRyKCdkYXRhLXVpLWxhbmctc2V0JykpO1xuICAgICQoJ2FbZGF0YS11aS1sYW5nLXNldF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBoZWxwIGZpbGVzXG4gICQoJ1tkYXRhLXVpLWhlbHBdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgdWkuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWhlbHAnKSk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBpbmZvIHBhbmUgY2xvc2UgYnV0dG9uc1xuICAkKCcuaW5mb19wYW5lLWNsb3NlJykuY2xpY2soKGV2KSA9PiB7XG4gICAgdWkuaGlkZUluZm8oKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9KTtcblxuICAvLyBTZXQga2V5Ym9hcmQgY29tbWFuZHNcbiAgJCh3aW5kb3cpLm9uKCdrZXlwcmVzcycsIChldikgPT4ge1xuICAgIC8vIDEgLSBUb2dnbGUgY291bnRyaWVzIHZpc2libGVcbiAgICBpZiAoZXYud2hpY2ggPT09ICcxJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldENvdW50cmllc1Zpc2libGUoIXVpLmdldENvdW50cmllc1Zpc2libGUoKSk7XG4gICAgLy8gMiAtIFRvZ2dsZSBncmF0aWN1bGUgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICcyJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldEdyYXRpY3VsZVZpc2libGUoIXVpLmdldEdyYXRpY3VsZVZpc2libGUoKSk7XG4gICAgLy8gMyAtIFRvZ2dsZSByYXN0ZXIgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICczJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldFJhc3RlclZpc2libGUoIXVpLmdldFJhc3RlclZpc2libGUoKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFVJU3RyaW5ncyBmcm9tICcuLi9jb25maWcvc3RyaW5ncy5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gJ2VuJztcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gZmFsc2U7XG5cbiAgICB0aGlzLmhlbHBGaWxlID0gdW5kZWZpbmVkO1xuICAgIHRoaXMudG9vbCA9ICdyb3RhdGUnO1xuICAgIHRoaXMucHJvamVjdGlvbiA9ICdwbGF0ZWNhcnJlJztcbiAgfVxuXG4gIGluaXQoKSB7XG4gICAgdGhpcy5zZXRMYW5ndWFnZSgnZW4nKTtcbiAgICB0aGlzLnNldFRvb2woJ3JvdGF0ZScpO1xuICAgIHRoaXMuc2V0UHJvamVjdGlvbigncGxhdGVjYXJyZScpO1xuICAgIHRoaXMuaW5pdFRvb2xCdXR0b25zKCk7XG4gICAgdGhpcy5pbml0UHJvamVjdGlvbkJ1dHRvbnMoKTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmdDb2RlO1xuXG4gICAgLy8gU2V0cyBhIGxhbmd1YWdlIGNsYXNzIGluIHRoZSBib2R5XG4gICAgJCgnYm9keScpLnJlbW92ZUNsYXNzKChpbmRleCwgY2xhc3NOYW1lKSA9PiB7XG4gICAgICByZXR1cm4gKGNsYXNzTmFtZS5tYXRjaCgvKF58XFxzKWxhbmctXFxTKy9nKSB8fCBbXSkuam9pbignICcpO1xuICAgIH0pO1xuICAgICQoJ2JvZHknKS5hZGRDbGFzcyhgbGFuZy0ke2xhbmdDb2RlfWApO1xuXG4gICAgLy8gUmVsb2FkIHRoZSBjdXJyZW50IGhlbHAgZmlsZSB3aXRoIHRoZSBuZXcgbGFuZ3VhZ2VcbiAgICBpZiAodGhpcy5oZWxwRmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgpO1xuICAgIH1cblxuICAgIC8vIEluamVjdCB0cmFuc2xhdGFibGUgc3RyaW5nc1xuICAgIHRoaXMuaW5qZWN0U3RyaW5ncygpO1xuICB9XG5cbiAgaW5qZWN0U3RyaW5ncygpIHtcbiAgICAkKCdbZGF0YS11aS1zdHJdJykuZWFjaCgoaSwgZWxlbWVudCkgPT4ge1xuICAgICAgJChlbGVtZW50KS5odG1sKHRoaXMuc3RyKCQoZWxlbWVudCkuYXR0cignZGF0YS11aS1zdHInKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2U7XG4gIH1cblxuICBkaXNwbGF5SGVscEZpbGUoaGVscEZpbGVJRCA9IHRoaXMuaGVscEZpbGUpIHtcbiAgICBkMy50ZXh0KGAuL3R4dC8ke3RoaXMuZ2V0TGFuZ3VhZ2UoKX0vJHtoZWxwRmlsZUlEfS5odG1sYCwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgdGhpcy5kaXNwbGF5SW5mb1JpZ2h0KHRleHQpO1xuICAgICAgdGhpcy5oZWxwRmlsZSA9IGhlbHBGaWxlSUQ7XG4gICAgfSk7XG4gIH1cblxuICBnZXRDb3VudHJpZXNWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZTtcbiAgfVxuXG4gIGdldEdyYXRpY3VsZVZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlO1xuICB9XG5cbiAgZ2V0UmFzdGVyVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc1Jhc3RlclZpc2libGU7XG4gIH1cblxuICBzZXRDb3VudHJpZXNWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNDb3VudHJpZXNWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmJvdW5kYXJ5JykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRDb3VudHJpZXNWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldEdyYXRpY3VsZVZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcuZ3JhdGljdWxlJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRHcmF0aWN1bGVWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHNldFJhc3RlclZpc2libGUoaXNWaXNpYmxlKSB7XG4gICAgdGhpcy5pc1Jhc3RlclZpc2libGUgPSAhIWlzVmlzaWJsZTtcbiAgICAkKCcubGFuZCcpLmNzcyh7IHZpc2liaWxpdHk6ICFpc1Zpc2libGUgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgICAkKCcjbWFwX3RhZyBjYW52YXMnKS5jc3MoeyB2aXNpYmlsaXR5OiB0aGlzLmdldFJhc3RlclZpc2libGUoKSA/ICd2aXNpYmxlJyA6ICdoaWRkZW4nIH0pO1xuICB9XG5cbiAgc3RyKGlkZW50aWZpZXIpIHtcbiAgICBpZiAoVUlTdHJpbmdzW2lkZW50aWZpZXJdICE9PSB1bmRlZmluZWQgJiZcbiAgICAgICAgVUlTdHJpbmdzW2lkZW50aWZpZXJdW3RoaXMuZ2V0TGFuZ3VhZ2UoKV0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldO1xuICAgIH1cbiAgICBjb25zb2xlLnRyYWNlKGBSZXF1ZXN0ZWQgdW5kZWZpbmVkIFVJIFN0cmluZyAnJHtpZGVudGlmaWVyfSdgKTtcbiAgICByZXR1cm4gJyc7XG4gIH1cblxuICBkaXNwbGF5SW5mb0xlZnQoY29udGVudCkge1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG4gICAgJCgnLm1hcF90YWcnKS5hZGRDbGFzcygnZG9ja2VkLXJpZ2h0Jyk7XG5cbiAgICAkKCcuaW5mb19wYW5lLWxlZnQgLmNvbnRlbnQnKS5odG1sKGNvbnRlbnQpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoJy5pbmZvX3BhbmUtbGVmdCcpLmFkZENsYXNzKCd2aXNpYmxlJyk7XG4gIH1cblxuICBkaXNwbGF5SW5mb1JpZ2h0KGNvbnRlbnQpIHtcbiAgICAkKCcubWFwX3RhZycpLnJlbW92ZUNsYXNzKCdkb2NrZWQtcmlnaHQnKTtcbiAgICAkKCcubWFwX3RhZycpLmFkZENsYXNzKCdkb2NrZWQtbGVmdCcpO1xuXG4gICAgJCgnLmluZm9fcGFuZS1yaWdodCAuY29udGVudCcpLmh0bWwoY29udGVudCk7XG4gICAgJCgnLmluZm9fcGFuZS1sZWZ0JykucmVtb3ZlQ2xhc3MoJ3Zpc2libGUnKTtcbiAgICAkKCcuaW5mb19wYW5lLXJpZ2h0JykuYWRkQ2xhc3MoJ3Zpc2libGUnKTtcbiAgfVxuXG4gIGhpZGVJbmZvKCkge1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1yaWdodCcpO1xuICAgICQoJy5tYXBfdGFnJykucmVtb3ZlQ2xhc3MoJ2RvY2tlZC1sZWZ0Jyk7XG5cbiAgICAkKCcuaW5mb19wYW5lLWxlZnQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICAgICQoJy5pbmZvX3BhbmUtcmlnaHQnKS5yZW1vdmVDbGFzcygndmlzaWJsZScpO1xuICB9XG5cbiAgaW5pdFRvb2xCdXR0b25zKCkge1xuICAgICQoJ1tkYXRhLXVpLXRvb2xdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgICB0aGlzLnNldFRvb2woJChldi50YXJnZXQpLmF0dHIoJ2RhdGEtdWktdG9vbCcpKTtcbiAgICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudG9vbDtcbiAgfVxuXG4gIHNldFRvb2woYVRvb2wpIHtcbiAgICB0aGlzLnRvb2wgPSBhVG9vbDtcbiAgICAkKCdbZGF0YS11aS10b29sXScpLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcbiAgICAkKGBbZGF0YS11aS10b29sPSR7YVRvb2x9XWApLmFkZENsYXNzKCdhY3RpdmUnKTtcbiAgICB1cGRhdGVNYXAoKTtcbiAgfVxuXG4gIGluaXRQcm9qZWN0aW9uQnV0dG9ucygpIHtcbiAgICAkKCdbZGF0YS11aS1wcm9qZWN0aW9uXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgICAgdGhpcy5zZXRQcm9qZWN0aW9uKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLXByb2plY3Rpb24nKSk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQcm9qZWN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3Rpb247XG4gIH1cblxuICBzZXRQcm9qZWN0aW9uKGFQcm9qZWN0aW9uKSB7XG4gICAgdGhpcy5wcm9qZWN0aW9uID0gYVByb2plY3Rpb247XG4gICAgJCgnW2RhdGEtdWktcHJvamVjdGlvbl0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJChgW2RhdGEtdWktcHJvamVjdGlvbj0ke2FQcm9qZWN0aW9ufV1gKS5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgdXBkYXRlTWFwKCk7XG4gIH1cbn1cbiJdfQ==
