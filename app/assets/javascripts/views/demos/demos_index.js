Demogogue.Views.DemosIndex = Backbone.View.extend({
  template: JST['demos/index'],

  render: function() {
    var content = this.template({demos: this.collection});
    this.$el.html(content);
    this.renderDemos();
    return this;
  },

  renderDemos: function() {
    _.each(this.collection, function(demo) {
      var content = new Demogogue.Views.DemoShow({ model: demo });
    });

  }



});
