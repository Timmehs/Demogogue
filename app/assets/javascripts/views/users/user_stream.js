Demogogue.Views.StreamView = Backbone.View.extend({
  template: JST['user/stream'],
  className: "user-stream",

  initialize: function() {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.collection, "sync add remove", this.render);
    this._demoViews = [];
  },

  render: function() {
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.renderDemos();
    return this;
  },

  renderDemos: function() {
    var thisIndex = this;
    this.clearDemoViews();
    this.collection.each(function(demo) {
      var demoView = new Demogogue.Views.DemosIndexItem({ model: demo });
      thisIndex._demoViews.push(demoView);
      thisIndex.$('#stream-list').append(demoView.render().$el);
    });
  },

  clearDemoViews: function() {
    this.$('#stream-list').empty();
    _.each(this.demoViews, function(view) {
      view.remove();
    });

    this._demoViews = [];
  }

});
