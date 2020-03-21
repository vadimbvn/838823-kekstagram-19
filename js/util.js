'use strict';

(function () {
  var KeyCode = {
    ESC_KEY: 27,
    ENTER_KEY: 13
  };
  var DEBOUNCE_INTERVAL = 500;

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var debounce = function (cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

  var shuffleList = function (array) {
    var copy = array.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i];
      copy[i] = copy[j];
      copy[j] = temp;
    }
    return copy;
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    KeyCode: KeyCode,
    debounce: debounce,
    shuffleList: shuffleList
  };
})();
