


// -------------------------------------------
// FEED READER PROJECT
// by Lukefest
// -------------------------------------------

// gifs, funny, EarthPorn, gaming,

// API

var app = {};

//Options:  gifs, funny, EarthPorn, pics, MostBeautiful,GIFextra,HybridAnimals,nonononoYES,
app.subReddit = "Politics";
app.postNum = 25;
app.fullURL = "https://www.reddit.com/r/" + app.subReddit + "/.json";

console.log("Source subreddit URL:", app.fullURL);

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

      console.log("AJAX working...");

      // Create variable object for api data
      // to hold URLs
      var	rImages = [];
      // to hold URL count
      var validPostsNum;

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
          console.log("NOT IMAGE: "+i);
          continue;
        }

      }

      validPostsNum = (Object.keys(rImages).length);
      console.log("Valid image posts: ", validPostsNum);

      // feed object containing URLS into app object
      app.redditImages( rImages, validPostsNum );

    }

  });

};



app.redditImages = function( rImages, validPostsNum ) {

  for ( i = 0; i < validPostsNum; i++ ) {
    $('.images_test').append('<img class="hero_image" src="' + rImages[i] + '">');
  }

};


// Document Ready
  $(document).ready(function(){

    app.doAjax();
    $( '.date' ).text(app.date);

});
