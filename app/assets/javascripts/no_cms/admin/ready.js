$(document).ready(function() {

  // Filter button
  $('a[data-preview]').on('click', function(e) {
    e.preventDefault();
    var form = $(this).closest('form'),
      submit = form.find('input[type=submit]'),
      target = form.attr('target'),
      action = form.attr('action'),
      new_action = $(this).attr('href');

    target = (typeof(target) == 'undefined') ? '' : target;
    action = (typeof(action) == 'undefined') ? '' : action;

    form.attr('target', '_blank');
    form.attr('action', new_action);
    submit.click();
    form.attr('target', target);
    form.attr('action', action);

  });

  //
  // Init Back UI
  //
  NoCMS.Admin.UI.init();

  // Select2 selector
  $('.select2:visible').select2({
    width: 'resolve'
  });

  // CKEditor
  var ckeditor_text_areas = $('.ckeditor:visible');
  if (ckeditor_text_areas.length > 0) {
    ckeditor_text_areas.each(function() {
      CKEDITOR.replace($(this).attr('name'));
    });
  }
});
