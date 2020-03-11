'use strict';

(function () {
  var KEYCODE = {
    ESC_KEY: 27,
    ENTER_KEY: 13
  };

  var getRandomNumber = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  window.util = {
    getRandomNumber: getRandomNumber,
    KEYCODE: KEYCODE
  };
})();
