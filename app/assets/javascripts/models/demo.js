Demogogue.Models.Demo = Backbone.Model.extend({
  urlRoot: "api/demos",

  comments: function() {
    if (!this._comments) {
      this._comments = new Demogogue.Collections.Comments([], { demo: this });
    }
    return this._comments;
  },

  parse: function (response) {
    if (response.comments) {
      // parse: true
      this.comments().set(response.comments, { parse: true });
      delete response.comments;
    }

    return response;
  }

});


Demogogue.Models.Demo.GENRES = [
    "Classical", "House", "Electronic", "Blues", "Rock", "Country", "Ambient",
    "Metal", "Hardcore", "Hiphop", "Punk", "Folk", "Bluegrass",
    "Jazz", "Darkwave", "Grindcore", "Pop"];
