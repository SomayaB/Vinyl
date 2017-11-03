console.log('hello from the browser JavaScript')

var widget = uploadcare.Widget('[role=uploadcare-uploader]');
widget.onUploadComplete(function(info) {
  document.querySelector('.profile-img').src=info.cdnUrl
});
