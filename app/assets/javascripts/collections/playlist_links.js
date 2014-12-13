Demogogue.Collections.PlaylistLinks = Backbone.Collection.extend({
  model: Demogogue.Models.PlaylistLink,
  url: 'api/playlist_links',

  initialize: function(models, options) {
    this.playlist = options.playlist;
  }
});
