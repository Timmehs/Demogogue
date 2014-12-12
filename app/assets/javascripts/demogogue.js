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
  AWS.config.update({accessKeyId: KEY, secretAccessKey: SEC });

  // Search Bar Listeners and Typeahead Code
  $(searchForm).on("submit", function(event) {
    event.preventDefault();
    Backbone.history.navigate("demos/" + id);
  });

  window.refreshSearch = function() {
    var substringMatcher = function(strs) {
      return function findMatches(q, cb) {
        var matches, substrRegex;

        // an array that will be populated with substring matches
        matches = [];

        // regex used to determine if a string contains the substring `q`
        substrRegex = new RegExp(q, 'i');

        // iterate through the pool of strings and for any string that
        // contains the substring `q`, add it to the `matches` array
        $.each(strs, function(i, str) {
          if (substrRegex.test(str)) {
            // the typeahead jQuery plugin expects suggestions to a
            // JavaScript object, refer to typeahead docs for more info
            matches.push({ value: str });
          }
        });

        cb(matches);
      };
    };

    window.states = Demogogue.Collections.demos.pluck('title');

    $('#typeahead-div .typeahead').typeahead({
      hint: true,
      highlight: true,
      minLength: 1
    },
    {
      name: 'states',
      displayKey: 'value',
      source: substringMatcher(window.states)
    });
    
  }


});
