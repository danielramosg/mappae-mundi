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
  }]);

  return UI;
}();

exports.default = UI;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczIwMTUvbWFpbi5qcyIsImVzMjAxNS91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0FDQUE7Ozs7OztBQUVBO0FBQ0EsSUFBTSxLQUFLLGtCQUFYO0FBQ0EsT0FBTyxLQUFQLEdBQWUsRUFBZjs7QUFFQSxFQUFFLFlBQU07QUFDTjtBQUNBLElBQUUsb0JBQUYsRUFBd0IsRUFBeEIsQ0FBMkIsT0FBM0IsRUFBb0MsVUFBQyxFQUFELEVBQVE7QUFDMUMsUUFBTSxVQUFVLEVBQUUsR0FBRyxNQUFMLENBQWhCO0FBQ0EsT0FBRyxXQUFILENBQWUsUUFBUSxJQUFSLENBQWEsa0JBQWIsQ0FBZjtBQUNBLE1BQUUscUJBQUYsRUFBeUIsV0FBekIsQ0FBcUMsUUFBckM7QUFDQSxZQUFRLFFBQVIsQ0FBaUIsUUFBakI7QUFDQSxPQUFHLGNBQUg7QUFDQSxPQUFHLGVBQUg7QUFDRCxHQVBEOztBQVNBO0FBQ0EsSUFBRSxnQkFBRixFQUFvQixFQUFwQixDQUF1QixPQUF2QixFQUFnQyxVQUFDLEVBQUQsRUFBUTtBQUN0QyxPQUFHLGVBQUgsQ0FBbUIsRUFBRSxHQUFHLE1BQUwsRUFBYSxJQUFiLENBQWtCLGNBQWxCLENBQW5CO0FBQ0EsT0FBRyxjQUFIO0FBQ0EsT0FBRyxlQUFIO0FBQ0QsR0FKRDtBQUtBO0FBQ0EsS0FBRyxlQUFILENBQW1CLFVBQW5CO0FBQ0QsQ0FuQkQ7Ozs7Ozs7Ozs7Ozs7SUNOcUIsRTtBQUNuQixnQkFBYztBQUFBOztBQUNaLFNBQUssUUFBTCxHQUFnQixJQUFoQjtBQUNBLFNBQUssUUFBTCxHQUFnQixTQUFoQjtBQUNEOzs7O2dDQUVXLFEsRUFBVTtBQUNwQixXQUFLLFFBQUwsR0FBZ0IsUUFBaEI7O0FBRUE7QUFDQSxVQUFJLEtBQUssUUFBTCxLQUFrQixTQUF0QixFQUFpQztBQUMvQixhQUFLLGVBQUw7QUFDRDtBQUNGOzs7a0NBRWE7QUFDWixhQUFPLEtBQUssUUFBWjtBQUNEOzs7c0NBRTJDO0FBQUE7O0FBQUEsVUFBNUIsVUFBNEIsdUVBQWYsS0FBSyxRQUFVOztBQUMxQyxTQUFHLElBQUgsWUFBaUIsS0FBSyxXQUFMLEVBQWpCLFNBQXVDLFVBQXZDLFlBQTBELFVBQUMsS0FBRCxFQUFRLElBQVIsRUFBaUI7QUFDekUsWUFBSSxLQUFKLEVBQVcsTUFBTSxLQUFOO0FBQ1gsaUJBQVMsY0FBVCxDQUF3QixVQUF4QixFQUFvQyxTQUFwQyxHQUFnRCxJQUFoRDtBQUNBLGNBQUssUUFBTCxHQUFnQixVQUFoQjtBQUNELE9BSkQ7QUFLRDs7Ozs7O2tCQXpCa0IsRSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJpbXBvcnQgVUkgZnJvbSAnLi91aSc7XG5cbi8vIEluaXQgVUlcbmNvbnN0IHVpID0gbmV3IFVJKCk7XG53aW5kb3cuU29FVUkgPSB1aTtcblxuJCgoKSA9PiB7XG4gIC8vIEhvb2sgbGFuZ3VhZ2UgY2hhbmdlIGxpbmtzXG4gICQoJ1tkYXRhLXVpLWxhbmctc2V0XScpLm9uKCdjbGljaycsIChldikgPT4ge1xuICAgIGNvbnN0ICR0YXJnZXQgPSAkKGV2LnRhcmdldCk7XG4gICAgdWkuc2V0TGFuZ3VhZ2UoJHRhcmdldC5hdHRyKCdkYXRhLXVpLWxhbmctc2V0JykpO1xuICAgICQoJ2FbZGF0YS11aS1sYW5nLXNldF0nKS5yZW1vdmVDbGFzcygnYWN0aXZlJyk7XG4gICAgJHRhcmdldC5hZGRDbGFzcygnYWN0aXZlJyk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG5cbiAgLy8gSG9vayBoZWxwIGZpbGVzXG4gICQoJ1tkYXRhLXVpLWhlbHBdJykub24oJ2NsaWNrJywgKGV2KSA9PiB7XG4gICAgdWkuZGlzcGxheUhlbHBGaWxlKCQoZXYudGFyZ2V0KS5hdHRyKCdkYXRhLXVpLWhlbHAnKSk7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfSk7XG4gIC8vIExvYWQgZGVmYXVsdCBoZWxwIGZpbGVcbiAgdWkuZGlzcGxheUhlbHBGaWxlKCdpbmZvX21hcCcpO1xufSk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBVSSB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSAnZW4nO1xuICAgIHRoaXMuaGVscEZpbGUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBzZXRMYW5ndWFnZShsYW5nQ29kZSkge1xuICAgIHRoaXMubGFuZ3VhZ2UgPSBsYW5nQ29kZTtcblxuICAgIC8vIFJlbG9hZCB0aGUgY3VycmVudCBoZWxwIGZpbGUgd2l0aCB0aGUgbmV3IGxhbmd1YWdlXG4gICAgaWYgKHRoaXMuaGVscEZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5kaXNwbGF5SGVscEZpbGUoKTtcbiAgICB9XG4gIH1cblxuICBnZXRMYW5ndWFnZSgpIHtcbiAgICByZXR1cm4gdGhpcy5sYW5ndWFnZTtcbiAgfVxuXG4gIGRpc3BsYXlIZWxwRmlsZShoZWxwRmlsZUlEID0gdGhpcy5oZWxwRmlsZSkge1xuICAgIGQzLnRleHQoYC4vdHh0LyR7dGhpcy5nZXRMYW5ndWFnZSgpfS8ke2hlbHBGaWxlSUR9Lmh0bWxgLCAoZXJyb3IsIHRleHQpID0+IHtcbiAgICAgIGlmIChlcnJvcikgdGhyb3cgZXJyb3I7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGV4dF90YWcnKS5pbm5lckhUTUwgPSB0ZXh0O1xuICAgICAgdGhpcy5oZWxwRmlsZSA9IGhlbHBGaWxlSUQ7XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==
