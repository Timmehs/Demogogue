Demogogue.Views.CommentsIndex = Backbone.View.extend({
  template: JST['comments/index'],
  className: "comments-index",

  initialize: function() {
    this.comments = this.model.comments();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.comments, "sync", this.render);
    this._subviews = [];
  },

  render: function() {
    this.clearSubviews();
    var thisIndex = this;
    this.comments.each(function(comment) {
      var commentView = new Demogogue.Views.CommentShow({ model: comment });
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
  }

})
