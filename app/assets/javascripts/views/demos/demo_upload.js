Demogogue.Views.DemoUploadView = Backbone.View.extend({
  template: JST['demos/upload'],
  className: "upload-view",
  events: {
    "click button#upload-button" : "uploadAudio",
    "click li#image-form-link" : "showImageUpload",
  },

  initialize: function(options) {
    this.demo = new Demogogue.Models.Demo();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  showImageUpload: function(event) {
    debugger
  },

  uploadAudio: function(event) {
    event.preventDefault();
    var bucket = new AWS.S3({ params: { Bucket: "demogogue"}});
    var file = document.getElementById('file-chooser').files[0];

    if (file) {
      var params = this.parseFile(file);
      var req = bucket.putObject(params, function (err, data) {
        err ? console.log("Error") : console.log("Uploaded.");
      });
      // Progress Bar
      this.renderProgressBar(req);
      this.audioSuccessHandler(req);
      req.send();
      $('#demoTitle').val(file.name.replace(/\.[^/.]+$/, ""));

    } else {
      alert('No file selected');
    }
  },

  parseFile: function(file) {
    var params = {
      Key: file.name,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
    };

    return params;
  },

  renderProgressBar: function(request) {
    var lastPercentage = 0;
    request.on('httpUploadProgress', function(progress) {
      $(".progress").show();
      var percentage = Math.floor((progress.loaded / progress.total) * 100);
      if (percentage > lastPercentage) {
        lastPercentage = percentage;
        if (percentage > 10) {
          $('.progress-bar').html(percentage + "%");
        }
        $('.progress-bar').css("width", percentage + "%").val(percentage + "%");
      }
    });
  },

  audioSuccessHandler: function(request) {
    var newDemo = this.demo;
    request.on('success', function (response) {
      $('.progress-bar').css('background-color', "#00CD00")
      .html('<div style="display:none;" id="complete">Upload Complete!</div>');
      var audioUrl = response.request.httpRequest.stream.responseURL;
      console.log(audioUrl);
      newDemo.set("audio_url", audioUrl);
      $('.upload-form-form').slideUp();
      $('.demo-form').slideDown();
      setTimeout(function() {
        $('#complete').fadeIn();
      }, 350);
    })
  }

});
