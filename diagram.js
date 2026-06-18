(function() {
  'use strict';
  var svgDoc = null;
  var initialized = false;

  window.showInterval = function(value) {
    if (!svgDoc) return;
    try {
      var groups = svgDoc.querySelectorAll('.highlights, .pattern');
      for (var i = 0; i < groups.length; i++) {
        groups[i].classList.remove('active');
      }
      var hl, pt;
      if (value === 'adjp1') {
        hl = document.getElementById('highlights-adjp1');
        pt = document.getElementById('adjp1');
      } else if (value === 'adjp8') {
        hl = document.getElementById('highlights-adjp8');
        pt = document.getElementById('adjp8');
      } else if (value === 'skip-one') {
        hl = document.getElementById('highlights-skipone');
        pt = document.getElementById('skip-one');
      } else if (value === 'skip-two') {
        hl = document.getElementById('highlights-skiptwo');
        pt = document.getElementById('skip-two');
      }
      if (hl) hl.classList.add('active');
      if (pt) pt.classList.add('active');
    } catch (e) {
      console.warn('Fretboard SVG interaction error:', e);
    }
  };

  window.getSvgDoc = function() {
    return svgDoc;
  };

  function init() {
    if (initialized) return;
    initialized = true;
    var svgElement = document.getElementById('fretboard');
    if (!svgElement) {
      console.error('Fretboard SVG (#fretboard) not found');
      return;
    }
    svgDoc = svgElement;
    var radios = document.querySelectorAll('input[name="interval"]');
    for (var i = 0; i < radios.length; i++) {
      radios[i].addEventListener('change', function() {
        if (this.checked) window.showInterval(this.value);
      });
    }
    var checked = document.querySelector('input[name="interval"]:checked');
    if (checked) window.showInterval(checked.value);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
