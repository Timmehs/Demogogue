Demogogue.Views.PlaylistDemo = Backbone.View.extend({
  template: JST['playlists/demo'],
  className: "playlist-demo",

  events: {
    "click span#link-delete" : "removePlaylistDemo"
  },

  render: function() {
    var thisDemo = Demogogue.Collections.demos.get(this.model.get('demo_id'));
    this.$el.addClass("pl-demo" + thisDemo.id);
    var content = this.template({ demo: thisDemo });
    this.$el.html(content);
    return this;
  },

  removePlaylistDemo: function() {
    this.model.destroy(); // Delete this playlistlink
  }


});
