Demogogue.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "home",
    "explore" : "index",
    "user/:id" : "userShow",
    "demo/:id" : "demoShow",
  },

  initialize: function() {
    this.$rootEl = $("#main-container");
    this.demos = Demogogue.Collections.demos;
  },


  index: function() {
    this.demos.fetch();
    var view = new Demogogue.Views.DemosIndex({ collection: this.demos });
    this._swapView(view);
  },

  home: function() {
    var $homeLink = $('#home-stream-link')
    if (CURRENT_USER === 0) {
      $homeLink.text("Home");
      this.splashPage();
    } else {
      $homeLink.text("Stream");
      this.streamPage();
    }
  },
  
  streamPage: function() {
    this.splashPage();
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
