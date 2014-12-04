Demogogue.Collections.Stream = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/stream',

  comparator: function(m) {
    return -Date.parse(m.get('updated_at'));
  },

  initialize: function(models, options) {
    this.user = options.user;
  }
});
