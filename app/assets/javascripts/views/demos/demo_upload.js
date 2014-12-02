Demogogue.Views.DemoUploadView = Backbone.View.extend({
  template: JST['demos/upload'],
  className: "upload-view",
  events: {
    "click button#upload-button" : "uploadAudio",
    "click li#image-form-link" : "showImageLink",
    "click li#image-form-upload" : "showImageUpload",
    "change input#image-link-field" : "setTempImageFromUrl",
    "click button.update-image" : "updateImage",
    "click button#upload-img" : "uploadImage",
    "change input" : "checkCompleteData",
    "keyup input" : "checkCompleteData",
    "click button#save-btn" : "saveDemo",
  },

  initialize: function(options) {
    this.model = new Demogogue.Models.Demo();
    this.initializeModel(this.model);
  },

  initializeModel: function(model) {
    model.set("thumb_url", "assets/demo_default.png");
    model.set("artist_id", CURRENT_USER);
  },

  setTempImageFromUrl: function(event, options) {
    var imgUrl;
    if (options && options.url) {
      imgUrl = options.url;
    } else {
      imgUrl = event.currentTarget.value;
    }
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
    console.log($title.val());
    console.log(this.model.get('audio_url'));
    if ($title.val().length > 0 && this.model.get('audio_url')) {
      $('#save-btn').attr("disabled", false);
    } else {
      $('#save-btn').attr("disabled", true);
    }
  },

  updateImage: function(event) {
    event.preventDefault();
    var newDemo = this.model;
    var imgUrl = this.getTempImgUrl();
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
    this.activateTab(event.currentTarget.id);
  },

  showImageUpload: function (event) {
    this.activateTab(event.currentTarget.id);
  },

  activateTab: function(tabId) {
    $('#' + tabId).addClass("active");
    $('.' + tabId).show();
    var otherTab = "image-form-upload";
    if (tabId === "image-form-upload") {
      otherTab = "image-form-link";
    }
    $('#' + otherTab).removeClass("active");
    $('.' + otherTab).hide();
  },

  uploadAudio: function (event) {
    event.preventDefault();
    var bucket = new AWS.S3({ params: { Bucket: "demogogue"}});
    var file = document.getElementById('file-chooser').files[0];

    if (file) {
      var params = this.parseFile(file);
      var req = bucket.putObject(params, function (err, data) {
        err ? console.log(err) : console.log("Uploaded.");
      });
      // Progress Bar
      this.renderProgressBar(req);
      this.audioSuccessHandler(req);
      req.send();
      $('#demoTitle').val(file.name.replace(/\.[^/.]+$/, ""));
      $('.upload-form-form').slideUp();
      $('.demo-form').slideDown();
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

  uploadImage: function(event) {
    event.preventDefault();
    var bucket = new AWS.S3({ params: { Bucket: "demogogue"}});
    var file = document.getElementById('img-file-chooser').files[0];
    if (file) {
      var req = bucket.putObject(this.parseFile(file), function(err, data) {
        if (err) { console.log(err); };
      });
      this.imageSuccessHandler(req);
    }
  },

  imageSuccessHandler: function(request) {
    var thisView = this;
    request.on('success', function(response) {
      var imgUrl = response.request.httpRequest.stream.responseURL;
      thisView.setTempImageFromUrl({}, {url: imgUrl});
    });
  },

  getTempImgUrl: function() {
    return $('.demo-form-track-image.temp').css('background-image').replace('url(','').replace(')','');
  },

  audioSuccessHandler: function(request) {
    var newDemo = this.model;
    request.on('success', function (response) {
      $('.progress-bar').css('background-color', "#00CD00")
      .html('<div style="display:none;" id="complete">Upload Complete!</div>');
      var audioUrl = response.request.httpRequest.stream.responseURL;
      newDemo.set("audio_url", audioUrl);
      setTimeout(function() {
        $('#complete').fadeIn();
      }, 350);
    })
  },

  saveDemo: function(event) {
    this.model.set('title', $(demoTitle).val());
    this.model.save({
      success: function() {
        console.log(this.demo.get('title') + " saved");
      }
    });
    Backbone.history.navigate("#explore", true);
  }

});
