"use strict";

(window.onload = function () {
  var buttons = document.getElementsByClassName('landing-button');
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = buttons[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var button = _step.value;
      button.addEventListener('click', function (evt) {
        var _this = this;

        evt.preventDefault();
        var readMoreDiv = this.previousElementSibling;
        var nextDiv = this.nextElementSibling;

        if (readMoreDiv.style.maxHeight) {
          this.innerText = "Далее";
          readMoreDiv.style.maxHeight = null;
          setTimeout(function () {
            _this.scrollIntoView();
          }, 700);
        } else {
          readMoreDiv.style.maxHeight = readMoreDiv.scrollHeight + "px";
          this.innerText = "Закрыть";
        }
      });
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }
})();