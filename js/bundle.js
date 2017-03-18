(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _ui = require('./ui');

var _ui2 = _interopRequireDefault(_ui);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Init UI
var ui = new _ui2.default();
window.SoEUI = ui;

$(function () {
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

},{"./ui":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UI = function () {
  function UI() {
    _classCallCheck(this, UI);

    this.language = 'en';
    this.helpFile = undefined;

    this.isCountriesVisible = true;
    this.isGraticuleVisible = true;
    this.isRasterVisible = false;
  }

  _createClass(UI, [{
    key: 'setLanguage',
    value: function setLanguage(langCode) {
      this.language = langCode;

      // Reload the current help file with the new language
      if (this.helpFile !== undefined) {
        this.displayHelpFile();
      }
    }
  }, {
    key: 'getLanguage',
    value: function getLanguage() {
      return this.language;
    }
  }, {
    key: 'displayHelpFile',
    value: function displayHelpFile() {
      var _this = this;

      var helpFileID = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.helpFile;

      d3.text('./txt/' + this.getLanguage() + '/' + helpFileID + '.html', function (error, text) {
        if (error) throw error;
        document.getElementById('text_tag').innerHTML = text;
        _this.helpFile = helpFileID;
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
  }]);

  return UI;
}();

exports.default = UI;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczIwMTUvbWFpbi5qcyIsImVzMjAxNS91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBO0FBQ0EsSUFBTSxLQUFLLGtCQUFYO0FBQ0EsT0FBTyxLQUFQLEdBQWUsRUFBZjs7QUFFQSxFQUFFLFlBQU07QUFDTjtBQUNBLElBQUUsb0JBQUYsRUFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQyxFQUFELEVBQVE7QUFDMUMsUUFBTSxVQUFVLEVBQUUsR0FBRyxNQUFMLENBQWhCO0FBQ0EsT0FBRyxXQUFILENBQWUsUUFBUSxJQUFSLENBQWEsa0JBQWIsQ0FBZjtBQUNBLE1BQUUscUJBQUYsRUFBeUIsV0FBekIsQ0FBcUMsUUFBckM7QUFDQSxZQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxPQUFHLGNBQUg7QUFDQSxPQUFHLGVBQUg7QUFDRCxHQVBEOztBQVNBO0FBQ0EsSUFBRSxnQkFBRixFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxVQUFDLEVBQUQsRUFBUTtBQUN0QyxPQUFHLGVBQUgsQ0FBbUIsRUFBRSxHQUFHLE1BQUwsRUFBYSxJQUFiLENBQWtCLGNBQWxCLENBQW5CO0FBQ0EsT0FBRyxjQUFIO0FBQ0EsT0FBRyxlQUFIO0FBQ0QsR0FKRDtBQUtBO0FBQ0EsS0FBRyxlQUFILENBQW1CLFVBQW5COztBQUVBO0FBQ0EsSUFBRSxNQUFGLEVBQVUsRUFBVixDQUFhLFVBQWIsRUFBeUIsVUFBQyxFQUFELEVBQVE7QUFDL0I7QUFDQSxRQUFJLEdBQUcsS0FBSCxLQUFhLElBQUksVUFBSixFQUFqQixFQUFtQztBQUNqQyxTQUFHLG1CQUFILENBQXVCLENBQUMsR0FBRyxtQkFBSCxFQUF4QjtBQUNGO0FBQ0MsS0FIRCxNQUdPLElBQUksR0FBRyxLQUFILEtBQWEsSUFBSSxVQUFKLEVBQWpCLEVBQW1DO0FBQ3hDLFNBQUcsbUJBQUgsQ0FBdUIsQ0FBQyxHQUFHLG1CQUFILEVBQXhCO0FBQ0Y7QUFDQyxLQUhNLE1BR0EsSUFBSSxHQUFHLEtBQUgsS0FBYSxJQUFJLFVBQUosRUFBakIsRUFBbUM7QUFDeEMsU0FBRyxnQkFBSCxDQUFvQixDQUFDLEdBQUcsZ0JBQUgsRUFBckI7QUFDRDtBQUNGLEdBWEQ7QUFZRCxDQWpDRDs7Ozs7Ozs7Ozs7OztJQ05xQixFO0FBQ25CLGdCQUFjO0FBQUE7O0FBQ1osU0FBSyxRQUFMLEdBQWdCLElBQWhCO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLFNBQWhCOztBQUVBLFNBQUssa0JBQUwsR0FBMEIsSUFBMUI7QUFDQSxTQUFLLGtCQUFMLEdBQTBCLElBQTFCO0FBQ0EsU0FBSyxlQUFMLEdBQXVCLEtBQXZCO0FBQ0Q7Ozs7Z0NBRVcsUSxFQUFVO0FBQ3BCLFdBQUssUUFBTCxHQUFnQixRQUFoQjs7QUFFQTtBQUNBLFVBQUksS0FBSyxRQUFMLEtBQWtCLFNBQXRCLEVBQWlDO0FBQy9CLGFBQUssZUFBTDtBQUNEO0FBQ0Y7OztrQ0FFYTtBQUNaLGFBQU8sS0FBSyxRQUFaO0FBQ0Q7OztzQ0FFMkM7QUFBQTs7QUFBQSxVQUE1QixVQUE0Qix1RUFBZixLQUFLLFFBQVU7O0FBQzFDLFNBQUcsSUFBSCxZQUFpQixLQUFLLFdBQUwsRUFBakIsU0FBdUMsVUFBdkMsWUFBMEQsVUFBQyxLQUFELEVBQVEsSUFBUixFQUFpQjtBQUN6RSxZQUFJLEtBQUosRUFBVyxNQUFNLEtBQU47QUFDWCxpQkFBUyxjQUFULENBQXdCLFVBQXhCLEVBQW9DLFNBQXBDLEdBQWdELElBQWhEO0FBQ0EsY0FBSyxRQUFMLEdBQWdCLFVBQWhCO0FBQ0QsT0FKRDtBQUtEOzs7MENBRXFCO0FBQ3BCLGFBQU8sS0FBSyxrQkFBWjtBQUNEOzs7MENBRXFCO0FBQ3BCLGFBQU8sS0FBSyxrQkFBWjtBQUNEOzs7dUNBRWtCO0FBQ2pCLGFBQU8sS0FBSyxlQUFaO0FBQ0Q7Ozt3Q0FFbUIsUyxFQUFXO0FBQzdCLFdBQUssa0JBQUwsR0FBMEIsQ0FBQyxDQUFDLFNBQTVCO0FBQ0EsUUFBRSxXQUFGLEVBQWUsR0FBZixDQUFtQixFQUFFLFlBQVksS0FBSyxtQkFBTCxLQUE2QixTQUE3QixHQUF5QyxRQUF2RCxFQUFuQjtBQUNEOzs7d0NBRW1CLFMsRUFBVztBQUM3QixXQUFLLGtCQUFMLEdBQTBCLENBQUMsQ0FBQyxTQUE1QjtBQUNBLFFBQUUsWUFBRixFQUFnQixHQUFoQixDQUFvQixFQUFFLFlBQVksS0FBSyxtQkFBTCxLQUE2QixTQUE3QixHQUF5QyxRQUF2RCxFQUFwQjtBQUNEOzs7cUNBRWdCLFMsRUFBVztBQUMxQixXQUFLLGVBQUwsR0FBdUIsQ0FBQyxDQUFDLFNBQXpCO0FBQ0EsUUFBRSxPQUFGLEVBQVcsR0FBWCxDQUFlLEVBQUUsWUFBWSxDQUFDLFNBQUQsR0FBYSxTQUFiLEdBQXlCLFFBQXZDLEVBQWY7QUFDQSxRQUFFLGlCQUFGLEVBQXFCLEdBQXJCLENBQXlCLEVBQUUsWUFBWSxLQUFLLGdCQUFMLEtBQTBCLFNBQTFCLEdBQXNDLFFBQXBELEVBQXpCO0FBQ0Q7Ozs7OztrQkF6RGtCLEUiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiaW1wb3J0IFVJIGZyb20gJy4vdWknO1xuXG4vLyBJbml0IFVJXG5jb25zdCB1aSA9IG5ldyBVSSgpO1xud2luZG93LlNvRVVJID0gdWk7XG5cbiQoKCkgPT4ge1xuICAvLyBIb29rIGxhbmd1YWdlIGNoYW5nZSBsaW5rc1xuICAkKCdbZGF0YS11aS1sYW5nLXNldF0nKS5vbignY2xpY2snLCAoZXYpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0ID0gJChldi50YXJnZXQpO1xuICAgIHVpLnNldExhbmd1YWdlKCR0YXJnZXQuYXR0cignZGF0YS11aS1sYW5nLXNldCcpKTtcbiAgICAkKCdhW2RhdGEtdWktbGFuZy1zZXRdJykucmVtb3ZlQ2xhc3MoJ2FjdGl2ZScpO1xuICAgICR0YXJnZXQuYWRkQ2xhc3MoJ2FjdGl2ZScpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuXG4gIC8vIEhvb2sgaGVscCBmaWxlc1xuICAkKCdbZGF0YS11aS1oZWxwXScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIHVpLmRpc3BsYXlIZWxwRmlsZSgkKGV2LnRhcmdldCkuYXR0cignZGF0YS11aS1oZWxwJykpO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH0pO1xuICAvLyBMb2FkIGRlZmF1bHQgaGVscCBmaWxlXG4gIHVpLmRpc3BsYXlIZWxwRmlsZSgnaW5mb19tYXAnKTtcblxuICAvLyBTZXQga2V5Ym9hcmQgY29tbWFuZHNcbiAgJCh3aW5kb3cpLm9uKCdrZXlwcmVzcycsIChldikgPT4ge1xuICAgIC8vIDEgLSBUb2dnbGUgY291bnRyaWVzIHZpc2libGVcbiAgICBpZiAoZXYud2hpY2ggPT09ICcxJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldENvdW50cmllc1Zpc2libGUoIXVpLmdldENvdW50cmllc1Zpc2libGUoKSk7XG4gICAgLy8gMiAtIFRvZ2dsZSBncmF0aWN1bGUgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICcyJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldEdyYXRpY3VsZVZpc2libGUoIXVpLmdldEdyYXRpY3VsZVZpc2libGUoKSk7XG4gICAgLy8gMyAtIFRvZ2dsZSByYXN0ZXIgdmlzaWJsZVxuICAgIH0gZWxzZSBpZiAoZXYud2hpY2ggPT09ICczJy5jaGFyQ29kZUF0KCkpIHtcbiAgICAgIHVpLnNldFJhc3RlclZpc2libGUoIXVpLmdldFJhc3RlclZpc2libGUoKSk7XG4gICAgfVxuICB9KTtcbn0pO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVUkge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gJ2VuJztcbiAgICB0aGlzLmhlbHBGaWxlID0gdW5kZWZpbmVkO1xuXG4gICAgdGhpcy5pc0NvdW50cmllc1Zpc2libGUgPSB0cnVlO1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gdHJ1ZTtcbiAgICB0aGlzLmlzUmFzdGVyVmlzaWJsZSA9IGZhbHNlO1xuICB9XG5cbiAgc2V0TGFuZ3VhZ2UobGFuZ0NvZGUpIHtcbiAgICB0aGlzLmxhbmd1YWdlID0gbGFuZ0NvZGU7XG5cbiAgICAvLyBSZWxvYWQgdGhlIGN1cnJlbnQgaGVscCBmaWxlIHdpdGggdGhlIG5ldyBsYW5ndWFnZVxuICAgIGlmICh0aGlzLmhlbHBGaWxlICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHRoaXMuZGlzcGxheUhlbHBGaWxlKCk7XG4gICAgfVxuICB9XG5cbiAgZ2V0TGFuZ3VhZ2UoKSB7XG4gICAgcmV0dXJuIHRoaXMubGFuZ3VhZ2U7XG4gIH1cblxuICBkaXNwbGF5SGVscEZpbGUoaGVscEZpbGVJRCA9IHRoaXMuaGVscEZpbGUpIHtcbiAgICBkMy50ZXh0KGAuL3R4dC8ke3RoaXMuZ2V0TGFuZ3VhZ2UoKX0vJHtoZWxwRmlsZUlEfS5odG1sYCwgKGVycm9yLCB0ZXh0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IpIHRocm93IGVycm9yO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RleHRfdGFnJykuaW5uZXJIVE1MID0gdGV4dDtcbiAgICAgIHRoaXMuaGVscEZpbGUgPSBoZWxwRmlsZUlEO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q291bnRyaWVzVmlzaWJsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5pc0NvdW50cmllc1Zpc2libGU7XG4gIH1cblxuICBnZXRHcmF0aWN1bGVWaXNpYmxlKCkge1xuICAgIHJldHVybiB0aGlzLmlzR3JhdGljdWxlVmlzaWJsZTtcbiAgfVxuXG4gIGdldFJhc3RlclZpc2libGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuaXNSYXN0ZXJWaXNpYmxlO1xuICB9XG5cbiAgc2V0Q291bnRyaWVzVmlzaWJsZShpc1Zpc2libGUpIHtcbiAgICB0aGlzLmlzQ291bnRyaWVzVmlzaWJsZSA9ICEhaXNWaXNpYmxlO1xuICAgICQoJy5ib3VuZGFyeScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0Q291bnRyaWVzVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRHcmF0aWN1bGVWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNHcmF0aWN1bGVWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmdyYXRpY3VsZScpLmNzcyh7IHZpc2liaWxpdHk6IHRoaXMuZ2V0R3JhdGljdWxlVmlzaWJsZSgpID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gIH1cblxuICBzZXRSYXN0ZXJWaXNpYmxlKGlzVmlzaWJsZSkge1xuICAgIHRoaXMuaXNSYXN0ZXJWaXNpYmxlID0gISFpc1Zpc2libGU7XG4gICAgJCgnLmxhbmQnKS5jc3MoeyB2aXNpYmlsaXR5OiAhaXNWaXNpYmxlID8gJ3Zpc2libGUnIDogJ2hpZGRlbicgfSk7XG4gICAgJCgnI21hcF90YWcgY2FudmFzJykuY3NzKHsgdmlzaWJpbGl0eTogdGhpcy5nZXRSYXN0ZXJWaXNpYmxlKCkgPyAndmlzaWJsZScgOiAnaGlkZGVuJyB9KTtcbiAgfVxuXG5cbn1cbiJdfQ==
