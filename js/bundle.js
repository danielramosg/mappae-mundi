(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports={
  "APP_TITLE": {
    "en": "Title eng",
    "pt": "Title pt"
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
      this.injectStrings();
    }
  }, {
    key: 'setLanguage',
    value: function setLanguage(langCode) {
      this.language = langCode;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjb25maWcvc3RyaW5ncy5qc29uIiwiZXMyMDE1L21haW4uanMiLCJlczIwMTUvdWkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ05BOzs7Ozs7QUFFQTtBQUNBLElBQU0sS0FBSyxrQkFBWDtBQUNBLE9BQU8sS0FBUCxHQUFlLEVBQWY7O0FBRUEsRUFBRSxZQUFNO0FBQ04sS0FBRyxJQUFIOztBQUVBO0FBQ0EsSUFBRSxvQkFBRixFQUF3QixFQUF4QixDQUEyQixPQUEzQixFQUFvQyxVQUFDLEVBQUQsRUFBUTtBQUMxQyxRQUFNLFVBQVUsRUFBRSxHQUFHLE1BQUwsQ0FBaEI7QUFDQSxPQUFHLFdBQUgsQ0FBZSxRQUFRLElBQVIsQ0FBYSxrQkFBYixDQUFmO0FBQ0EsTUFBRSxxQkFBRixFQUF5QixXQUF6QixDQUFxQyxRQUFyQztBQUNBLFlBQVEsUUFBUixDQUFpQixRQUFqQjtBQUNBLE9BQUcsY0FBSDtBQUNBLE9BQUcsZUFBSDtBQUNELEdBUEQ7O0FBU0E7QUFDQSxJQUFFLGdCQUFGLEVBQW9CLEVBQXBCLENBQXVCLE9BQXZCLEVBQWdDLFVBQUMsRUFBRCxFQUFRO0FBQ3RDLE9BQUcsZUFBSCxDQUFtQixFQUFFLEdBQUcsTUFBTCxFQUFhLElBQWIsQ0FBa0IsY0FBbEIsQ0FBbkI7QUFDQSxPQUFHLGNBQUg7QUFDQSxPQUFHLGVBQUg7QUFDRCxHQUpEO0FBS0E7QUFDQSxLQUFHLGVBQUgsQ0FBbUIsVUFBbkI7O0FBRUE7QUFDQSxJQUFFLE1BQUYsRUFBVSxFQUFWLENBQWEsVUFBYixFQUF5QixVQUFDLEVBQUQsRUFBUTtBQUMvQjtBQUNBLFFBQUksR0FBRyxLQUFILEtBQWEsSUFBSSxVQUFKLEVBQWpCLEVBQW1DO0FBQ2pDLFNBQUcsbUJBQUgsQ0FBdUIsQ0FBQyxHQUFHLG1CQUFILEVBQXhCO0FBQ0Y7QUFDQyxLQUhELE1BR08sSUFBSSxHQUFHLEtBQUgsS0FBYSxJQUFJLFVBQUosRUFBakIsRUFBbUM7QUFDeEMsU0FBRyxtQkFBSCxDQUF1QixDQUFDLEdBQUcsbUJBQUgsRUFBeEI7QUFDRjtBQUNDLEtBSE0sTUFHQSxJQUFJLEdBQUcsS0FBSCxLQUFhLElBQUksVUFBSixFQUFqQixFQUFtQztBQUN4QyxTQUFHLGdCQUFILENBQW9CLENBQUMsR0FBRyxnQkFBSCxFQUFyQjtBQUNEO0FBQ0YsR0FYRDtBQVlELENBbkNEOzs7Ozs7Ozs7OztBQ05BOzs7Ozs7OztJQUVxQixFO0FBQ25CLGdCQUFjO0FBQUE7O0FBQ1osU0FBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBSyxrQkFBTCxHQUEwQixJQUExQjtBQUNBLFNBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDQSxTQUFLLGVBQUwsR0FBdUIsS0FBdkI7O0FBRUEsU0FBSyxRQUFMLEdBQWdCLFNBQWhCO0FBQ0Q7Ozs7MkJBRU07QUFDTCxXQUFLLGFBQUw7QUFDRDs7O2dDQUVXLFEsRUFBVTtBQUNwQixXQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7QUFDQSxVQUFJLEtBQUssUUFBTCxLQUFrQixTQUF0QixFQUFpQztBQUMvQixhQUFLLGVBQUw7QUFDRDs7QUFFRDtBQUNBLFdBQUssYUFBTDtBQUNEOzs7b0NBRWU7QUFBQTs7QUFDZCxRQUFFLGVBQUYsRUFBbUIsSUFBbkIsQ0FBd0IsVUFBQyxDQUFELEVBQUksT0FBSixFQUFnQjtBQUN0QyxVQUFFLE9BQUYsRUFBVyxJQUFYLENBQWdCLE1BQUssR0FBTCxDQUFTLEVBQUUsT0FBRixFQUFXLElBQVgsQ0FBZ0IsYUFBaEIsQ0FBVCxDQUFoQjtBQUNELE9BRkQ7QUFHRDs7O2tDQUVhO0FBQ1osYUFBTyxLQUFLLFFBQVo7QUFDRDs7O3NDQUUyQztBQUFBOztBQUFBLFVBQTVCLFVBQTRCLHVFQUFmLEtBQUssUUFBVTs7QUFDMUMsU0FBRyxJQUFILFlBQWlCLEtBQUssV0FBTCxFQUFqQixTQUF1QyxVQUF2QyxZQUEwRCxVQUFDLEtBQUQsRUFBUSxJQUFSLEVBQWlCO0FBQ3pFLFlBQUksS0FBSixFQUFXLE1BQU0sS0FBTjtBQUNYLGlCQUFTLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0MsU0FBcEMsR0FBZ0QsSUFBaEQ7QUFDQSxlQUFLLFFBQUwsR0FBZ0IsVUFBaEI7QUFDRCxPQUpEO0FBS0Q7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLLGtCQUFaO0FBQ0Q7OzswQ0FFcUI7QUFDcEIsYUFBTyxLQUFLLGtCQUFaO0FBQ0Q7Ozt1Q0FFa0I7QUFDakIsYUFBTyxLQUFLLGVBQVo7QUFDRDs7O3dDQUVtQixTLEVBQVc7QUFDN0IsV0FBSyxrQkFBTCxHQUEwQixDQUFDLENBQUMsU0FBNUI7QUFDQSxRQUFFLFdBQUYsRUFBZSxHQUFmLENBQW1CLEVBQUUsWUFBWSxLQUFLLG1CQUFMLEtBQTZCLFNBQTdCLEdBQXlDLFFBQXZELEVBQW5CO0FBQ0Q7Ozt3Q0FFbUIsUyxFQUFXO0FBQzdCLFdBQUssa0JBQUwsR0FBMEIsQ0FBQyxDQUFDLFNBQTVCO0FBQ0EsUUFBRSxZQUFGLEVBQWdCLEdBQWhCLENBQW9CLEVBQUUsWUFBWSxLQUFLLG1CQUFMLEtBQTZCLFNBQTdCLEdBQXlDLFFBQXZELEVBQXBCO0FBQ0Q7OztxQ0FFZ0IsUyxFQUFXO0FBQzFCLFdBQUssZUFBTCxHQUF1QixDQUFDLENBQUMsU0FBekI7QUFDQSxRQUFFLE9BQUYsRUFBVyxHQUFYLENBQWUsRUFBRSxZQUFZLENBQUMsU0FBRCxHQUFhLFNBQWIsR0FBeUIsUUFBdkMsRUFBZjtBQUNBLFFBQUUsaUJBQUYsRUFBcUIsR0FBckIsQ0FBeUIsRUFBRSxZQUFZLEtBQUssZ0JBQUwsS0FBMEIsU0FBMUIsR0FBc0MsUUFBcEQsRUFBekI7QUFDRDs7O3dCQUVHLFUsRUFBWTtBQUNkLFVBQUksa0JBQVUsVUFBVixNQUEwQixTQUExQixJQUNBLGtCQUFVLFVBQVYsRUFBc0IsS0FBSyxXQUFMLEVBQXRCLE1BQThDLFNBRGxELEVBQzZEO0FBQzNELGVBQU8sa0JBQVUsVUFBVixFQUFzQixLQUFLLFdBQUwsRUFBdEIsQ0FBUDtBQUNEO0FBQ0QsY0FBUSxLQUFSLHNDQUFnRCxVQUFoRDtBQUNBLGFBQU8sRUFBUDtBQUNEOzs7Ozs7a0JBL0VrQixFIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJBUFBfVElUTEVcIjoge1xuICAgIFwiZW5cIjogXCJUaXRsZSBlbmdcIixcbiAgICBcInB0XCI6IFwiVGl0bGUgcHRcIlxuICB9XG59XG4iLCJpbXBvcnQgVUkgZnJvbSAnLi91aSc7XG5cbi8vIEluaXQgVUlcbmNvbnN0IHVpID0gbmV3IFVJKCk7XG53aW5kb3cuU29FVUkgPSB1aTtcblxuJCgoKSA9PiB7XG4gIHVpLmluaXQoKTtcblxuICAvLyBIb29rIGxhbmd1YWdlIGNoYW5nZSBsaW5rc1xuICAkKCdbZGF0YS11aS1sYW5nLXNldF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0ID0gJChldi50YXJnZXQpO1xuICAgIHVpLnNldExhbmd1YWdlKCR0YXJnZXQuYXR0cignZGF0YS11aS1sYW5nLXNldCcpKTtcbiAgICAkKCdhW2RhdGEtdWktbGFuZy1zZXRdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIEhvb2sgaGVscCBmaWxlc1xuICAkKCdbZGF0YS11aS1oZWxwXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIHVpLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1oZWxwJykpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuICAvLyBMb2FkIGRlZmF1bHQgaGVscCBmaWxlXG4gIHVpLmRpc3BsYXlIZWxwRmlsZSgnaW5mb19tYXAnKTtcblxuICAvLyBTZXQga2V5Ym9hcmQgY29tbWFuZHNcbiAgJCh3aW5kb3cpLm9uKCdrZXlwcmVzcycsIChldikgPT4ge1xuICAgIC8vIDEgLSBUb2dnbGUgY291bnRyaWVzIHZpc2libGVcbiAgICBpZiAoZXYud2hpY2ggPT09ICcxJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldENvdW50cmllc1Zpc2libGUoIXVpLmdldENvdW50cmllc1Zpc2libGUoKSk7XG4gICAgLy8gMiAtIFRvZ2dsZSBncmF0aWN1bGUgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICcyJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldEdyYXRpY3VsZVZpc2libGUoIXVpLmdldEdyYXRpY3VsZVZpc2libGUoKSk7XG4gICAgLy8gMyAtIFRvZ2dsZSByYXN0ZXIgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICczJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldFJhc3RlclZpc2libGUoIXVpLmdldFJhc3RlclZpc2libGUoKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiaW1wb3J0IFVJU3RyaW5ncyBmcm9tICcuLi9jb25maWcvc3RyaW5ncy5qc29uJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gJ2VuJztcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9IHRydWU7XG4gICAgdGhpcy5pc0dyYXRpY3VsZVZpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gZmFsc2U7XG5cbiAgICB0aGlzLmhlbHBGaWxlID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgaW5pdCgpIHtcbiAgICB0aGlzLmluamVjdFN0cmluZ3MoKTtcbiAgfVxuXG4gIHNldExhbmd1YWdlKGxhbmdDb2RlKSB7XG4gICAgdGhpcy5sYW5ndWFnZSA9IGxhbmdDb2RlO1xuXG4gICAgLy8gUmVsb2FkIHRoZSBjdXJyZW50IGhlbHAgZmlsZSB3aXRoIHRoZSBuZXcgbGFuZ3VhZ2VcbiAgICBpZiAodGhpcy5oZWxwRmlsZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmRpc3BsYXlIZWxwRmlsZSgpO1xuICAgIH1cblxuICAgIC8vIEluamVjdCB0cmFuc2xhdGFibGUgc3RyaW5nc1xuICAgIHRoaXMuaW5qZWN0U3RyaW5ncygpO1xuICB9XG5cbiAgaW5qZWN0U3RyaW5ncygpIHtcbiAgICAkKCdbZGF0YS11aS1zdHJdJykuZWFjaCgoaSwgZWxlbWVudCkgPT4ge1xuICAgICAgJChlbGVtZW50KS5odG1sKHRoaXMuc3RyKCQoZWxlbWVudCkuYXR0cignZGF0YS11aS1zdHInKSkpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2U7XG4gIH1cblxuICBkaXNwbGF5SGVscEZpbGUoaGVscEZpbGVJRCA9IHRoaXMuaGVscEZpbGUpIHtcbiAgICBkMy50ZXh0KGAuL3R4dC8ke3RoaXMuZ2V0TGFuZ3VhZ2UoKX0vJHtoZWxwRmlsZUlEfS5odG1sYCwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRfdGFnJykuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgIHRoaXMuaGVscEZpbGUgPSBoZWxwRmlsZUlEO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvdW50cmllc1Zpc2libGU7XG4gIH1cblxuICBnZXRHcmF0aWN1bGVWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZTtcbiAgfVxuXG4gIGdldFJhc3RlclZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYXN0ZXJWaXNpYmxlO1xuICB9XG5cbiAgc2V0Q291bnRyaWVzVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ib3VuZGFyeScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0Q291bnRyaWVzVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRHcmF0aWN1bGVWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmdyYXRpY3VsZScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0R3JhdGljdWxlVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRSYXN0ZXJWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmxhbmQnKS5jc3MoeyB2aXNpYmlsaXR5OiAhaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgJCgnI21hcF90YWcgY2FudmFzJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRSYXN0ZXJWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG4gIHN0cihpZGVudGlmaWVyKSB7XG4gICAgaWYgKFVJU3RyaW5nc1tpZGVudGlmaWVyXSAhPT0gdW5kZWZpbmVkICYmXG4gICAgICAgIFVJU3RyaW5nc1tpZGVudGlmaWVyXVt0aGlzLmdldExhbmd1YWdlKCldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiBVSVN0cmluZ3NbaWRlbnRpZmllcl1bdGhpcy5nZXRMYW5ndWFnZSgpXTtcbiAgICB9XG4gICAgY29uc29sZS50cmFjZShgUmVxdWVzdGVkIHVuZGVmaW5lZCBVSSBTdHJpbmcgJyR7aWRlbnRpZmllcn0nYCk7XG4gICAgcmV0dXJuICcnO1xuICB9XG59XG4iXX0=
