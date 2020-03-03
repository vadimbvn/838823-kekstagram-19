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
var ESC_KEY = 27;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var DEFAULT_SCALE = '100%';
var radix = 10;
var commentList = document.querySelector('.social__comments');
var commentItem = document.querySelector('.social__comment');
var body = document.querySelector('body');
var bigPictureElement = document.querySelector('.big-picture');
var imgUpload = document.querySelector('.img-upload__overlay');
var uploadFile = document.querySelector('#upload-file');
var uploadCancel = imgUpload.querySelector('#upload-cancel');
var imgUploadScale = document.querySelector('.img-upload__scale');
var scaleControlSmall = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlBig = imgUploadScale.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
var imgUploadPreview = imgUpload.querySelector('.img-upload__preview');


var picturesList = document.querySelector('.pictures');
var pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

var commentCounter = document.querySelector('.social__comment-count');
commentCounter.classList.add('hidden');

var commentLoader = document.querySelector('.comments-loader');
commentLoader.classList.add('hidden');

var getRandomNumber = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var bigPicturePopup = function () {
  body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
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
  return fragment;
};

var renderBigPicture = function (bigPicture) {
  bigPictureElement.querySelector('.big-picture__img img').src = bigPicture.url;
  bigPictureElement.querySelector('.likes-count').textContent = bigPicture.likes;
  bigPictureElement.querySelector('.comments-count').textContent = bigPicture.comments.length;
  bigPictureElement.querySelector('.social__caption').textContent = bigPicture.description;

  commentList.appendChild(createComment(bigPicture.comments));
};

renderBigPicture(photos[6]);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    closePopup();
  }
};

var openPopup = function () {
  body.classList.add('modal-open');
  imgUpload.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  body.classList.remove('modal-open');
  imgUpload.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);

};

uploadFile.addEventListener('change', openPopup);

uploadCancel.addEventListener('click', closePopup);

scaleControlValue.value = DEFAULT_SCALE;

var getValue = function () {
  var scaleValue = parseInt(scaleControlValue.value, radix);
  return scaleValue;
};

var decreaseScaleValue = function () {
  if (getValue() > MIN_SCALE && (getValue() - STEP_SCALE) > MIN_SCALE) {
    scaleControlValue.value = (getValue() - STEP_SCALE) + '%';
  } else {
    scaleControlValue.value = MIN_SCALE + '%';
  }
};

var increaseScaleValue = function () {
  if (getValue() < MAX_SCALE && (getValue() + STEP_SCALE) < MAX_SCALE) {
    scaleControlValue.value = (getValue() + STEP_SCALE) + '%';
  } else {
    scaleControlValue.value = MAX_SCALE + '%';
  }
};

var changeImage = function () {
  imgUploadPreview.style.transform = 'scale(' + (parseInt(scaleControlValue.value, radix) / 100) + ')';
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

