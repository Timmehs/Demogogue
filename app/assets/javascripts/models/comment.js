Demogogue.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",

  replies: function() {
    if (!this._comments) {
      this._comments = new Demogogue.Collections.Comments([], { comment: this });
    }

    return this._comments;
  },

  parse: function (blob) {
    console.log('parsing comment!');
    return blob;
  }

});
