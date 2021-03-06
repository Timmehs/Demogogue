Demogogue.Views.PlaylistShow = Backbone.View.extend({
  template: JST['playlists/show'],
  className: "playlist-show",

  events: {
    "click #playlist-play" : "playThis"
  },

  initialize: function() {
    this.playlistLinks = this.model.links();
    this.listenTo(this.playlistLinks, "sync add remove", this.renderPlaylistDemos);
  },

  playThis: function() {
    console.log("teehee");
    player.queue = this.model.demos();
    player.playDemo(player.queue[0]);
  },

  render: function() {
    var content = this.template({
      playlist: this.model,
    });
    this.$el.html(content);
    this.renderPlaylistDemos()
    return this;
  },

  renderPlaylistDemos: function() {
    var thisView = this;
    this.clearSubviews();
    this.playlistLinks.each(function(link) {
      var view = new Demogogue.Views.PlaylistDemo({ model: link });
      thisView._subviews.push(view);
      thisView.$('#playlist-demos').append(view.render().$el);
    });
    this.$('#playlist-demos').append(
      "<div data-id='" + this.model.id + "' class='playlist-demo delete-row'>" +
      "Delete Playlist <span id='playlist-destroy' class='glyphicon glyphicon-trash'>" +
      "</span></div>"
    );
  },

  clearSubviews: function() {
    this.$('#playlist-demos').empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });
    this._subviews = [];
  }


});
