Demogogue.Collections.Comments = Backbone.Collection.extend({
  model: Demogogue.Models.Comment,
  url: 'api/comments',

  comparator: function(m) {
    return Date.parse(m.get('created_at'));
  },

  initialize: function(models, options) {
    if (options) {
      this.demo = options.user,
      this.comment = options.comment
    }
  },

  getOrFetch: function(id) {
    var comment = this.get(id);

    if (comment) {
      comment.fetch();
    } else {
      comment = new Demogogue.Models.Comment({ id: id });
      comment.fetch({
        success: function() {
          this.add(comment);
        }.bind(this)
      });
    }

    return comment;
  },

  reverse: function() {
    return newCollect;
  }
});


Demogogue.Collections.comments = new Demogogue.Collections.Comments();
