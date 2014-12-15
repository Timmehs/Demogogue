Demogogue.Views.DemosIndex = Backbone.View.extend({
  template: JST['demos/index'],
  className: "demoIndexView",

  events: {
    "click .filter-link" : "filter"
  },

  initialize: function(models, options) {
    this.$demoList = this.$('#demo-list');
    this.demoViews = [];
    this.latestComments = Demogogue.Collections.comments;
    this.latestComments.fetch();
    this.listenTo(this.collection, "sync change", this.renderDemos);
    this.listenTo(this.latestComments, "sync add remove", this.renderComments);
    this.listenTo(this.model, "sync", this.renderDemos);
  },

  render: function() {
    console.log('index render');
    var content = this.template();
    this.$el.html(content);
    this.renderDemos();
    this.renderComments();
    this.$('#All').addClass('active');
    return this;
  },

  renderDemos: function() {
    var thisIndex = this;
    this.clearDemoViews();
    player.queue = Demogogue.Collections.demos.toArray();
    this.$("#demo-list").append(
      "<div id='demo-cover'><img src='assets/loader.gif'></div>"
    );
    this.collection.each(function(demo) {
      var demoView = new Demogogue.Views.DemosIndexItem({
        model: demo ,
        user: thisIndex.model
      });
      thisIndex.demoViews.push(demoView);
      thisIndex.$('#demo-list').append(demoView.render().$el);
    });
    this.$("#demo-list").waitForImages(function(){
      $("#demo-cover").fadeOut('slow');
    });
    if (this.collection.length === 0) {
      this.$('#demo-list').append("<h3 class='no-result'>No matches found :(</h3>");
    }
  },

  clearDemoViews: function() {
    this.$("#demo-list").empty();
    _.each(this.demoViews, function(view) {
      view.remove();
    });

    this.demoViews = [];
  },

  renderComments: function() {
    this.$("#comments-list").empty();
    var thisView = this;
    var template = JST['comments/feed_item'];
    var reversedComments = this.latestComments.toArray().reverse().slice(0,8);
    _.each(reversedComments, function(thisComment) {
      var content = template({ comment: thisComment });
      thisView.$("#comments-list").append(content);
    });

  },

  filter: function(event) {
    var filter = $(event.currentTarget).data('genre');
    $(".index-sidebar-list.item.active").removeClass("active");
    $("#" + filter).addClass("active");
    this.filterIndex(filter);
  },

  filterIndex: function(newFilter) {
    if (newFilter == "All") {
      this.collection = Demogogue.Collections.demos;
    } else {
      var filterResult = Demogogue.Collections.demos.where({ genre: newFilter });
      this.collection = new Backbone.Collection(filterResult);
    }

    this.renderDemos();
  }



});
