'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgEffectLevel.querySelector('.effect-level__pin');
  var effectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
  var effectLevelLine = imgEffectLevel.querySelector('.effect-level__line');
  var effectLevelDepth = imgEffectLevel.querySelector('.effect-level__depth');

  var setEffect = function (position) {
    var value;

    value = Math.floor(position / effectLevelLine.offsetWidth * 100);
    effectLevelValue.value = value;
    window.effect.onChange(value);
  };

  var onCoordinateSliderPin = function (evt) {
    evt.preventDefault();

    var startEffectLevelLine = effectLevelLine.offsetLeft - effectLevelPin.offsetWidth;
    var finishEffectLevelLine = startEffectLevelLine + effectLevelLine.offsetWidth;

    var onEffectLevelPinMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      var newPosition = moveEvt.movementX + effectLevelPin.offsetLeft;

      if (newPosition < startEffectLevelLine) {
        newPosition = startEffectLevelLine;
      }
      if (newPosition > finishEffectLevelLine) {
        newPosition = finishEffectLevelLine;
      }

      effectLevelPin.style.left = newPosition + 'px';

      effectLevelDepth.style.width = newPosition + 'px';

      setEffect(newPosition);
    };

    var onEffectLevelPinMouseup = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onEffectLevelPinMousemove);

      document.removeEventListener('mouseup', onEffectLevelPinMouseup);
    };

    document.addEventListener('mousemove', onEffectLevelPinMousemove);

    document.addEventListener('mouseup', onEffectLevelPinMouseup);
  };

  window.slider = {
    onCoordinateSliderPin: onCoordinateSliderPin
  };
})();
