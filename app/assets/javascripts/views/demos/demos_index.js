Demogogue.Views.DemosIndex = Backbone.View.extend({
  template: JST['demos/index'],

  initialize: function() {
    this.$demoList = this.$('#demo-list');
    this.demoViews = [];
    this.listenTo(this.collection, "sync change", this.renderDemos);
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.renderDemos();
    return this;
  },

  renderDemos: function() {
    var thisIndex = this;
    this.clearDemoViews();
    this.$("#demo-list").html("<div class='idx-header'>Explore local sounds</div>");
    this.collection.each(function(demo) {
      var demoView = new Demogogue.Views.DemosIndexItem({ model: demo });
      thisIndex.demoViews.push(demoView);
      thisIndex.$('#demo-list').append(demoView.render().$el);
    });
  },

  clearDemoViews: function() {
    this.$demoList.empty();
    _.each(this.demoViews, function(view) {
      view.remove();
    });

    this.demoViews = [];
  }



});
