'use strict';

(function () {
  var DEFAULT_SCALE = '100%';
  var imgUploadForm = document.querySelector('.img-upload__form');
  var uploadFile = imgUploadForm.querySelector('#upload-file');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
  var body = document.querySelector('body');
  var scaleControlValue = document.querySelector('.scale__control--value');

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC_KEY) {
      var activeInput = document.activeElement;
      if (!activeInput.classList.contains('text__hashtags') && !activeInput.classList.contains('text__description')) {
        closePopup();
      }
    }
  };

  var openPopup = function () {
    body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    scaleControlValue.value = DEFAULT_SCALE;
  };

  var closePopup = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
  };

  uploadFile.addEventListener('change', openPopup);

  uploadCancel.addEventListener('click', closePopup);
})();
