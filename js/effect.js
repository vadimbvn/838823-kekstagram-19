'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview img');
  var imgEffect = imgUploadForm.querySelector('.img-upload__effects');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = imgEffectLevel.querySelector('.effect-level__pin');
  var effectLevelDepth = imgEffectLevel.querySelector('.effect-level__depth');
  var effectLevelValue = imgEffectLevel.querySelector('.effect-level__value');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var setDefaultFilter = function () {
    imgUploadPreview.style.filter = 'none';
    effectLevelDepth.style.width = '100%';
    effectLevelPin.style.left = '100%';
    effectLevelValue.setAttribute('value', 100);
    scaleControlValue.setAttribute('value', 100 + '%');
  };

  var onPhotoEffectsChange = function (effect) {
    switch (imgUploadPreview.className) {
      case ('effects__preview--none'):
        imgUploadPreview.style.filter = 'none';
        imgEffectLevel.classList.add('hidden');
        break;
      case ('effects__preview--chrome'):
        imgUploadPreview.style.filter = 'grayscale' + '(' + effect / 100 + ')';
        imgEffectLevel.classList.remove('hidden');
        break;
      case ('effects__preview--sepia'):
        imgUploadPreview.style.filter = 'sepia' + '(' + effect / 100 + ')';
        imgEffectLevel.classList.remove('hidden');
        break;
      case ('effects__preview--marvin'):
        imgUploadPreview.style.filter = 'invert' + '(' + effect + '%' + ')';
        imgEffectLevel.classList.remove('hidden');
        break;
      case ('effects__preview--phobos'):
        imgUploadPreview.style.filter = 'blur' + '(' + Math.floor(effect / 3 / 10) + 'px' + ')';
        imgEffectLevel.classList.remove('hidden');
        break;
      case ('effects__preview--heat'):
        imgUploadPreview.style.filter = 'brightness' + '(' + Math.floor(effect / 3 / 10) + ')';
        imgEffectLevel.classList.remove('hidden');
        break;
    }
  };

  imgEffect.addEventListener('change', function (evt) {
    imgUploadPreview.setAttribute('class', '');
    imgUploadPreview.classList.add('effects__preview--' + evt.target.value);
    onPhotoEffectsChange(100);
  });

  window.effect = {
    onChange: onPhotoEffectsChange,
    setDefaultFilter: setDefaultFilter
  };
})();
