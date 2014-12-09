Demogogue.Views.Player = Backbone.View.extend({
  template: JST['player/player'],
  className: 'player-container',


  events: {

    "click a#volume-btn" : "toggleVolumeControl",
    "click div.title" : "showTrackInfo",
    "click span#play-btn" : "togglePlay",
    "click div#back-btn" : "playPrev",
    "click div#forward-btn" : "playNext"
  },

  initialize: function() {
    this.initializePlayer();
    this.currentSound = null;
    this.volume = 50;
    this.playing = false;
    this.queue = [];
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
      preferFlash: false,
      url: "/assets/soundmanager2"
    });
    soundManager.flash9Options.useEQData       = true;
    soundManager.flash9Options.useWaveformData = true;
  },

  playDemo: function(demo) {
    console.log('play');
    this._pos = player.qPosition(demo);
    if (demo == this.demo) {
      console.log("abort! Same guy!");
      this.togglePlay();
    } else {
      this.playing = false;
      $('#play' + this.demo.id).removeClass("glyphicon-pause").addClass("glyphicon-play");
      if (this.currentSound) {
        this.currentSound.stop();
        var timeShowId = "#timeShow" + player.demo.id;
        $(timeShowId).empty();
        soundManager.unload(this.currentSound.id);
        soundManager.destroySound(this.currentSound.id);
      }
      var newSound = soundManager.createSound({
        id: demo.get('title'),
        url: demo.get('audio_url'),
        volume: player.volume,
        autoLoad: true,
        whileloading: function(response) {
          var percentage = Math.floor(this.bytesLoaded * 100);
        },


        whileplaying: function() {
          player.playing = true;
          var duration = player.millisecondsToTime(player.currentSound.duration);
          player.renderTime(player.currentSound.position, duration);
          var percentage = Math.floor(
            (this.position / this.duration) * 100);
          $("#player-progress").css("width", percentage + "%");
        },
        onfinish: function() {
          player.togglePlay();
          var timeShowId = "#timeShow" + player.demo.id;
          $(timeShowId).empty();
          $("#player-progress").css("width", "0%");
          player.playNext();
        },

        useEQData: true,
      });
      this.demo = demo;
      this.currentSound = newSound;
      var duration = player.millisecondsToTime(player.currentSound.duration);
      player.renderTime(player.currentSound.position, duration);
      this.togglePlay();
      this.render();
    }

  },

  togglePlay: function() {

    var demoBtnId = "#play" + this.demo.id;
    if (!this.currentSound) {
      this.playDemo(this.queue[0]);
      return;
    }

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
  },

  renderTime: function (milli, duration) {
    var timeShowId = "#timeShow" + player.demo.id;
    $(timeShowId).html("<span class='secs'>"+ this.millisecondsToTime(milli) + "</span>/ " + duration );
  },


  // Queue Functions
  qPosition: function(demo) {

    for (var i = 0; i < player.queue.length; i++) {
      if (player.queue[i].id === demo.id) {
        return i;
      }
    }

    return -1;
  },

  playNext: function() {
    if (player._pos > player.queue.length - 1) {
      return;
    } else {
      player.playDemo(player.queue[player._pos + 1]);
    }
  },

  playPrev: function() {
    if (player._pos === 0) {
      player.playDemo(player.queue[0]);
    } else {
      player.playDemo(player.queue[player._pos - 1]);
    }
  }
})
