Demogogue.Views.Player = Backbone.View.extend({
  template: JST['player/player'],
  className: 'player-container',

  render: function() {
    var content = this.template();
    this.$el.html(content);
    return this;
  }





})
