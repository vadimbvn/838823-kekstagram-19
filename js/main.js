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
var ENTER_KEY = 13;
var MIN_SCALE = 25;
var MAX_SCALE = 100;
var STEP_SCALE = 25;
var DEFAULT_SCALE = '100%';
var MAX_HASHTAG_COUNT = 5;
var MAX_HASHTAG_LENGTH = 20;
var MAX_COMMENTS_LENGTH = 140;
var radix = 10;
var commentList = document.querySelector('.social__comments');
var commentItem = document.querySelector('.social__comment');
var body = document.querySelector('body');
var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCancel = bigPictureElement.querySelector('#picture-cancel');
var imgUploadForm = document.querySelector('.img-upload__form');
var uploadFile = imgUploadForm.querySelector('#upload-file');
var imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
var uploadCancel = imgUploadOverlay.querySelector('#upload-cancel');
var imgUploadScale = imgUploadForm.querySelector('.img-upload__scale');
var scaleControlSmall = imgUploadScale.querySelector('.scale__control--smaller');
var scaleControlBig = imgUploadScale.querySelector('.scale__control--bigger');
var scaleControlValue = imgUploadScale.querySelector('.scale__control--value');
var imgUploadPreview = imgUploadForm.querySelector('.img-upload__preview');
var imgEffect = imgUploadForm.querySelector('.img-upload__effects');
var imgEffectLevel = imgUploadForm.querySelector('.img-upload__effect-level');
var hashtagFieldset = imgUploadForm.querySelector('.img-upload__text');
var hashtagInput = hashtagFieldset.querySelector('input[name=hashtags]');
var commentsField = imgUploadForm.querySelector('.text__description');

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

var createComments = function (commentCount) {
  var comments = [];
  for (var i = 0; i < commentCount; i++) {
    comments.push({
      avatar: 'img/avatar-' + getRandomNumber(MIN_AVATAR_NUMBER, MAX_AVATAR_NUMBER) + '.svg',
      message: MESSAGES[getRandomNumber(0, MESSAGES.length - 1)],
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

var renderPicture = function (picture, pictureIndex, index) {
  var pictureElement = pictureTemplate.cloneNode(true);

  pictureElement.dataset.class = index;
  pictureElement.querySelector('.picture__img').dataset.id = pictureIndex;
  pictureElement.querySelector('.picture__img').src = picture.url;
  pictureElement.querySelector('.picture__likes').textContent = picture.likes;
  pictureElement.querySelector('.picture__comments').textContent = picture.comments.length;

  return pictureElement;
};

var photos = createPhotos(PICTURES_NUMBER);

var createPicture = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < photos.length; i++) {
    fragment.appendChild(renderPicture(photos[i], i, i));
  }
  picturesList.appendChild(fragment);
};

createPicture();

var renderComment = function (comment) {
  var commentElement = commentItem.cloneNode(true);

  commentElement.querySelector('.social__picture').src = comment.avatar;
  commentElement.querySelector('.social__picture').alt = comment.name;
  commentElement.querySelector('.social__text').textContent = comment.message;

  commentList.innerHTML = '';
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

var bigPictureOpenPopup = function () {
  body.classList.add('modal-open');
  bigPictureElement.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};


var bigPictureClosePopup = function () {
  body.classList.remove('modal-open');
  bigPictureElement.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

var onBigPictureClick = function (evt) {
  if (evt.target.tagName.toLowerCase() === 'img') {
    var pictureIndex = evt.target.dataset.id;
    renderBigPicture(photos[pictureIndex]);
    bigPictureOpenPopup();
  }
};

var onPopupEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEY) {
    var index = evt.target.children[0].dataset.id;
    renderBigPicture(photos[index]);
    bigPictureOpenPopup();
  }
};

picturesList.addEventListener('click', onBigPictureClick);

picturesList.addEventListener('keydown', onPopupEnterPress);

bigPictureCancel.addEventListener('click', bigPictureClosePopup);

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY) {
    var activeInput = document.activeElement;
    if (!activeInput.classList.contains('text__hashtags') && !activeInput.classList.contains('text__description')) {
      closePopup();
      bigPictureClosePopup();
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


var getValue = function () {
  var scaleValue = parseInt(scaleControlValue.value, radix);
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

var onPhotoEffectsChange = function () {
  var effect = imgEffect.elements;

  imgUploadPreview.classList.remove('effects__preview--none', 'effects__preview--chrome', 'effects__preview--sepia', 'effects__preview--marvin', 'effects__preview--phobos', 'effects__preview--heat');

  for (var i = 0; i < effect.length; i++) {
    if (effect[i].checked) {
      switch (effect[i].value) {
        case ('none'):
          imgUploadPreview.classList.add('effects__preview--none');
          imgUploadPreview.style.filter = 'none';
          imgEffectLevel.classList.add('hidden');
          break;
        case ('chrome'):
          imgUploadPreview.classList.add('effects__preview--chrome');
          imgUploadPreview.style.filter = 'grayscale' + '(' + 20 + ')';
          imgEffectLevel.classList.remove('hidden');
          break;
        case ('sepia'):
          imgUploadPreview.classList.add('effects__preview--sepia');
          imgUploadPreview.style.filter = 'sepia' + '(' + 1 + ')';
          imgEffectLevel.classList.remove('hidden');
          break;
        case ('marvin'):
          imgUploadPreview.classList.add('effects__preview--marvin');
          imgUploadPreview.style.filter = 'invert' + '(' + '100%' + ')';
          imgEffectLevel.classList.remove('hidden');
          break;
        case ('phobos'):
          imgUploadPreview.classList.add('effects__preview--phobos');
          imgUploadPreview.style.filter = 'blur' + '(' + '3px' + ')';
          imgEffectLevel.classList.remove('hidden');
          break;
        case ('heat'):
          imgUploadPreview.classList.add('effects__preview--heat');
          imgUploadPreview.style.filter = 'brightness' + '(' + 3 + ')';
          imgEffectLevel.classList.remove('hidden');
          break;
      }
    }
  }
};

imgEffect.addEventListener('change', onPhotoEffectsChange);

var onImgUploadFormSumbit = function (evt) {
  evt.preventDefault();
  imgUploadForm.submit();
};

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


hashtagInput.addEventListener('input', onHashtagValidity);

imgUploadForm.addEventListener('sumbit', onImgUploadFormSumbit);

var onCommentsFieldChange = function () {
  if (commentsField.value.length > MAX_COMMENTS_LENGTH) {
    commentsField.setCustomValidity('Максимальная длина комментария 140 символов');
  } else {
    commentsField.setCustomValidity('');
  }
};

commentsField.addEventListener('change', onCommentsFieldChange);
