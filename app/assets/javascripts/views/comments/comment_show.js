Demogogue.Views.CommentShow = Backbone.View.extend({
  template: JST['comments/show'],
  replyTemplate: JST['comments/reply'],
  className: "comment-show",
  events: {
    "click button.reply" : "showForm",
    "submit form.comment-form" : "addReply",
    "click button.delete" : "deleteComment"
  },

  initialize: function(options) {
    this._subviews = [];
    this.parentIndex = options.parentIndex;
    this.demo = Demogogue.Collections.demos.get(this.model.get('demo_id'));
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.replies(), "add remove", this.render);
  },

  render: function() {
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
    this.$('#reply-field').focus();
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


    var text = this.$('#reply-field').val();
    if (text === "") { return; }
    this.model.replies().create({
      user_id: CURRENT_USER,
      demo_id: this.model.get('demo_id'),
      body: text,
      parent_comment_id: this.model.id,
      user_avatar: currentUser.get('avatar_url'),
      author: currentUser.get('username')
    }, {wait: true});
  },

  clearSubviews: function() {
    this.$el.empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });

    this._subviews = [];
  },

  deleteComment: function(event) {
    event.preventDefault();
    var thisView = this;
    var commentId = $(event.currentTarget).data('id');

    if (commentId === this.model.id) {
      this.model.destroy({
        success: function() {
          thisView.remove();
        }
      });
    } else {
      var comment = this.model.replies().get(commentId);
      comment.destroy({
        success: function() {
          thisView.replies().remove(comment.id);
        }
      });
    }

    this.parentIndex.render();
  }

})
