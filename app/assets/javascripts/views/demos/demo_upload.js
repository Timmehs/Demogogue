Demogogue.Views.DemoUploadView = Backbone.View.extend({
  template: JST['demos/upload'],
  className: "upload-view",
  events: {
    "click button" : "click",
    "click button#cancel-btn" : "cancel"
  },

  initialize: function(options) {
    this.demo = new Demogogue.Models.Demo();
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  },

  click: function(event) {
    event.preventDefault();
    var bucket = new AWS.S3({ params: { Bucket: "demogogue"}});
    var file = document.getElementById('file-chooser').files[0];
    var params = {
      Key: file.name,
      ContentType: file.type,
      Body: file,
      ACL: 'public-read'
    };

    if (file) {
      $(".progress").show();
      var req = bucket.putObject(params, function (err, data) {
        var msg = err ? "Error" : "Uploaded.";
      });

      // Progress Bar
      var lastPercentage = 0;
      req.on('httpUploadProgress', function(progress) {
        console.log('progress');
        var percentage = Math.floor((progress.loaded / progress.total) * 100);
        if (percentage > lastPercentage) {
          lastPercentage = percentage;
          if (percentage > 10) {
            $('.progress-bar').html(percentage + "%");
          }
          $('.progress-bar').css("width", percentage + "%").val(percentage + "%");
        } else if (lastPercentage === 100) {
          $('.progress-bar').css('background-color', "green")
            .html('Upload Complete!');
          $('#cancel-upload').fadeIn();
        }

      });
      req.send();

      $('#demoTitle').val(file.name.replace(/\.[^/.]+$/, ""));


    } else {
      alert('No file selected');
    }
  },

});
