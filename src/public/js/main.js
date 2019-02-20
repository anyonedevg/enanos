
$('.inputGroupFile').on('change', function () {
  let fileName = $(this).val().split('\\').pop();
  $(this).next('.custom-file-label').html(fileName);
});


$(function () {
  var current = location.pathname;
  $('ul li a').each(function () {
    var $this = $(this);
    // if the current path is like this link, make it active
    if ($this.attr('href').indexOf(current) !== -1) {
      $this.addClass('active');
    }
  })
})

$('.btn-edit-general').on('click', function () {
  var $this = $(this);
  var id = $this.next().attr('href').split('/').pop();
  // console.log(id);
  $('#update_vet_image').val(id);
})
