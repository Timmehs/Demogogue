Demogogue.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  stream: function() {
    if (!this._stream) {
      this._stream = new Demogogue.Collections.Stream([], { user: this })
    }

    return this._stream;
  },

  following: function() {
    if (!this._following) {
      this._following = new Demogogue.Collections.Follows([], { user: this })
    }

    return this._following;
  },

  parse: function (response) {
    if (response.stream_demos) {
      this.stream().set(response.stream_demos, { parse: true });
      delete response.stream_demos;
    }
    if (response.artist_follows) {
      this.following().set(response.artist_follows, { parse: true });
      delete response.artist_follows;
    }

    return response;
  }

});
