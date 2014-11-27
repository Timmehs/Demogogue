window.Demogogue = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    
    new Demogogue.Routers.Router();
    Backbone.history.start();
  }
};
