Demogogue.Collections.Demos = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/demos',
  comparator: function(m) {
    return -Date.parse(m.get('updated_at'));
  },

  getOrFetch: function() {}
});


Demogogue.Collections.demos = new Demogogue.Collections.Demos();
