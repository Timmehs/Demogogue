Demogogue.Views.PlaylistIndex = Backbone.View.extend({

  template: JST['playlists/index'],
  className: "playlist-index",

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.refresh);
  },


  render: function() {
    this.clearSubviews();
    var content = this.template();
    this.$el.html(content);
    this.renderPlaylists();
    return this;
  },

  renderPlaylists: function() {
    var thisIndex = this;
    this.collection.each(function(playlist) {
      var view = new Demogogue.Views.PlaylistShow({ model: playlist});
      thisIndex._subviews.push(view);
      thisIndex.$el.append(view.render().$el);
    });
  },

  clearSubviews: function() {
    this.$el.empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });

    this._subviews = [];
  },

});
