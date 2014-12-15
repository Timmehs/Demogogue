Demogogue.Views.SplashPage = Backbone.View.extend({
  template: JST['splash/splash'],
  className: "splash-page",

  events: {
    "click a.guest" : "guestLogin"
  },

  initialize: function(options) {
    this._loaded = options.fastload;
  },

  render: function() {
    var content = this.template({demos: this.collection});
    this.$el.html(content);
    if(!this._loaded) {
      this.$el.ready(function() {
        setTimeout(function() {
          $("#splash1").fadeIn(1000, function() {
            $('#splash2').fadeIn(1000);
          });
        }, 500);
      });
    } else {
      $("#splash1").fadeIn('fast');
      $("#splash2").fadeIn('fast');
    }

    return this;
  },


  guestLogin: function() {
    this.$el.css("cursor", "wait");
    this.$('.guest').css('cursor','wait');
    $.post('/session', {'session': {'email': 'Guest', 'password' : 'password' }}, function(data) {
        location.reload()
      }
    );
  }

});
