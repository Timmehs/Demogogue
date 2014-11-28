Demogogue.Views.SplashPage = Backbone.View.extend({
  template: JST['splash/splash'],
  className: "splash-page",

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
