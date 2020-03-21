'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/kekstagram/data';
  var URL_UPLOAD = 'https://js.dump.academy/kekstagram';
  var StatusCode = {
    OK: 200
  };
  var TIMEOUT_IN_MS = 10000;

  var processResponse = function (xhr, onSuccess, onError) {

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });
  };

  var requestData = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    processResponse(xhr, onSuccess, onError);
    xhr.open('GET', URL_LOAD);
    xhr.send();
  };

  var postData = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', URL_UPLOAD);
    xhr.responseType = 'json';
    processResponse(xhr, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    requestData: requestData,
    postData: postData
  };
})();
