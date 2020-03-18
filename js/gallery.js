'use strict';

(function () {
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  var fragmentDocument = document.createDocumentFragment();
  var main = document.querySelector('main');
  var errorTemplate = document.querySelector('#error').content.querySelector('.error');

  var renderPicture = function (picture, pictureIndex) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').dataset.id = pictureIndex;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

    return pictureElement;
  };

  var createPicture = function (photos) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    return fragment;
  };

  var loadPhotosData = [];

  var renderLoadPicture = function (photos) {
    loadPhotosData = photos.slice();
    picturesList.appendChild(createPicture(loadPhotosData));
  };

  var errorHandler = function (errorMessage) {
    var newError = errorTemplate.cloneNode(true);
    newError.querySelector('.error__title').textContent = errorMessage;
    newError.querySelector('button').textContent = 'Перезагрузите страницу';
    fragmentDocument.appendChild(newError);
    main.appendChild(fragmentDocument);
  };

  window.load.requestData(renderLoadPicture, errorHandler);

  var onBigPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var pictureIndex = evt.target.dataset.id;
      window.picture.renderBigPicture(loadPhotosData[pictureIndex]);
      window.picture.bigPictureOpenPopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ENTER_KEY) {
      var pictureIndex = evt.target.children[0].dataset.id;
      window.picture.renderBigPicture(loadPhotosData[pictureIndex]);
      window.picture.bigPictureOpenPopup();
    }
  };

  picturesList.addEventListener('click', onBigPictureClick);

  picturesList.addEventListener('keydown', onPopupEnterPress);

})();
