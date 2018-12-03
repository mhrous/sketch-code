$(document).ready(function() {
  const before = $('#before');
  const loader = $('#loader');
  const after = $('#after');
  const form = $('#form');
  const sendButton = $('#generate');
  const generateButton = $('#generate_other');
  const downloadButton = $('#download_html');
  const avatar = $('#avatar');
  const iframe = $('#iframe');
  const go_to_page = $('#go_to_page');
  let nameFile = '';
  downloadButton.on('click', e => {
    e.preventDefault();
    window.location = `http://localhost:4000/html.download/${nameFile}`;
  });
  sendButton.on('click', e => {
    e.preventDefault();

    var datastring = new FormData(form[0]);
    before.addClass('hide');
    loader.removeClass('hide');

    $.ajax('http://localhost:4000/html.generate', {
      data: datastring,
      cache: false,
      type: 'post',
      contentType: false,
      processData: false,
      success: function(res) {
        nameFile = res.fileName.split('.')[0] + '.html';
        iframe.attr('src', `http://localhost:4000/html.get/${nameFile}`);
        loader.addClass('hide');
        after.removeClass('hide');
      },
      error: function(res) {
        console.log(res);
      }
    });
  });
  avatar.on('change', e => {
    const selectedFile = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
      $('img').attr('src', reader.result);
      sendButton.removeAttr('disabled');
    };

    reader.readAsDataURL(selectedFile);
  });
  go_to_page.on('click', e => {
    window.open(`http://localhost:4000/html.get/${nameFile}`);
  });
  generateButton.on('click',e=>{
    after.addClass('hide');
    before.removeClass("hide")

  })
});
