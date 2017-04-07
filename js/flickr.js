jQuery(document).ready(function($) {


 var flickerAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
	
//get random words
var w1 ,w2 ,w3 = '';
$.get('https://raw.githubusercontent.com/FavianIoel/flickr-search/master/data/words.txt', function(txt) {
	console.log(txt.responseText);
    var lines = txt.responseText.split("\n");
    var randLineNum = Math.floor(Math.random() * lines.length);
    var randLineNum1 = Math.floor(Math.random() * lines.length);
    var randLineNum2 = Math.floor(Math.random() * lines.length);
    w1 = lines[randLineNum];
    w2 = lines[randLineNum1];
    w3 = lines[randLineNum2];
});
	$('#w1').html(w1);
	$('#w2').html(w2);
	$('#w3').html(w3);

	$('button').click(function(event) {
		$('button').removeClass('selected');
		$(this).addClass('selected');
		var animal = $(this).text();
		var flickrOptions = {
			tags: animal,
			format: "json"
		};
		function displayPhotos (data) {
			var photoHTML = '<ul>';
			$.each(data.items, function (i, photo) {
				photoHTML += '<li class="grid-25 tablet-grid-50">';
				photoHTML += '<a href=" ' + photo.link +'" class="image">';
				photoHTML += '<img src="' + photo.media.m + '"></a></li>';
			});
			photoHTML += '</ul>';
			$('#photos').html(photoHTML);
		}
		$.getJSON(flickerAPI, flickrOptions, displayPhotos);
	}); // endclick


$('form').submit(function (evt) {
    var $submitButton = $('#submit');
    var $searchField = $('#search');
    evt.preventDefault();
    $searchField.prop("disabled",true);
    $submitButton.attr("disabled", true).val("searching....");
    var text = $searchField.val();
    $('#photos').html('');
    $.getJSON(flickerAPI, {
        tags: text,
        format: "json"
      },
    function(data){
      var photoHTML = '<ul>';
      if (data.items.length > 0) {
        $.each(data.items,function(i,photo) {
          photoHTML += '<li class="grid-25 tablet-grid-50">';
          photoHTML += '<a href="' + photo.link + '" class="image">';
          photoHTML += '<img src="' + photo.media.m + '"></a></li>';
        }); // end each
        photoHTML += '</ul>';
      } else {
        photoHTML = "<p>No photos found that match: " + text + ".</p>"
      }
      $('#photos').html(photoHTML);
      $searchField.prop("disabled", false);
      $submitButton.attr("disabled", false).val("Search");
    }); // end getJSON

  }); // end click

}); // end ready

