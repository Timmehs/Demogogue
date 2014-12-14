Demogogue.Collections.Playlists = Backbone.Collection.extend({
  model: Demogogue.Models.Playlist,
  url: 'api/playlists',

  getOrFetch: function (id) {
    var playlist = this.get(id);

    if(!playlist) {
      playlist = new Demogogue.Playlist.Playlist({ id: id });
      playlist.fetch({
        success: function () {
          this.add(playlist);
        }.bind(this)
      });
    } else {
      playlist.fetch();
    }

    return playlist;
  }
});


Demogogue.Collections.playlists = new Demogogue.Collections.Playlists();
