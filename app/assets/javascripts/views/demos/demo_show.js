Demogogue.Views.DemoShow = Backbone.View.extend({
  template: JST['demos/show'],
  className: "demo-show",

  events: {

  },

  initialize: function(options) {
    this.user = options.user;
    this.listenTo(this.model, "sync", this.render);
  },

  render: function() {
    console.log('render');
    var content = this.template({ demo: this.model, user: this.user });
    this.$el.html(content);
    return this;
  },

  play: function() {
    player.playDemo(this.model);
  },

  showCommentForm: function() {
    console.log('click');
    this.$('.comment-row').addClass("active");
  },

  createComment: function(event) {
    event.preventDefault();
    var text = this.$('#comment-field').val();
    if (text === "") { return; }
      var newComment = new Demogogue.Models.Comment({
        demo_id: this.model.id,
        user_id: CURRENT_USER,
        body: $('#comment-field').val()
      });
      newComment.save();
      this.$('#comment-field').val("");
      this.$('.waveform').append(newComment.get('body'));
    },

  });
