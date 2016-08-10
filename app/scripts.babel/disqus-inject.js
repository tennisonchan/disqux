var pageNumber = 0;

function DisqusInjector() {
  this.thead = $('<div/>', {
    id: 'disqus_thread'
  });

  // this.script = $('<script/>', {
  //   src: 'http://disqux.disqus.com/embed.js',
  //   'data-timestamp': +new Date()
  // });

  this.init();
}

function setDisqusConfig() {
  window.disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = Math.random() * 999999999;
  };
}

DisqusInjector.prototype.init = function(parent) {
  setDisqusConfig();
  // this.thead.appendTo(document.body);
  // this.script.appendTo(document.body);
};
