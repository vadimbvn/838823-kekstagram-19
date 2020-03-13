'use strict';

(function () {
  var NAMES = ['Джо', 'Росс', 'Чендлер', 'Моника', 'Фиби', 'Рейчел'];
  var MESSAGES = ['Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var MIN_LIKES = 15;
  var MAX_LIKES = 200;
  var MIN_AVATAR_NUMBER = 1;
  var MAX_AVATAR_NUMBER = 6;
  var MIN_COMMENTS_NUMBER = 1;
  var MAX_COMMENTS_NUMBER = 6;

  var createComments = function (commentCount) {
    var comments = [];
    for (var i = 0; i < commentCount; i++) {
      comments.push({
        avatar: 'img/avatar-' + window.util.getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
        message: MESSAGES[window.util.getRandomNumber(0, MESSAGES.length - 1)],
        name: NAMES[window.util.getRandomNumber(0, NAMES.length)]
      });
    }
    return comments;
  };

  var createPhotos = function (photosCount) {
    var photos = [];
    for (var i = 0; i < photosCount; i++) {
      photos.push({
        url: 'photos/' + (i + 1) + '.jpg',
        description: 'Описание фотографии',
        likes: window.util.getRandomNumber(MIN_LIKES, MAX_LIKES),
        comments: createComments(window.util.getRandomNumber(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER))});
    }
    return photos;
  };
  window.data = {
    createPhotos: createPhotos
  };
})();
