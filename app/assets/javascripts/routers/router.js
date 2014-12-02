Demogogue.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "home",
    "explore" : "index",
    "upload" : "uploadPage",
    "user/:id" : "userShow",
    "demo/:id" : "demoShow",
  },

  initialize: function() {
    this.$rootEl = $("#main-container");
    this.demos = Demogogue.Collections.demos;
    this.user = new Demogogue.Models.User({ id: CURRENT_USER });
    this.player = this.initializePlayer();
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

  index: function() {
    this.demos.fetch();
    var view = new Demogogue.Views.DemosIndex({ collection: this.demos });
    this._swapView(view);
  },

  initializePlayer: function() {
    var playerView = new Demogogue.Views.Player();
    $("html").append(playerView.render().$el);
    return playerView;
  },

  streamPage: function() {
    this.user.fetch();
    var streamView = new Demogogue.Views.StreamView({ model: this.user });
    this._swapView(streamView);
  },

  splashPage: function() {
    var splashPage = new Demogogue.Views.SplashPage();
    this._swapView(splashPage);
  },

  uploadPage: function() {
    if (CURRENT_USER === 0) {
      alert("Sign up or sign in to share your music!");
    } else {
      var uploadView = new Demogogue.Views.DemoUploadView();
      this._swapView(uploadView);
    }
  },


  _swapView: function(view) {
    this._currentView && this._currentView.remove();
    this.$rootEl.html(view.render().$el);
    this._currentView = view;
  }
});
