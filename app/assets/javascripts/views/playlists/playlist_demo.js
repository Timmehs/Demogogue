Demogogue.Views.PlaylistDemo = Backbone.View.extend({
  template: JST['playlists/demo'],
  className: "playlist-demo",

  events: {
    "click span#link-delete" : "removePlaylistDemo"
  },

  render: function() {
    this.$el.addClass("pl-demo" + this.model.id);
    var content = this.template({ demo: this.model });
    this.$el.html(content);
    return this;
  },

  removePlaylistDemo: function() {
    this.model.destroy(); // Delete this playlistlink
  }


});
