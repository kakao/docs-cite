$(document).ready(function() {
  $.each($('div[type=sequence_diagram]'), function(idx, el) {
    var id = $(this).attr('id');
    var dsl = $(this).text();

    $(this).html('');
    var diagram = Diagram.parse(dsl);
    diagram.drawSVG(id, {theme: 'simple'});
  });
});
