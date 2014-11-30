Demogogue.Views.StreamView = Backbone.View.extend({
  template: JST['user/stream'],
  className: "user-stream",

  initialize: function() {
    this.collection = this.model.following();
    this.listenTo(this.collection, "sync destroy", this.refresh);
    this.listenTo(this.model, "sync", this.render);
    this._demoViews = [];
  },

  render: function() {
    user = this.model;
    collection = this.collection;
    // debugger
    console.log('render');
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.renderDemos();
    return this;
  },

  refresh: function() {
    console.log('frefres');
    this.model.fetch();
  },

  renderDemos: function() {
    console.log("render demos");
    var thisIndex = this;
    this.clearDemoViews();
    this.model.stream().each(function(demo) {
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
