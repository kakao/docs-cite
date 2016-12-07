$('.sequence_diagram').sequenceDiagram({theme: 'simple'});

// resize svg diagrams via viewBox
$.each($('.sequence_diagram svg'), function() {
  var width = $(this).attr('width');
  var height = $(this).attr('height');

  $(this).attr({
    'viewBox': '0 0 ' + width + ' ' + height,
    'height': '100%'
  });

  $(this).css({
    'max-width': '100%'
  });
});

$('.sequence_diagram_download').click(function() {
  var target = $(this).attr('target');
  var svg = $('#' + target + ' svg');
  var viewBox = svg.attr('viewBox').split(' ');
  var svgWidth = viewBox[2];
  var svgHeight = viewBox[3];
  var xml = '<?xml version="1.0" encoding="utf-8" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 20010904//EN" "http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd"><svg xmlns="http://www.w3.org/2000/svg" width="' + svgWidth + '" height="' + svgHeight + '" xmlns:xlink="http://www.w3.org/1999/xlink">' + svg.html() + '</svg>';

  $(this).attr("download", target + ".svg");
  $(this).attr("href", "data:image/svg+xml," + encodeURIComponent(xml));
});
