(function() {
  'use strict';

  var svgDoc = null;
  var initialized = false;

  function getSvgDoc() {
    return svgDoc;
  }

  window.getSvgDoc = getSvgDoc;

  function showInterval(value) {
    if (!svgDoc) return;

    try {
      var groups = svgDoc.querySelectorAll('.fretboard, .highlights, .pattern');
      for (var i = 0; i < groups.length; i++) {
        groups[i].classList.remove('active');
      }

      var fb, hl, pt;

      if (value === 'adjp1') {
        fb = svgDoc.getElementById('fretboard-full');
        hl = svgDoc.getElementById('highlights-adjp1');
        pt = svgDoc.getElementById('adjp1');
      } else if (value === 'adjp8') {
        fb = svgDoc.getElementById('fretboard-mid');
        hl = svgDoc.getElementById('highlights-adjp8');
        pt = svgDoc.getElementById('adjp8');
      } else if (value === 'skip-one') {
        fb = svgDoc.getElementById('fretboard-short');
        hl = svgDoc.getElementById('highlights-skipone');
        pt = svgDoc.getElementById('skip-one');
      } else if (value === 'skip-two') {
        fb = svgDoc.getElementById('fretboard-short');
        hl = svgDoc.getElementById('highlights-skiptwo');
        pt = svgDoc.getElementById('skip-two');
      }

      if (fb) fb.classList.add('active');
      if (hl) hl.classList.add('active');
      if (pt) pt.classList.add('active');
    } catch (e) {
      console.warn('Fretboard SVG interaction error:', e);
    }
  }

  function init() {
    if (initialized) return;
    initialized = true;

    var obj = document.querySelector('object[type="image/svg+xml"]');
    if (!obj) {
      console.warn('Fretboard SVG object element not found');
      return;
    }

    function onReady() {
      svgDoc = obj.contentDocument;
      if (!svgDoc) {
        console.warn('SVG document not accessible');
        return;
      }

      var radios = document.querySelectorAll('input[name="interval"]');
      for (var i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', function() {
          if (this.checked) showInterval(this.value);
        });
      }

      var checked = document.querySelector('input[name="interval"]:checked');
      if (checked) showInterval(checked.value);
    }

    if (obj.contentDocument) {
      onReady();
    } else {
      obj.addEventListener('load', onReady);
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
