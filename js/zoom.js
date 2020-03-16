'use strict';

(function () {
  var MIN_SCALE = 25;
  var MAX_SCALE = 100;
  var STEP_SCALE = 25;
  var imgUploadForm = document.querySelector('.img-upload__form');
  var imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
  var imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
  var scaleControlSmall = imgUploadScale.querySelector('.scale__control--smaller');
  var scaleControlBig = imgUploadScale.querySelector('.scale__control--bigger');
  var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');

  var getValue = function () {
    var scaleValue = parseInt(scaleControlValue.value, 10);
    return scaleValue;
  };

  var decreaseScaleValue = function () {
    var newScaleValue = getValue() - STEP_SCALE >= MIN_SCALE ? getValue() - STEP_SCALE : MIN_SCALE;
    scaleControlValue.value = newScaleValue + '%';
  };

  var increaseScaleValue = function () {
    var newScaleValue = getValue() + STEP_SCALE <= MAX_SCALE ? getValue() + STEP_SCALE : MAX_SCALE;
    scaleControlValue.value = newScaleValue + '%';
  };

  var changeImage = function () {
    imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleControlValue.value, 10) / 100) + ')';
  };

  var onScaleMinusClick = function () {
    decreaseScaleValue();
    changeImage();
  };

  var onScalePlusClick = function () {
    increaseScaleValue();
    changeImage();
  };

  scaleControlSmall.addEventListener('click', onScaleMinusClick);

  scaleControlBig.addEventListener('click', onScalePlusClick);

})();
