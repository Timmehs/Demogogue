Demogogue.Views.PlaylistShow = Backbone.View.extend({
  template: JST['playlists/show'],
  className: "playlist-show",

  initialize: function() {
    this.collection = this.model.demos();
    this.playlistLinks = this.model.links();
    this.listenTo(this.playlistLinks, "sync add remove", this.render);
  },

  render: function() {
    console.log(this.model.get('title') + " render");
    var content = this.template({
      playlist: this.model,
      demos: this.collection
    });
    this.$el.html(content);
    return this;
  }


});
