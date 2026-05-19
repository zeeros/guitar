(function() {
  'use strict';

  var intervals = [
    { id: 'adjp1',    highlightId: 'highlights-adjp1',    fretboardId: 'fretboard-mid' },
    { id: 'adjp8',    highlightId: 'highlights-adjp8',    fretboardId: 'fretboard-full' },
    { id: 'skip-one', highlightId: 'highlights-skipone',  fretboardId: 'fretboard-short' },
    { id: 'skip-two', highlightId: 'highlights-skiptwo',  fretboardId: 'fretboard-short' }
  ];
  var currentIndex = 0;

  function showInterval(index) {
    if (index < 0 || index >= intervals.length) return;
    var svg = document.querySelector('svg');
    if (!svg) return;

    intervals.forEach(function(interval, i) {
      var active = i === index;
      var group = svg.getElementById(interval.id);
      var highlight = svg.getElementById(interval.highlightId);
      var fretboard = svg.getElementById(interval.fretboardId);
      var radio = svg.getElementById('radio-' + interval.id);

      if (group) group.classList.toggle('active', active);
      if (highlight) highlight.classList.toggle('active', active);
      if (fretboard) fretboard.classList.toggle('active', active);
      if (radio) {
        radio.setAttribute('aria-checked', String(active));
        radio.classList.toggle('active', active);
        radio.setAttribute('tabindex', active ? '0' : '-1');
      }
    });
    currentIndex = index;
  }

  function handleKeydown(e) {
    var key = e.key;
    if (key === 'ArrowRight' || key === 'ArrowDown') {
      e.preventDefault();
      showInterval((currentIndex + 1) % intervals.length);
    } else if (key === 'ArrowLeft' || key === 'ArrowUp') {
      e.preventDefault();
      showInterval((currentIndex - 1 + intervals.length) % intervals.length);
    }
  }

  function init() {
    var svg = document.querySelector('svg');
    if (!svg) return;

    intervals.forEach(function(interval, i) {
      var radio = svg.getElementById('radio-' + interval.id);
      if (!radio) return;

      radio.addEventListener('click', function() { showInterval(i); });

      radio.addEventListener('keydown', function(e) {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          showInterval(i);
        }
      });
    });

    svg.addEventListener('keydown', handleKeydown);
    showInterval(0);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
