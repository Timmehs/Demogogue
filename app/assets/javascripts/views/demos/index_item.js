Demogogue.Views.DemosIndexItem = Backbone.View.extend({
  template: JST['demos/idx_item'],
  className: "demos-index-item",

  events: {
    "click button.play" : "play",
    "click button.comment-btn" : "showCommentForm",
    "submit form" : "createComment",
    "click button.fol-btn" : "toggleFollow",
    "click button#playlist-btn" : "renderPlaylistModal",
  },



  initialize: function(options) {
    this.user = options.user;
  },

  render: function() {
    var content = this.template({
      following: this.isFollowing(),
      demo: this.model,
      user: this.user
    });
    this.$el.html(content);
    var playSymbol = this.isPlaying() ? "glyphicon-pause" : "glyphicon-play";
    this.$("button.play span").addClass(playSymbol);
    var thisView = this;
    this.$('td.artwork').waitForImages(function() {
      thisView.$("#loader").hide();
      thisView.$('#trackArt').show();
    });
    return this;
  },

  renderPlaylistModal: function() {
    var thisView = this;
    var modalPlaylistsTemplate = JST['playlists/show_modal'];
    $('#add-to-playlist').empty();
    Demogogue.Collections.playlists.each(function(list) {
      var content = modalPlaylistsTemplate({
        playlist: list,
        demo: thisView.model
      });
      $('#add-to-playlist').append(content);
    });
    $('#playlist-title-field').attr('data-demo-id', this.model.id);
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
    Demogogue.Collections.comments.create({
      user_id: CURRENT_USER,
      username: currentUser.get('username'),
      demo_title: this.model.get('title'),
      body: text,
      demo_id: this.model.id
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
        "<span class='glyphicon glyphicon-star'></span>Following"
      );
    }
  },

  isPlaying: function() {
    if (player.playing) {
      return player.currentSound.id === this.model.get('title');
    }
    return false;
  },

  isFollowing: function () {
    var artistId = this.model.get('artist_id');
    if (currentUser.following().where({artist_id: artistId}).length > 0) {
      return true;
    } else {
      return false;
    }
  },


});
