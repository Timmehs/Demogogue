Demogogue.Collections.Follows = Backbone.Collection.extend({
  model: Demogogue.Models.ArtistFollow,
  url: 'api/artist_follows',

  initialize: function(models, options) {
    this.user = options.user;
  }
});
