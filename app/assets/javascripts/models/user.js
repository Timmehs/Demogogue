Demogogue.Models.User = Backbone.Model.extend({
  urlRoot: "api/users",

  stream: function() {
    if (!this._stream) {
      this._stream = new Demogogue.Collections.Stream([], { user: this })
    }

    return this._stream;
  }
});
