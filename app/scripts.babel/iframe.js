let pageNumber = 0;

function Iframe(url) {
  this.el = $('<iframe/>', {
    name: '__superframe',
    id: '__page_' + pageNumber++,
    class: '__hidden',
    src: url
  });
}

Iframe.prototype.insert = function(parent) {
  var deferred = $.Deferred();

  this.el.appendTo(parent || 'body');
  this.el.on('load', function(){
    deferred.resolve();
  });

  return deferred.promise();
};
