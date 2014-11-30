Demogogue.Collections.Demos = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/demos',

  getOrFetch: function() {}
});


Demogogue.Collections.demos = new Demogogue.Collections.Demos();
