'use strict';

(function () {
  var imgUploadForm = document.querySelector('.img-upload__form');
  var uploadFile = imgUploadForm.querySelector('#upload-file');
  var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
  var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
  var body = document.querySelector('body');
  var effectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
  var effectLevelPin = effectLevel.querySelector('.effect-level__pin');
  var fragment = document.createDocumentFragment();
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');
  var successTemplate = document.querySelector('#success').content.querySelector('.success');


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
    effectLevel.classList.add('hidden');
    document.addEventListener('keydown', onPopupEscPress);
    window.effect.setDefaultFilter();
    effectLevelPin.addEventListener('mousedown', window.slider.coordinateSliderPin);
  };

  var closePopup = function () {
    body.classList.remove('modal-open');
    imgUploadOverlay.classList.add('hidden');
    uploadFile.value = '';
    document.removeEventListener('keydown', onPopupEscPress);
    effectLevelPin.removeEventListener('mousedown', window.slider.coordinateSliderPin);
  };

  uploadFile.addEventListener('change', openPopup);

  uploadCancel.addEventListener('click', closePopup);

  var uploadSuccessHandler = function () {
    var newSuccess = successTemplate.cloneNode(true);
    fragment.appendChild(newSuccess);
    main.appendChild(fragment);
    closePopup();

    document.addEventListener('keydown', onSuccessModalEscPress);
    document.addEventListener('click', onSuccessModalClick);
  };

  var closeSuccessModal = function () {
    var success = document.querySelector('.success');
    document.removeEventListener('keydown', onSuccessModalEscPress);
    document.removeEventListener('click', onSuccessModalClick);
    success.parentNode.removeChild(success);
  };

  var onSuccessModalEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC_KEY) {
      closeSuccessModal();
    }
  };

  var onSuccessModalClick = function (evt) {
    if (!evt.target.classList.contains('success__inner') && !evt.target.classList.contains('success__title')) {
      closeSuccessModal();
    }
  };

  var errorMessage = function () {
    var newError = errorTemplate.cloneNode(true);
    fragment.appendChild(newError);
    main.appendChild(fragment);
    closePopup();

    document.addEventListener('keydown', onErrorModalEscPress);
    document.addEventListener('click', onErrorModalClick);
  };

  var closeErrorModal = function () {
    var error = document.querySelector('.error');
    document.removeEventListener('keydown', onErrorModalEscPress);
    document.removeEventListener('click', onErrorModalClick);
    error.parentNode.removeChild(error);
  };

  var onErrorModalEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC_KEY) {
      closeErrorModal();
    }
  };

  var onErrorModalClick = function (evt) {
    if (!evt.target.classList.contains('error__inner') && !evt.target.classList.contains('error__title')) {
      closeErrorModal();
    }
  };

  imgUploadForm.addEventListener('submit', function (evt) {
    window.backend.upload(new FormData(imgUploadForm), uploadSuccessHandler, errorMessage);
    evt.preventDefault();
  });
})();
