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
    if(!this._demos || this._demos.length < this._links.length) {
      var demos = this._demos = [];
      this.links().each(function(link) {
        demos.push(Demogogue.Collections.demos.get(link.get('demo_id')));
      });
    }

    return this._demos;
  },

  parse: function(response) {
    if (response.playlist_links) {
      this.links().set(response.playlist_links, { parse: false });
      delete response.playlist_links;
    };

    return response;
  }

});
