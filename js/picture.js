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

    commentList.appendChild(loadMoreComments(bigPicture.comments));
  };

  var commentsForRender = [];

  var loadMoreComments = function (arr) {
    if (arr.length <= MAX_COMMENTS_TO_SHOW) {
      commentsForRender = createComment(arr);

      commentLoader.classList.add('hidden');
      commentCounter.textContent = arr.length + ' из ' + arr.length + ' комментариев';

    } else {
      var arrCopy = arr.slice();
      var slicedArr = arrCopy.slice(0, MAX_COMMENTS_TO_SHOW);

      commentsForRender = createComment(slicedArr);

      commentLoader.classList.remove('visually-hidden');
      commentCounter.textContent = slicedArr.length + ' из ' + arr.length + ' комментариев';
    }

    commentLoader.addEventListener('click', function () {
      var totalCommentsCount = arr.length;
      var countOfShowedComments = commentList.querySelectorAll('.social__comment').length;

      var needToLoadCommentsCount = totalCommentsCount - countOfShowedComments;

      if (needToLoadCommentsCount > MAX_COMMENTS_TO_SHOW) {
        commentsForRender = arrCopy.slice(0, countOfShowedComments + MAX_COMMENTS_TO_SHOW);

      } else if (needToLoadCommentsCount < MAX_COMMENTS_TO_SHOW) {
        needToLoadCommentsCount = MAX_COMMENTS_TO_SHOW;
        commentsForRender = arrCopy;

        commentLoader.classList.add('visually-hidden');
      }

      commentCounter.textContent = commentsForRender.length + ' из ' + arr.length + ' комментариев';
      commentList.appendChild(createComment(commentsForRender));
    });

    return commentsForRender;
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
    bigPictureOpenPopup: bigPictureOpenPopup,
    loadMoreComments: loadMoreComments
  };
})();
