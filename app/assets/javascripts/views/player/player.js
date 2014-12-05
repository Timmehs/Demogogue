Demogogue.Views.Player = Backbone.View.extend({
  template: JST['player/player'],
  className: 'player-container',


  events: {

    "click a#volume-btn" : "toggleVolumeControl",
    "click div.title" : "showTrackInfo",
    "click span#play-btn" : "togglePlay",
  },

  initialize: function() {
    this.initializePlayer();
    this.currentSound = null;
    this.volume = 50;
    this.playing = false;
  },

  render: function() {
    if (!(this.demo)) {
      this.demo = new Demogogue.Models.Demo();
    }
    var content = this.template({ demo: this.demo, player: this });
    this.$el.html(content);
    return this;
  },

  initializePlayer: function() {
    soundManager.setup({

      flashVersion: 9, // optional: shiny features (default = 8)
      // optional: ignore Flash where possible, use 100% HTML5 mode
      flashPollingInterval          : 75,
      flashLoadTimeout              : 3000,
      debugMode                     : true,
      preferFlash: true,
      url: "/assets/soundmanager2"
    });
    soundManager.flash9Options.useEQData       = true;
    soundManager.flash9Options.useWaveformData = true;
  },

  playDemo: function(demo) {
    console.log('play');
    if (demo == this.demo) {
      console.log("abort! Same guy!");
      this.togglePlay();
    } else {
      this.playing = false;
      $('#play' + this.demo.id).removeClass("glyphicon-pause").addClass("glyphicon-play");
      if (this.currentSound) {
        this.currentSound.stop();
        soundManager.unload(this.currentSound.id);
        soundManager.destroySound(this.currentSound.id);
      }
      var newSound = soundManager.createSound({
        id: demo.get('title'),
        url: demo.get('audio_url'),
        volume: player.volume,
        autoLoad: true,
        autoPlay: false,
        usePeakData: false,
        useWaveformData: true,
        whileloading: function(response) {
          var percentage = Math.floor(this.bytesLoaded * 100);
          console.log("Buffering: " + percentage + "%");
        },
        whileplaying: function() {
          player.playing = true;
          var percentage = Math.floor(
            (this.position / this.duration) * 100);
          
          $("#player-progress").css("width", percentage + "%");
        },
        onfinish: function() {
          player.togglePlay();
          $("#player-progress").css("width", "0%");
        },

        useEQData: true,
      });
      this.demo = demo;
      this.currentSound = newSound;
      this.togglePlay();
      this.render();
    }

  },

  togglePlay: function() {
    console.log("toggling");
    var demoBtnId = "#play" + this.demo.id;
    if (this.playing) {
      this.currentSound.pause();
      $(demoBtnId).removeClass("glyphicon-pause").addClass("glyphicon-play");
      $('#play-btn').removeClass("glyphicon-pause").addClass("glyphicon-play");
    } else {
      this.currentSound.play();
      $(demoBtnId).removeClass("glyphicon-play").addClass("glyphicon-pause");
      $('#play-btn').removeClass("glyphicon-play").addClass("glyphicon-pause");
    }
    this.playing = !this.playing;
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

  pause: function() {
    this.currentSound.pause();
  },

  play: function() {
    this.currentSound.resume();
  },

  showTrackInfo: function() {
    this.demo.id && this.$el.toggleClass("active");
  },

  millisecondsToTime: function (milli) {
    var seconds = Math.floor((milli / 1000) % 60);
    var minutes = Math.floor((milli / (60 * 1000)) % 60);
    seconds = seconds < 10 ? "0" + seconds : seconds;
    return minutes + ":" + seconds;
  }








})
