Demogogue.Views.Player = Backbone.View.extend({
  template: JST['player/player'],
  className: 'player-container',


  events: {
    "click" : "loadPlayer",
    "click a#volume-btn" : "toggleVolumeControl",
  },

  initialize: function() {
    this.initializePlayer();
    this.currentSound = null;
    this.volume = 50;
  },


  render: function() {
    if (!(this.demo)) {
      this.demo = new Demogogue.Models.Demo();
    }
    var content = this.template({ demo: this.demo });
    this.$el.html(content);
    return this;
  },

  initializePlayer: function() {
    soundManager.setup({
      url: '/swf',
      flashVersion: 9,
    });
  },

  playDemo: function(demo) {
    console.log('play');
    if (demo.get('title') == this.currentSound)
    this.currentSound && this.currentSound.stop();
    this.currentSound && this.currentSound.destruct();
    var newSound = soundManager.createSound({
      id: demo.get('title'),
      url: demo.get('audio_url'),
      volume: player.volume,
      autoLoad: true,
      autoPlay: true,
      useEQData: true,
      useWaveformData: true,
      whileloading: function(response) {
        var percentage = Math.floor(this.bytesLoaded * 100);
        console.log("Buffering: " + percentage + "%");
      },
      whileplaying: function() {
        var percentage = Math.floor(
          (this.position / this.duration) * 100);
        $("#player-progress").css("width", percentage);
      }

    });
    this.demo = demo;
    this.render();
    this.currentSound = newSound;
  },

  toggleVolumeControl: function() {
    var thisView = this;

    this.$("#vol-popup").toggleClass("active");
    this.$('#slider-vertical').slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 100,
      value: player.volume,
      slide: function(event, ui) {
        console.log(ui.value);
        player.volume = ui.value;
        if (player.currentSound) {
          player.currentSound.setVolume(ui.value);
        }
      }
    });

  },


  millisecondsToTime: function (milli) {
    var seconds = Math.floor((milli / 1000) % 60);
    var minutes = Math.floor((milli / (60 * 1000)) % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }








})
