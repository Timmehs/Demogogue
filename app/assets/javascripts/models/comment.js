Demogogue.Models.Comment = Backbone.Model.extend({
  urlRoot: "api/comments",

  replies: function() {
    if (!this._comments) {
      this._comments = new Demogogue.Collections.Comments([], { comment: this });
    }

    return this._comments;
  },

  parse: function (response) {
    if (response.replies) {
      // parse: true
      this.replies().set(response.replies, { parse: false });
      delete response.replies;
    }
    return response;
  }


});
