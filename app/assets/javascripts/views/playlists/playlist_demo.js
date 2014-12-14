Demogogue.Views.PlaylistDemo = Backbone.View.extend({
  template: JST['playlists/demo'],
  className: "playlist-demo",

  render: function() {
    var content = this.template({ demo: this.model });
    this.$el.html(content);
    return this;
  },


});
