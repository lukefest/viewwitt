


// -------------------------------------------
// FEED READER PROJECT
// by Lukefest
// -------------------------------------------

// gifs, funny, EarthPorn, gaming,

// API

var app = {};

//Options:  gifs, funny, EarthPorn, pics, MostBeautiful,GIFextra,HybridAnimals,nonononoYES,
app.subReddit = "marvel";
app.postNum = 25;
app.fullURL = "https://www.reddit.com/r/" + app.subReddit + "/.json";

console.log(app.fullURL);

app.date = function() {

  var d = new Date();

  d.setDate(d.getDate()); // <-- add this

  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();

  return day + "/" + month + "/" + year;

};

app.doAjax = function(fullURL) {

  $.ajax( {
    url: app.fullURL,
    dataType: "json",

    success: function (rData) {

      console.log("AJAX works");

      // Create variable object for api data
      var	rImages = []; // contains all URLs

      // Loop 1
      for ( i = 0; i < app.postNum; i++ ) {

        rObject = rData.data.children[i];
        objectWithImage = rObject.data.preview;
        notModPost = rObject.data.stickied === false;

        if ( objectWithImage && notModPost ) {

          if ( !("gif" in objectWithImage.images[0].variants) ) {

            console.log( "Image "+i+": ",objectWithImage.images[0].source.url );
            rImages.push( objectWithImage.images[0].source.url );

          }

          else {

            console.log( "GIF "+i+": ",objectWithImage.images[0].variants.gif.source.url );
            rImages.push( objectWithImage.images[0].variants.gif.source.url );

          }

        }

        else {
          continue;
        }

      }

      app.redditImages( rImages );

    }

  });

};

console.log( "redditImages 2: ", app.redditImages );

app.redditImages = function( reddit ) {

  for ( i = 0; i < app.postNum; i++ ) {
    $('.images_test').append('<img class="hero_image" src="' + reddit[i] + '">');
  }

};


// Document Ready
  $(document).ready(function(){

    app.doAjax();
    $( '.date' ).text(app.date);

});
