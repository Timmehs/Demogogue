Demogogue.Collections.Stream = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/demos',
  comparator: function(m) {
    return -Date.parse(m.get('updated_at'));
  },

  initialize: function(models, options) {
    this.user = options.user;
  }
});
