'use strict';

(function () {
  var SliderValue = {
    MIN_VALUE: 0,
    MAX_VALUE: 100
  };
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
  var imgEffect = imgUploadForm.querySelector('.img-upload__effects');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgEffectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = imgEffectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
  var scaleControlValue = document.querySelector('.scale__control--value');
  var effectLevelLine = imgEffectLevel.querySelector('.effect-level__line');

  var setDefaultFilter = function () {
    imgUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    imgUploadPreview.style.filter = 'none';
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.setAttribute('value', 100 + '%');

  };

  var getEffectLevelValue = function () {
    var pinPosition = getPinPosition();
    var value;

    if (pinPosition === SliderValue.MAX_VALUE) {
      value = SliderValue.MAX_VALUE;
    } else {
      value = Math.floor(effectLevelDepth.offsetWidth / effectLevelLine.offsetWidth * 100) / 100;
      effectLevelValue.setAttribute('value', value);
    }
    return value;
  };

  var getPinPosition = function () {
    var pinPosition = parseInt(effectLevelPin.style.left, 10);

    return pinPosition;
  };


  var onPhotoEffectsChange = function () {
    var effect = imgEffect.elements;

    for (var i = 0; i < effect.length; i++) {
      if (effect[i].checked) {
        switch (effect[i].value) {
          case ('none'):
            imgUploadPreview.classList.add('effects__preview--none');
            imgUploadPreview.style.filter = 'none';
            imgEffectLevel.classList.add('hidden');
            break;
          case ('chrome'):
            imgUploadPreview.classList.add('effects__preview--chrome');
            imgUploadPreview.style.filter = 'grayscale' + '(' + getEffectLevelValue() / 100 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('sepia'):
            imgUploadPreview.classList.add('effects__preview--sepia');
            imgUploadPreview.style.filter = 'sepia' + '(' + getEffectLevelValue() / 100 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('marvin'):
            imgUploadPreview.classList.add('effects__preview--marvin');
            imgUploadPreview.style.filter = 'invert' + '(' + getEffectLevelValue() + '%' + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('phobos'):
            imgUploadPreview.classList.add('effects__preview--phobos');
            imgUploadPreview.style.filter = 'blur' + '(' + Math.floor(getEffectLevelValue() / 3 / 10) + 'px' + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('heat'):
            imgUploadPreview.classList.add('effects__preview--heat');
            imgUploadPreview.style.filter = 'brightness' + '(' + Math.floor(getEffectLevelValue() / 3 / 10) + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
        }
      }
    }
  };

  imgEffect.addEventListener('change', onPhotoEffectsChange);

  window.effect = {
    change: onPhotoEffectsChange,
    setDefaultFilter: setDefaultFilter
  };
})();
