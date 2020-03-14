'use strict';

(function () {
  var BLUR_SCALE_MAX = 3;
  var BLUR_SCALE_DIVIDER = 30;
  var BRIGHTNESS_SCALE_MAX = 3;
  var BRIGHTNESS_SCALE_MIN = 1;
  var BRIGHTNESS_SCALE_DIVIDER = 30;
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
  var imgEffect = imgUploadForm.querySelector('.img-upload__effects');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var chromeEffect = imgEffect.querySelector('#effect-chrome');
  var sepiaEffect = imgEffect.querySelector('#effect-sepia');
  var marvinEffect = imgEffect.querySelector('#effect-marvin');
  var phobosEffect = imgEffect.querySelector('#effect-phobos');
  var heatEffect = imgEffect.querySelector('#effect-heat');
  var effectLevelPin = imgEffectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = imgEffectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
  var scaleControlValue = document.querySelector('.scale__control--value');


  var blurScale = function () {
    var value = window.slider.getEffectLevelValue() / BLUR_SCALE_DIVIDER;
    if (value > BLUR_SCALE_MAX) {
      value = BLUR_SCALE_MAX;
    }
    return value;
  };

  var brightnessScale = function () {
    var value = window.slider.getEffectLevelValue() / BRIGHTNESS_SCALE_DIVIDER;
    if (value > BRIGHTNESS_SCALE_MAX) {
      value = BRIGHTNESS_SCALE_MAX;
    } else if (value < BRIGHTNESS_SCALE_MIN) {
      value = BRIGHTNESS_SCALE_MIN;
    }
    return value;
  };

  var setOriginFilter = function () {
    imgUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');
    imgUploadPreview.style.filter = 'none';
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.setAttribute('value', 100 + '%');

  };

  var getEffectLevel = function () {
    if (chromeEffect.checked) {
      imgUploadPreview.style.filter = 'grayscale' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
    } else if (sepiaEffect.checked) {
      imgUploadPreview.style.filter = 'sepia' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
    } else if (marvinEffect.checked) {
      imgUploadPreview.style.filter = 'invert' + '(' + window.slider.getEffectLevelValue() + '%' + ')';
    } else if (phobosEffect.checked) {
      imgUploadPreview.style.filter = 'blur' + '(' + blurScale() + 'px' + ')';
    } else if (heatEffect.checked) {
      imgUploadPreview.style.filter = 'brightness' + '(' + brightnessScale() + ')';
    }
  };

  var onPhotoEffectsChange = function () {
    var effect = imgEffect.elements;

    setOriginFilter();

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
            imgUploadPreview.style.filter = 'grayscale' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('sepia'):
            imgUploadPreview.classList.add('effects__preview--sepia');
            imgUploadPreview.style.filter = 'sepia' + '(' + window.slider.getEffectLevelValue() / 100 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('marvin'):
            imgUploadPreview.classList.add('effects__preview--marvin');
            imgUploadPreview.style.filter = 'invert' + '(' + window.slider.getEffectLevelValue() + '%' + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('phobos'):
            imgUploadPreview.classList.add('effects__preview--phobos');
            imgUploadPreview.style.filter = 'blur' + '(' + Math.round(window.slider.getEffectLevelValue() / 3 / 10) + 'px' + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('heat'):
            imgUploadPreview.classList.add('effects__preview--heat');
            imgUploadPreview.style.filter = 'brightness' + '(' + Math.round(window.slider.getEffectLevelValue() / 3 / 10) + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
        }
      }
    }
  };

  imgEffect.addEventListener('change', onPhotoEffectsChange);

  window.effect = {
    getEffectLevel: getEffectLevel,
    change: onPhotoEffectsChange
  };
})();
