Demogogue.Models.Demo = Backbone.Model.extend({
  urlRoot: "api/demos",

  comments: function() {
    if (!this._comments) {
      this._comments = new Demogogue.Collections.Comments([], { demo: this });
    }

    return this._comments;
  }

});


Demogogue.Models.Demo.GENRES = [
    "Classical", "House", "Rock", "Country", "Ambient",
    "Metal", "Hiphop", "Folk", "Bluegrass",
    "Jazz", "Darkwave", "Grindcore", "Pop"];
