var IframeMessager = function() {
  var _this = {};
  var _view = null;
  var _listener = null;

  function init() {
    _view = window.location.href.match(/view\=([^&]+)/)[1];

    _this.post('iframe-loaded');

    if(chrome.extension) {
      chrome.extension.onMessage.addListener(background_onMessage);
    } else {
      console.error('chrome.extension is not available');
    }
  };

  function background_onMessage(request, sender, sendResponse) {
    if (!request.message ||
        !request.data.view ||
        request.data.view !== _view && request.data.view !== '*') {

      return null;
    }

    if (_listener) {
      _listener(request, sender, sendResponse);
    }
  }

  function setListener(callback) {
    _listener = callback;
  };

  _this.post = function(message, data) {
    data = data || {};
    data.source = _view;

    window.parent.postMessage({ message: message, data: data }, '*');
  };

  init();

  return _this;
};