Demogogue.PrepSearch = function() {


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

  var demos = Demogogue.Collections.demos.pluck('title');

  $('#typeahead').typeahead({
    hint: true,
    highlight: true,
    minLength: 1
  },
  {
    name: 'states',
    displayKey: 'value',
    source: substringMatcher(demos)
  });

  $('form#searchForm').on("submit", function(event) {
    event.preventDefault();
    console.log('form submitted');
    var demoTitle = $('#typeahead').val();
    var foundDemo = Demogogue.Collections.demos.where({title: demoTitle});
    if (foundDemo) {
      var url= "#/demo/" + foundDemo[0].id;
      Backbone.history.navigate(url, true);
    } else {
      console.log("Search result empty");
    }
  })

  $('#typeahead').on('typeahead:selected', function(event, selection) {
    $('#form#searchForm').submit();
    $('#typeahead').typeahead('setQuery', '');
  });

}
