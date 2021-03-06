Demogogue.Views.StreamView = Backbone.View.extend({
  template: JST['user/stream'],
  className: "user-stream",

  initialize: function() {
    this.collection = this.model.following();
    this.stream = this.model.stream();
    this.listenTo(this.stream, "sync", this.refresh);
    this.listenTo(this.collection, "sync destroy", this.refresh);
    this.listenTo(this.model, "sync", this.render);
    this._demoViews = [];
  },

  render: function() {
    user = this.model;
    collection = this.collection;
    var content = this.template({ user: this.model });
    this.$el.html(content);
    this.renderDemos();
    this.renderPlaylists();
    player.queue = currentUser.stream().toArray();
    return this;
  },

  renderPlaylists: function() {
    var playlistView = new Demogogue.Views.PlaylistIndex({
      collection: Demogogue.Collections.playlists
    });

    Demogogue.Collections.playlists.fetch();
    this.$('#playlist-container').html(playlistView.render().$el);
  },

  refresh: function() {
    this.model.fetch();
  },

  renderDemos: function() {
    var thisIndex = this;
    this.clearDemoViews();
    this.$("#stream-list").append(
      "<div id='demo-cover'><img src='assets/loader.gif'></div>" +
      "<div class='stream-header'><h2>My Stream</h2></div>"
    );
    this.model.stream().each(function(demo) {
      var demoView = new Demogogue.Views.DemosIndexItem({
        model: demo,
        user: thisIndex.model
      });
      thisIndex._demoViews.push(demoView);
      thisIndex.$('#stream-list').append(demoView.render().$el);
    });
    this.$("#stream-list").waitForImages(function(){
      $("#demo-cover").fadeOut('slow');
    });
  },

  clearDemoViews: function() {
    this.$('#stream-list').empty();
    _.each(this.demoViews, function(view) {
      view.remove();
    });

    this._demoViews = [];
  }

});
