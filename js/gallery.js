'use strict';

(function () {
  var PICTURES_NUMBER = 25;
  var picturesList = document.querySelector('.pictures');
  var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  var renderPicture = function (picture, pictureIndex, index) {
    var pictureElement = pictureTemplate.cloneNode(true);

    pictureElement.querySelector('.picture__img').dataset.id = pictureIndex;
    pictureElement.querySelector('.picture__img').src = picture.url;
    pictureElement.querySelector('.picture__likes').textContent = picture.likes;
    pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;
    pictureElement.dataset.id = index;

    return pictureElement;
  };

  var photos = window.data.createPhotos(PICTURES_NUMBER);

  var createPicture = function () {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < photos.length; i++) {
      fragment.appendChild(renderPicture(photos[i], i));
    }
    picturesList.appendChild(fragment);
  };

  createPicture();

  var onBigPictureClick = function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      var pictureIndex = evt.target.dataset.id;
      window.picture.renderBigPicture(photos[pictureIndex]);
      window.picture.bigPictureOpenPopup();
    }
  };

  var onPopupEnterPress = function (evt) {
    if (evt.keyCode === window.util.KEYCODE.ENTER_KEY) {
      var index = evt.target.children[0].dataset.id;
      window.picture.renderBigPicture(photos[index]);
      window.picture.bigPictureOpenPopup();
    }
  };

  picturesList.addEventListener('click', onBigPictureClick);

  picturesList.addEventListener('keydown', onPopupEnterPress);

})();
