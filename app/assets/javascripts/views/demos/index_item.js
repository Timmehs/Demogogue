Demogogue.Views.DemosIndexItem = Backbone.View.extend({
  template: JST['demos/idx_item'],
  className: "demos-index-item",

  events: {
    "click button.play" : "play",
    "click td.waveform" : "showCommentForm",
    "submit form" : "createComment",
    "click button.fol-btn" : "toggleFollow"
  },



  initialize: function(options) {
    this.user = options.user;
  },

  render: function() {
    var content = this.template({ demo: this.model, user: this.user });
    this.$el.html(content);
    var playSymbol = this.isPlaying() ? "glyphicon-pause" : "glyphicon-play";
    this.$("button.play span").addClass(playSymbol);
    return this;
  },

  play: function() {
    player.playDemo(this.model);
  },

  showCommentForm: function() {
    console.log('click');
    this.$('.comment-row').addClass("active");
  },

  createComment: function(event) {
    event.preventDefault();
    var text = this.$('#comment-field').val();
    if (text === "") { return; }
    var newComment = new Demogogue.Models.Comment({
      demo_id: this.model.id,
      user_id: CURRENT_USER,
      body: $('#comment-field').val()
    });
    newComment.save();
    this.$('#comment-field').val("");
    this.$('.waveform').append(newComment.get('body'));
  },

  toggleFollow: function() {
    console.log('follow');
  },

  isPlaying: function() {
    if (player.playing) {
      return player.currentSound.id === this.model.get('title');
    }

    return false;
  }

});
