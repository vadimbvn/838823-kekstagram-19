'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
  var imgEffect = imgUploadForm.querySelector('.img-upload__effects');
  var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');

  var onPhotoEffectsChange = function () {
    var effect = imgEffect.elements;

    imgUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

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
            imgUploadPreview.style.filter = 'grayscale' + '(' + 20 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('sepia'):
            imgUploadPreview.classList.add('effects__preview--sepia');
            imgUploadPreview.style.filter = 'sepia' + '(' + 1 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('marvin'):
            imgUploadPreview.classList.add('effects__preview--marvin');
            imgUploadPreview.style.filter = 'invert' + '(' + '100%' + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('phobos'):
            imgUploadPreview.classList.add('effects__preview--phobos');
            imgUploadPreview.style.filter = 'blur' + '(' + '3px' + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
          case ('heat'):
            imgUploadPreview.classList.add('effects__preview--heat');
            imgUploadPreview.style.filter = 'brightness' + '(' + 3 + ')';
            imgEffectLevel.classList.remove('hidden');
            break;
        }
      }
    }
  };

  imgEffect.addEventListener('change', onPhotoEffectsChange);

})();
