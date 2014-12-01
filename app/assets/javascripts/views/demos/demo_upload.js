Demogogue.Views.DemoUploadView = Backbone.View.extend({
  template: JST['demos/upload'],
  className: "upload-view",
  events: {
    "click button#upload-button" : "uploadAudio",
    "click li#image-form-link" : "showImageLink",
    "click li#image-form-upload" : "showImageUpload",
    "change input#image-link-field" : "setImageFromUrl",
    "click button.update-image" : "updateImage",
    "change input" : "checkCompleteData",
    "keydown input" : "checkCompleteData"
  },

  initialize: function(options) {
    this.model = new Demogogue.Models.Demo();
    this.model.set("thumb_url", "assets/demo_default.png");
  },

  setImageFromUrl: function(event) {
    var imgUrl = event.currentTarget.value;
    if (imgUrl === "")  {
      $('.demo-form-track-image.temp').css(
        "background-image", "url('assets/demo_default.png')"
      );
    } else {
      $(".demo-form-track-image.temp").css(
        "background-image", "url(" + imgUrl+ ")"
      );
    }
  },

  checkCompleteData: function(event) {
    var $title = $(demoTitle);
    debugger
  },

  updateImage: function(event) {
    event.preventDefault();
    var newDemo = this.model;
    var imgUrl = $('#image-link-field').val();
    if (!(imgUrl === ""))  {
      newDemo.set('thumb_url', imgUrl);
      $(".demo-form-track-image").css(
        "background-image", "url(" + imgUrl+ ")"
      );
    }

  },

  render: function() {
    var content = this.template({ demo: this.model });
    this.$el.html(content);
    return this;
  },

  showImageLink: function (event) {
    this.activateTab("#" + event.currentTarget.id);
  },

  showImageUpload: function (event) {
    this.activateTab("#" + event.currentTarget.id);
  },

  activateTab: function(tabId) {
    $(tabId).addClass("active");
    var otherTab = "#image-form-upload";
    if (tabId === "#image-form-upload") {
      otherTab = "#image-form-link";
    }
    $(otherTab).removeClass("active");
  },

  uploadAudio: function (event) {
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
    var newDemo = this.model;
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
