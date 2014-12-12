Demogogue.Views.DemosIndex = Backbone.View.extend({
  template: JST['demos/index'],
  className: "demoIndexView",

  events: {
    "click .filter-link" : "filter"
  },

  initialize: function(models, options) {
    this.$demoList = this.$('#demo-list');
    this.demoViews = [];
    this.listenTo(this.collection, "sync change", this.renderDemos);
    this.listenTo(this.model, "sync", this.renderDemos);
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
    console.log("Demos rendered (sync?)");
    player.queue = Demogogue.Collections.demos.toArray();
    this.$("#demo-list").html("<div class='idx-header'>Explore local sounds</div>");
    this.collection.each(function(demo) {
      var demoView = new Demogogue.Views.DemosIndexItem({
        model: demo ,
        user: thisIndex.model
      });
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
  },

  filter: function(event) {
    var filter = $(event.currentTarget).data('genre');
    this.filterIndex(filter);
  },

  filterIndex: function(newFilter) {
    var filterResult = Demogogue.Collections.demos.where({ genre: newFilter });
    this.collection = new Backbone.Collection(filterResult);
    this.render();
  }



});
