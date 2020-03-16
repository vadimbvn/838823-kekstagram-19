'use strict';

(function () {

  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgEffectLevel.querySelector('.effect-level__pin');
  var effectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
  var effectLevelLine = imgEffectLevel.querySelector('.effect-level__line');

  var coordinateSliderPin = function (evt) {
    evt.preventDefault();

    var startEffectLevelLine = effectLevelLine.offsetLeft - effectLevelPin.offsetWidth;
    var finishEffectLevelLine = startEffectLevelLine + effectLevelPin.offsetWidth;

    var onEffectLevelPinMousemove = function (moveEvt) {
      moveEvt.preventDefault();

      var newPosition = moveEvt.movementX + effectLevelPin.offsetWidth;


      if (newPosition < startEffectLevelLine) {
        newPosition = startEffectLevelLine;
        effectLevelPin.style.left = newPosition + 'px';
      }
      if (newPosition > finishEffectLevelLine) {
        newPosition = finishEffectLevelLine;
        effectLevelPin.style.left = newPosition + 'px';
      }

      var setEffect = function (position) {
        var value;

        value = Math.floor(position / effectLevelLine.offsetWidth * 100);
        effectLevelValue.setAttribute('value', value);
        window.effect.change(value);
      };

      setEffect(newPosition);

    };

    var onEffectLevelPinMouseup = function (upEvt) {
      upEvt.preventDefault();

      effectLevelPin.removeEventListener('mousemove', onEffectLevelPinMousemove);

      effectLevelPin.removeEventListener('mouseup', onEffectLevelPinMouseup);
    };

    effectLevelPin.addEventListener('mousemove', onEffectLevelPinMousemove);

    effectLevelPin.addEventListener('moseup', onEffectLevelPinMouseup);
  };

  window.slider = {
    coordinateSliderPin: coordinateSliderPin
  };
})();
