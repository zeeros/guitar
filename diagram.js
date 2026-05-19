(function() {
  'use strict';

  var intervals = [
    { id: 'adjp1',    highlightId: 'highlights-adjp1',    fretboardId: 'fretboard-mid' },
    { id: 'adjp8',    highlightId: 'highlights-adjp8',    fretboardId: 'fretboard-full' },
    { id: 'skip-one', highlightId: 'highlights-skipone',  fretboardId: 'fretboard-short' },
    { id: 'skip-two', highlightId: 'highlights-skiptwo',  fretboardId: 'fretboard-short' }
  ];

  function getSvgDoc() {
    var obj = document.querySelector('object[type="image/svg+xml"]');
    if (!obj) return null;
    return obj.contentDocument;
  }

  function showInterval(value) {
    var doc = getSvgDoc();
    if (!doc) return;

    intervals.forEach(function(interval) {
      var active = interval.id === value;
      var group = doc.getElementById(interval.id);
      var highlight = doc.getElementById(interval.highlightId);
      var fretboard = doc.getElementById(interval.fretboardId);

      if (group) group.classList.toggle('active', active);
      if (highlight) highlight.classList.toggle('active', active);
      if (fretboard) fretboard.classList.toggle('active', active);
    });
  }

  function init() {
    var radios = document.querySelectorAll('input[name="interval"]');
    radios.forEach(function(radio) {
      radio.addEventListener('change', function() {
        if (this.checked) showInterval(this.value);
      });
    });
    var checked = document.querySelector('input[name="interval"]:checked');
    if (checked) {
      var obj = document.querySelector('object[type="image/svg+xml"]');
      if (obj) {
        obj.addEventListener('load', function() { showInterval(checked.value); });
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
