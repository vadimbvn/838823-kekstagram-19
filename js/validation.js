'use strict';

(function () {
  var MAX_HASHTAG_COUNT = 5;
  var MAX_HASHTAG_LENGTH = 20;
  var MAX_COMMENTS_LENGTH = 140;
  var imgUploadForm = document.querySelector('.img-upload__form');
  var hashtagFieldset = imgUploadForm.querySelector('.img-upload__text');
  var hashtagInput = hashtagFieldset.querySelector('input[name=hashtags]');
  var commentsField = imgUploadForm.querySelector('.text__description');

  var onHashtagValidity = function () {
    var hashtagInputContent = hashtagInput.value;
    var lowerCaseHashtag = hashtagInputContent.toLowerCase();
    var hashtagList = lowerCaseHashtag.split(' ');

    if (hashtagInput.value.length === 0) {
      hashtagInput.setCustomValidity('');
    } else if (hashtagList.length > MAX_HASHTAG_COUNT) {
      hashtagInput.setCustomValidity('Максимум 5 хэш-тегов');
    } else {
      for (var i = 0; i < hashtagList.length; i++) {
        if (hashtagList[i][0] !== '#' || hashtagList[0][0] !== '#') {
          hashtagInput.setCustomValidity('Xэш-тег начинается с символа #');
        } else if (hashtagList[i] === '#') {
          hashtagInput.setCustomValidity('Хэш-тег не может состоять только из одной решётки');
        } else if (hashtagList.indexOf(hashtagList[i]) !== i) {
          hashtagInput.setCustomValidity('Один и тото же хэш-тег не может быть использован дважды');
        } else if (hashtagList[i].length > MAX_HASHTAG_LENGTH) {
          hashtagInput.setCustomValidity('Максимальная длина одного хэш-тега 20 символов, включая #');
        } else if (hashtagList[i].split('#').length > 2) {
          hashtagInput.setCustomValidity('Хэш-теги должны быть разделены пробелами');
        } else {
          hashtagInput.setCustomValidity('');
        }
      }
    }
  };

  var onCommentsFieldChange = function () {
    if (commentsField.value.length > MAX_COMMENTS_LENGTH) {
      commentsField.setCustomValidity('Максимальная длина комментария 140 символов');
    } else {
      commentsField.setCustomValidity('');
    }
  };

  hashtagInput.addEventListener('input', onHashtagValidity);

  commentsField.addEventListener('change', onCommentsFieldChange);
})();
