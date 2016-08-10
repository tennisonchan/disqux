'use strict';

console.log('\'Allo \'Allo! Content script');

var iframe = null;

function main() {
  iframe = new Iframe(chrome.extension.getURL('disqux-sidepanel.html'))
    .insert()
    .then(function(html) {
      debugger;
    });
}

main();