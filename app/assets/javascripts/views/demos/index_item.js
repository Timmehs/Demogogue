Demogogue.Views.DemosIndexItem = Backbone.View.extend({
  template: JST['demos/idx_item'],
  className: "demos-index-item",

  events: {
    "click button.play" : "play"
  },

  render: function() {
    var content = this.template({ demo: this.model });
    this.$el.html(content);
    return this;
  },

  play: function() {
    player.playDemo(this.model);
  }

});
