Demogogue.Collections.Demos = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/demos'

});


Demogogue.Collections.demos = new Demogogue.Collections.Demos();
