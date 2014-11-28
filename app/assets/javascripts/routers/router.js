Demogogue.Routers.Router = Backbone.Router.extend({
  routes: {
    "explore" : "index",
    "home" : "splashPage",
    "user/:id" : "userShow",
    "demo/:id" : "demoShow",
  },

  initialize: function() {
    this.$rootEl = $("#main-container");
    this.demos = Demogogue.Collections.demos;
  },

  index: function() {
    if (CURRENT_USER === 0) {
      console.log("signed out");
      Backbone.history.navigate("home", true);
    } else {
      console.log("signed in");
    }
    var view = new Demogogue.Views.DemosIndex({ collection: this.demos });
    this.$rootEl.html(view.render().$el);
  },

  splashPage: function() {
    var splashPage = new Demogogue.Views.SplashPage();
    this._swapView(splashPage);
  },

  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});
