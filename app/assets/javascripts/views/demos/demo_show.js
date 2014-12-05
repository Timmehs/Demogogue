Demogogue.Views.DemoShow = Backbone.View.extend({
  template: JST['demos/show'],
  className: "demo-show",

  events: {
    "click button#show-play-btn" : "play",
    "submit form.meme" : "createComment",
  },

  initialize: function(options) {
    this.user = options.user;
    // this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.user, "sync", this.render);
    this.listenTo(this.model, "sync", this.render);
    window.demoView = this;
    this.model.fetch();
    this.user.fetch();
  },

  render: function() {
    console.log("rendering demo");
    console.log(this.user);
    var content = this.template({ demo: this.model, user: this.user });
    this.$el.html(content);
    var playSymbol = this.isPlaying() ? "glyphicon-pause" : "glyphicon-play";
    this.$("#show-play-btn span").addClass(playSymbol);
    var commentsIndex = new Demogogue.Views.CommentsIndex({
      model: this.model
    });
    this.$el.append(commentsIndex.render().$el);
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
      demo_id: this.model.id,
      user_id: CURRENT_USER,
      body: $('#comment-field').val(),
      user_avatar: currentUser.get('avatar_url')
    }, {wait: true });
    this.$('#comment-field').val("");
  },

  isPlaying: function() {
    if (player.playing) {
      return player.currentSound.id === this.model.get('title');
    }

    return false;
  }

});
