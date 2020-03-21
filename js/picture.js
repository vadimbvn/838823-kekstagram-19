'use strict';

(function () {
  var MAX_COMMENTS_TO_SHOW = 5;
  var bigPictureElement = document.querySelector('.big-picture');
  var bigPictureCancel = bigPictureElement.querySelector('#picture-cancel');
  var commentList = document.querySelector('.social__comments');
  var commentItem = document.querySelector('.social__comment');
  var body = document.querySelector('body');
  var commentCounter = document.querySelector('.social__comment-count');
  var commentLoader = document.querySelector('.comments-loader');
  var commentsForRender = [];
  var commentsTotal = [];

  var renderComment = function (comment) {
    var commentElement = commentItem.cloneNode(true);

    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;

    commentList.textContent = '';
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
    bigPictureElement.querySelector('.social__caption').textContent = bigPicture.description;

    commentsTotal = bigPicture.comments.slice();
    commentList.appendChild(renderComments(bigPicture.comments));
  };

  var renderComments = function (arr) {
    if (arr.length <= MAX_COMMENTS_TO_SHOW) {
      commentsForRender = createComment(arr);

      commentLoader.classList.add('hidden');
      commentCounter.textContent = arr.length + ' из ' + arr.length + ' комментариев';

    } else {
      var slicedArr = commentsTotal.slice(0, MAX_COMMENTS_TO_SHOW);

      commentsForRender = createComment(slicedArr);
      commentLoader.classList.remove('hidden');
      commentCounter.textContent = slicedArr.length + ' из ' + arr.length + ' комментариев';
    }
    return commentsForRender;
  };

  var loadMoreComments = function (arrComments) {
    var totalCommentsCount = arrComments.length;
    var countOfShowedComments = commentList.querySelectorAll('.social__comment').length;
    commentsForRender = createComment(arrComments);

    var needToLoadCommentsCount = totalCommentsCount - countOfShowedComments;
    if (needToLoadCommentsCount > MAX_COMMENTS_TO_SHOW) {
      commentsForRender = commentsTotal.slice(0, countOfShowedComments + MAX_COMMENTS_TO_SHOW);
    } else if (needToLoadCommentsCount <= MAX_COMMENTS_TO_SHOW) {
      commentLoader.classList.add('hidden');
      needToLoadCommentsCount = MAX_COMMENTS_TO_SHOW;
      commentsForRender = commentsTotal;
    }

    commentCounter.textContent = commentsForRender.length + ' из ' + arrComments.length + ' комментариев';
    commentList.appendChild(createComment(commentsForRender));
  };

  commentLoader.addEventListener('click', function () {
    loadMoreComments(commentsTotal);
  });

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
    bigPictureOpenPopup: bigPictureOpenPopup,
    loadMoreComments: loadMoreComments
  };
})();
