Demogogue.Collections.Demos = Backbone.Collection.extend({
  model: Demogogue.Models.Demo,
  url: 'api/demos',
  
  comparator: function(m) {
    return -Date.parse(m.get('updated_at'));
  },

  getOrFetch: function (id) {
    var demo = this.get(id);

    if(!demo) {
      demo = new Demogogue.Models.Demo({ id: id });
      demo.fetch({
        success: function () {
          this.add(demo);
        }.bind(this)
      });
    } else {
      demo.fetch();
    }

    return demo;
  }
});


Demogogue.Collections.demos = new Demogogue.Collections.Demos();
