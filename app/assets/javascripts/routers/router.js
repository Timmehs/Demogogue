Demogogue.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "home",
    "explore" : "index",
    "upload" : "uploadPage",
    "user/:id" : "userShow",
    "demo/:id" : "demoShow",
    "stream" : "streamPage"
  },

  initialize: function() {
    this.$rootEl = $("#main-container");
    this.demos = Demogogue.Collections.demos;
    this.demos.fetch();
    this.playlists = Demogogue.Collections.playlists;
    this.playlists.fetch();
    this.listenTo(this.demos, "sync", this.updateSearch);
    this.user = new Demogogue.Models.User({ id: CURRENT_USER });
    window.currentUser = this.user;
    if (!window.player) {
      this.player = this.initializePlayer();
      window.player = this.player;
      this.hidePlayer();
    }
    this.firstload = true;
    CURRENT_USER !== 0 && $('#home-stream-link').text("Stream");
  },

  demoShow: function(id) {
    var demoView = new Demogogue.Views.DemoShow({
      model: this.demos.getOrFetch(id),
      user: this.user
    });
    this._swapView(demoView);
  },

  home: function() {
    var $homeLink = $('#home-stream-link');
    if (CURRENT_USER === 0) {
      this.hidePlayer();
      this.splashPage();
      this._firstLoad = false;
    } else {
      this.index();
    }
  },

  index: function() {
    this.showPlayer();
    this.demos.fetch();
    this.user.id !== 0 && this.user.fetch();
    var view = new Demogogue.Views.DemosIndex({
      collection: this.demos,
      model: this.user
    });
    window.demogogueIndex = view;
    this._swapView(view);
  },

  initializePlayer: function() {
    var playerView = new Demogogue.Views.Player();
    $("html").append(playerView.render().$el);
    return playerView;
  },

  streamPage: function() {
    this.user.fetch();
    this.playlists.fetch();
    var streamView = new Demogogue.Views.StreamView({ model: this.user });
    this._swapView(streamView);
  },

  splashPage: function() {
    var splashPage = new Demogogue.Views.SplashPage({}, { fastload: !this._firstload});
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
  },

  hidePlayer: function() {
    player.$el.addClass("hidden");
  },

  showPlayer: function() {
    player.$el.removeClass("hidden");
  },

  updateSearch: function() {
    Demogogue.PrepSearch();
  }
});
