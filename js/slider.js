'use strict';

(function () {

  var SliderValue = {
    MIN_VALUE: 0,
    MAX_VALUE: 100
  };

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgEffectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = imgEffectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
  var effectLevelLine = imgEffectLevel.querySelector('.effect-level__line');
  var radix = 10;

  var getWidthOfEffectLevelLine = function () {
    var widthofEffectLevelLine = effectLevelLine.getBoundingClientRect().width;

    return widthofEffectLevelLine;
  };

  var getEffectLevelValue = function () {
    var pinPosition = getPinPosition();
    var value;

    if (pinPosition === SliderValue.MAX_VALUE) {
      value = SliderValue.MAX_VALUE;
    } else {
      value = Math.round(pinPosition * 100 / getWidthOfEffectLevelLine());
      effectLevelValue.setAttribute('value', value);
    }
    return value;
  };

  var effectLevelDepthMousemove = function () {
    effectLevelDepth.style.width = effectLevelPin.offsetLeft + 'px';
    getEffectLevelValue();
  };

  var getPinPosition = function () {
    var pinPosition = parseInt(effectLevelPin.style.left, radix);

    return pinPosition;
  };

  var coordinateSliderPin = function (evt) {
    var minEffectScale = SliderValue.MIN_VALUE;
    var maxEffectScale = getWidthOfEffectLevelLine();

    evt.preventDefault();

    var startCoords = {
      x: evt.clientX
    };

    var onEffectLevelPinMousemove = function (moveEvt) {
      window.effect.getEffectLevel();

      effectLevelDepthMousemove();
      moveEvt.preventDefault();

      var shift = {
        x: startCoords .x - moveEvt.clientX
      };

      startCoords = {
        x: moveEvt.clientX
      };

      if (effectLevelPin.offsetLeft - shift.x < minEffectScale) {
        effectLevelPin.style.left = 0 + 'px';
      } else if (effectLevelPin.offsetLeft - shift.x > maxEffectScale) {
        effectLevelPin.style.left = 100 + 'px';
      } else {
        effectLevelPin.style.left = (effectLevelPin.offsetLeft - shift.x) + 'px';
      }
    };

    var onEffectLevelPinMouseup = function (upEvt) {
      window.effect.getEffectLevel();

      getPinPosition();
      upEvt.preventDefault();

      effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMousemove);

      effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    };

    effectLevelPin.addEventListener('mousemove', onEffectLevelPinMousemove);

    effectLevelPin.addEventListener('moseup', onEffectLevelPinMouseup);
  };

  window.slider = {
    coordinateSliderPin: coordinateSliderPin,
    getEffectLevelValue: getEffectLevelValue
  };
})();
