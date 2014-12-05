Demogogue.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],
  replyTemplate: JST['comments/reply'],
  className: "comment-show",
  events: {
    "click button.reply" : "showForm",
    "submit form" : "addReply",
  },

  initialize: function() {
    this._subviews = [];
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.replies(), "add remove", this.render);
    // this.model.fetch();
  },

  render: function() {
    console.log("comment render");
    this.clearSubviews();
    var content = this.template({
      comment: this.model,
      user: currentUser,
    });
    this.$el.html(content);
    this.renderReplies();
    return this;
  },

  showForm: function() {
    this.$('div.reply-row').addClass("active");
  },

  renderReplies: function() {
    var thisView = this;
    this.model.replies().each(function(reply) {
      var content = thisView.replyTemplate({ comment: reply,
        user: currentUser });
      thisView.$('.reply-container').append(content);
    });
  },

  addReply: function(event) {
    event.preventDefault();
    console.log('add reply');
    var text = this.$('#reply-field').val();
    if (text === "") { return; }
    this.model.replies().create({
      user_id: CURRENT_USER,
      demo_id: this.model.get('demo_id'),
      body: text,
      parent_comment_id: this.model.id,
    })
  },

  clearSubviews: function() {
    this.$el.empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });

    this._subviews = [];
  },

  renderDelete: function() {
    $('')

  }

})
