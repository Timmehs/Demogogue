Demogogue.Views.DemosIndexItem = Backbone.View.extend({
  template: JST['demos/idx_item'],
  className: "demos-index-item",

  render: function() {
    var content = this.template({ demo: this.model });
    this.$el.html(content);
    return this;
  },

});
