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
      var demo = Demogogue.Collections.demos.get(link.get('demo_id'));
      var view = new Demogogue.Views.PlaylistDemo({ model: demo });
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
