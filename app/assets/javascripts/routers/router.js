Demogogue.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "index",
    "user/:id" : "userShow",
    "demo/:id" : "demoShow",
  },

  initialize: function() {
    this.$rootEl = $("#main-container");
    this.demos = Demogogue.Collections.demos;
  },

  index: function() {
    var view = new Demogogue.Views.DemosIndex({ collection: this.demos });
    this.$rootEl.html(view.render().$el);
  }
})
