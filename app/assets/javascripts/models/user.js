Demogogue.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  stream: function() {
    if (!this._stream) {
      this._stream = new Demogogue.Collections.Stream([], { user: this })
    }

    return this._stream;
  },

  parse: function (response) {
    if (response.stream_demos) {
      this.stream().set(response.stream_demos, { parse: true });
      delete response.stream_demos;
    }

    return response;
  }

});
