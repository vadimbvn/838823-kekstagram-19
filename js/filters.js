'use strict';

(function () {
  var PHOTOS_NUMBER = 10;
  var photoFilter = document.querySelector('.img-filters');
  var photoFilterForm = photoFilter.querySelector('.img-filters__form');
  var photoFiltersButton = photoFilter.querySelectorAll('.img-filters__button');
  var photos = [];

  var removePhotos = function () {
    var photoBox = document.querySelector('.pictures');
    var photo = photoBox.querySelectorAll('.picture');
    photo.forEach(function (item) {
      photoBox.removeChild(item);
    });
  };

  var removeActiveFilter = function () {
    photoFiltersButton.forEach(function (el) {
      if (el.classList.contains('img-filters__button--active')) {
        el.classList.remove('img-filters__button--active');
      }
    });
  };

  var sortDiscussed = function () {
    return photos.slice().sort(function (left, right) {
      return right.comments.length - left.comments.length;
    });
  };

  var sortRandom = function (data) {
    var newPhotoArray = data.slice();
    newPhotoArray.length = PHOTOS_NUMBER;
    newPhotoArray = window.util.shuffleList(newPhotoArray);
    return newPhotoArray;
  };

  var sortPhoto = function () {
    photoFilterForm.addEventListener('click', window.util.debounce(function (evt) {
      removeActiveFilter();
      evt.target.classList.add('img-filters__button--active');
      removePhotos();
      if (evt.target.id === 'filter-random') {
        var randomPhotos = sortRandom(photos);
        window.gallery.renderLoadPicture(randomPhotos);
      } else if (evt.target.id === 'filter-default') {
        window.gallery.renderLoadPicture(photos);
      } else if (evt.target.id === 'filter-discussed') {
        var discussedPhotos = sortDiscussed();
        window.gallery.renderLoadPicture(discussedPhotos);
      }
    }));
  };

  var onLoad = function (data) {
    photos = data;
    sortPhoto();
  };

  window.backend.requestData(onLoad);
})();
