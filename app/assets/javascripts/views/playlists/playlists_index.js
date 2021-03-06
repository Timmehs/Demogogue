Demogogue.Views.PlaylistIndex = Backbone.View.extend({

  template: JST['playlists/index'],
  className: "playlist-index",

  events: {
    "click div.delete-row" : "confirmRemovePlaylist"
  },

  initialize: function() {
    this.listenTo(this.collection, "sync add remove", this.render);
  },

  removePlaylist: function(id) {
    this.collection.get(id).destroy();
  },

  confirmRemovePlaylist: function(event) {
    var playlistId = $(event.target).data('id');
    var thisView = this;
    $("#delete-dialog").dialog({
      resizable: false,
      height: 150,
      modal: true,
      closeText: 'hide',
      buttons: {
        "Delete playlist": function() {
          thisView.removePlaylist(playlistId);
          $(this).dialog( "close" );
        },
        Cancel: function() {
          $(this).dialog("close");
        }
      }
    });
  },

  render: function() {
    var content = this.template();
    this.$el.html(content);
    this.renderPlaylists();
    return this;
  },

  renderPlaylists: function() {
    var thisIndex = this;
    this.clearSubviews();
    this.collection.each(function(playlist) {
      var view = new Demogogue.Views.PlaylistShow({ model: playlist});
      thisIndex._subviews.push(view);
      thisIndex.$('.playlist-list').append(view.render().$el);
    });
  },

  clearSubviews: function() {
    this.$('.playlist-list').empty();
    _.each(this._subviews, function(view) {
      view.remove();
    });

    this._subviews = [];
  },

});
