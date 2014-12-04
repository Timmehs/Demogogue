Demogogue.Collections.Comments = Backbone.Collection.extend({
  model: Demogogue.Models.Comment,
  url: 'api/comments',

  comparator: function(m) {
    return -Date.parse(m.get('created_at'));
  },

  initialize: function(models, options) {
    this.demo = options.user;
  }
});
