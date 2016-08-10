/* global Storage*/

'use strict';

chrome.runtime.onInstalled.addListener(details => {
  console.log('previousVersion', details.previousVersion);
});

chrome.browserAction.setBadgeText({text: '\'Allo'});

var Background = function() {
  var _this = {},
      _version = null,
      _model = {
        hidden: true
      };

  _this.init = function() {
    setupListeners();
    loadData();
  };

  function setupListeners () {
    chrome.runtime.onConnect.addListener(onConnect);
    chrome.runtime.onMessage.addListener(onPostMessage);
    chrome.browserAction.onClicked.addListener(onClickAction);
  }

  function onConnect (port) {
    console.log('runtime.onConnect: ', port);
    var tabId = port.sender.tab.id;
    _ports[tabId] = port;
    port.onMessage.addListener(processMessage);
  }

  function onClickAction (tab) {
    console.log("onClickAction");
  }

  function onPostMessage(request, sender, sendResponse) {
    if (!request.message) return;

    processMessage(request, sender, sendResponse);
    return true;
  }

  function processMessage(request, sender, sendResponse) {
    var data = request.data || {};
    data.port = sender;
    $.publish(request.message, data);
  }

  function onAllIframesLoaded (evt, data) {
    console.log('onAllIframesLoaded:data=', data);
  }

  _this.post = function(message, data) {
    data = data || {};

    try {
      if(data.tabId){
        if (!_ports[data.tabId]) return;
        _ports[data.tabId].postMessage({ message: message, data: data });
      } else {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
          var tab = tabs[0];
          if (!tab || !_ports[tab.id]) return;

          _ports[tab.id].postMessage({
            message: message,
            data: data
          });
        });
      }
    } catch (e) {
      console.error('error:', e);
      delete _ports[data.tabId];
    }
  };

  _this.init();

  return _this;
};

window.addEventListener("load", function() {
  new Background();
}, false);