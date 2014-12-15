

$(document).ready(function () {

  $("#btn-register").click(function(event) {
    $('#signin-dropdown').removeClass('open');
  });

  $('div#add-to-playlist').on("click", function(event) {
    var id = $(event.target).data('id');
    var demoId = $(event.target).data('demo-id');
    var playlist = Demogogue.Collections.playlists.get(id);
    playlist.links().create({
      demo_id: demoId,
      playlist_id: id
    });
    $(playlistModal).attr('aria-hidden', 'true').removeClass('in');
  });

  $("#playlist-title-field").keyup(function(e) {
    e.preventDefault();
    if (e.keyCode == 13) {
      var playlistTitle = $(e.target).val();
      var demoId = $(e.target).data('demo-id');
      if (playlistTitle !== "") {
        var newList = Demogogue.Collections.playlists.create({
            title: playlistTitle
        }, {
          wait: true,
          success: function() {
            newList.links().create({ demo_id: demoId, playlist_id: newList.id });
          }
        });

        $(playlistModal).attr('aria-hidden', 'true').removeClass('in');
      } else {
        $('#warning-box').html("Playlist name can't be blank!");
        $('#warning-box').slideDown();
        setTimeout(function(){
          $("#warning-box").fadeOut(1400);
        }, 3000);
      }

    }


  });

});
