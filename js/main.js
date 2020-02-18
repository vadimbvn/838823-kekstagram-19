'use strict';

var NAMES = ['Джо', 'Росс', 'Чендлер', 'Моника', 'Фиби', 'Рейчел'];
var MESSAGES = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];
var PICTURES_NUMBER = 25;
var MIN_LIKES = 15;
var MAX_LIKES = 200;
var MIN_AVATAR_NUMBER = 1;
var MAX_AVATAR_NUMBER = 6;
var MIN_COMMENTS_NUMBER = 1;
var MAX_COMMENTS_NUMBER = 6;


var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var bigPictureElement = document.querySelector('.big-picture');
bigPictureElement.classList.remove('hidden');

var commentList = document.querySelector('.social__comments');
var commentItem = document.querySelector('.social__comment');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var createComments = function (commentCount) {
  var comments = [];
  for (var i = 0; i < commentCount; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
      message: MESSAGES[getRandomNumber(0, MESSAGES.length)],
      name: NAMES[getRandomNumber(0, NAMES.length)]
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
      likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
      comments: createComments(getRandomNumber(MIN_COMMENTS_NUMBER, MAX_COMMENTS_NUMBER))
    });
  }
  return photos;
};

var renderPicture = function (picture) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var photos = createPhotos(PICTURES_NUMBER);

var createPicture = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i]));
  }
  picturesList.appendChild(fragment);
};

createPicture();

var renderComment = function (comment) {
  var commentElement = commentItem.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  return commentElement;
};

var createComment = function (comments) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < comments.length; i++) {
    fragment.appendChild(renderComment(comments[i]));
  }
  commentList.appendChild(fragment);
};

var renderBigPicture = function (bigPicture) {
  bigPictureElement.querySelector('.big-picture__img img').src = bigPicture.url;
  bigPictureElement.querySelector('.likes-count').textContent = bigPicture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = bigPicture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = bigPicture.description;

  createComment(bigPicture.comments);
};

renderBigPicture(photos[0]);


var commentCount = document.querySelector('.social__comment-count');
commentCount.classList.add('hidden');

var commentLoader = document.querySelector('.comments-loader');
commentLoader.classList.add('hidden');

var body = document.querySelector('body');
body.classList.add('modal-open');


