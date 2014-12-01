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

$(function() {
  window.AWS.config.update({
    accessKeyId: 'AKIAILQP2ITEYRD65PCQ',
    secretAccessKey: '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',
  });
  window.AWS.config.region = 'us-west-1';
});
