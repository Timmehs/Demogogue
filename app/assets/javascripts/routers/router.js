Demogogue.Routers.Router = Backbone.Router.extend({
  routes: {
    "" : "index",
    "user/:id" : "userShow",
    "demo/:id" : "demoShow",

  }



})
