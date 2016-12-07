$('.sequence_diagram').sequenceDiagram({theme: 'simple'});

// resize svg diagrams via viewBox
$.each($('.sequence_diagram svg'), function() {
  var width = $(this).attr('width');
  var height = $(this).attr('height');

  $(this).attr({
    'viewBox': '0 0 ' + width + ' ' + height,
    'width': '100%',
    'height': '100%'
  });
});
