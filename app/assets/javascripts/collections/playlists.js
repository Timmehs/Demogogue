Demogogue.Collections.Playlists = Backbone.Collection.extend({
  model: Demogogue.Models.Playlist,
  url: 'api/playlists',

  initialize: function(models, options) {
    this.user = options.user;
  }

});
