Demogogue.Collections.Stream = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/demos',
  comparator: "created_at",

  initialize: function(models, options) {
    this.user = options.user;
  }
});
