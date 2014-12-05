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
    this.renderFollowBtn(!this.isFollowing(this.model.get('artist_id')));
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
    this.model.comments().create({
      user_id: CURRENT_USER,
      body: $('#comment-field').val()
    }, { wait: true });
    this.$('#comment-field').val("");

  },

  toggleFollow: function() {
    var artistId = this.model.get('artist_id');
    var thisView = this;
    thisView.renderFollowBtn(this.isFollowing(artistId));

    if (this.isFollowing(artistId)) {
      currentUser.following().where({ artist_id: artistId })[0].destroy();
    } else {
      currentUser.following().create({artist_id: artistId});
    }
  },

  renderFollowBtn: function(unfollow) {
    var artistFollowBtn = ".fol-btn" + this.model.get('artist_id');
    if(unfollow) {

      $('.fol-btn' + this.model.get('artist_id')).html(
        "<span class='glyphicon glyphicon-star-empty'></span>Follow Artist"
      );
    } else {
      $('.fol-btn' + this.model.get('artist_id')).html(
        "<span class='glyphicon glyphicon-star'></span><b>Following</b>"
      )
    }
  },

  isPlaying: function() {
    if (player.playing) {
      return player.currentSound.id === this.model.get('title');
    }
    return false;
  },

  isFollowing: function (artistId) {
    if (currentUser.following().where({artist_id: artistId}).length > 0) {
      return true;
    } else {
      return false;
    }
  }

});
