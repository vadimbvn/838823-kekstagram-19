'use strict';

(function () {
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureElement.querySelector('#picture-cancel');
  var commentList = document.querySelector('.social__comments');
  var commentItem = document.querySelector('.social__comment');
  var body = document.querySelector('body');

  var commentCounter = document.querySelector('.social__comment-count');
  commentCounter.classList.add('hidden');

  var commentLoader = document.querySelector('.comments-loader');
  commentLoader.classList.add('hidden');

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

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === window.util.KeyCode.ESC_KEY) {
      bigPictureClosePopup();
    }
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

  bigPictureCancel.addEventListener('click', bigPictureClosePopup);

  window.picture = {
    renderBigPicture: renderBigPicture,
    bigPictureOpenPopup: bigPictureOpenPopup
  };
})();
