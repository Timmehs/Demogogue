Demogogue.Views.PlaylistShow = Backbone.View.extend({
  template: JST['playlists/show'],
  className: "playlist-show",

  initialize: function() {
    this.playlistLinks = this.model.links();
    this.listenTo(this.playlistLinks, "sync add remove", this.renderPlaylistDemos);
  },

  render: function() {
    var content = this.template({
      playlist: this.model,
    });
    this.$el.html(content);
    this.renderPlaylistDemos()
    return this;
  },

  renderPlaylistDemos: function() {
    var thisView = this;
    this.clearSubviews();
    _.each(this.model.demos(), function(demo) {
      var view = new Demogogue.Views.PlaylistDemo({ model: demo });
      thisView._subviews.push(view);
      thisView.$('#playlist-demos').append(view.render().$el);
    });
  },

  clearSubviews: function() {
    this.$('#playlist-demos').empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });
    this._subviews = [];
  }


});
