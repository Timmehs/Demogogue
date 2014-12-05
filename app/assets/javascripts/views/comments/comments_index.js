Demogogue.Views.CommentsIndex = Backbone.View.extend({
  template: JST['comments/index'],
  className: "comments-index",

  initialize: function() {
    this.comments = this.model.comments();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.comments(), "add remove reset", this.render);
    this._subviews = [];
    window.comments = this.comments;
  },

  render: function() {
    this.clearSubviews();
    var thisIndex = this;
    this.commentCount();
    var header = this.template({
      comments: this.comments,
      commentCount: this.commentCount()
    });
    this.$el.html(header);
    this.model.comments().each(function(comment) {
      var commentView = new Demogogue.Views.CommentShow({ model: comment,
        parentIndex: thisIndex });
      thisIndex.$el.append(commentView.render().$el);
      thisIndex._subviews.push(commentView);
    })
    return this;
  },

  clearSubviews: function() {
    this.$el.empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });

    this._subviews = [];
  },

  commentCount: function() {
    var count = 0;
    this.comments.each(function(comment){
      count += comment.replies().length + 1;
    });
    console.log("Comment count: " + count);
    return count;
  }

})
