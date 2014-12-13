Demogogue.Models.Playlist = Backbone.Model.extend({
  urlRoot: 'api/playlists',

  links: function() {
    if (!this._links)
      this._links = new Demogogue.Collections.PlaylistLinks([], {
        playlist: this
      });

    return this._links;
  },

  demos: function() {
    if (!this._demos) {
      this._demos = new Demogogue.Collections.Demos([], {playlist: this});
    };

    return this._demos;
  },

  parse: function(response) {
    if (response.playlist_links) {
      this.links().set(response.playlist_links, { parse: false });
      delete response.playlist_links;
    };

    if (response.demos) {
      this.demos().set(response.demos, { parse: false });
      delete response.demos;
    };

    return response;
  }

});
