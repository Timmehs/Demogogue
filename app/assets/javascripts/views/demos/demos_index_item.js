Demogogue.Views.DemosIndex = Backbone.View.extend({
  template: JST['demos/indexitem'],
  className: "demos-index-item",

  render: function() {
    var content = this.template({ demos: this.model });
    this.$el.html(content);
    return this;
  },

});
