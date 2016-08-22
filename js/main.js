


// -------------------------------------------
// FEED READER PROJECT
// by Lukefest
// -------------------------------------------

// TODO
// Add links to images
// Add sub-titles to images
// link up form to subreddit param
// Add loading placeholders
// Add simple pagination: link to next 25
// Add lazy load at bottom of screen


var app = {};

// subReddit options
// gifs, funny, EarthPorn, pics, MostBeautiful, GIFextra,
// nonononoYES, ColorizedHistory, MineralPorn, CityPorn
// OldSchoolCool,

app.subReddit = "EarthPorn";
// app.fullURL = "https://www.reddit.com/r/" + app.subReddit + "/.json";
app.postNum = 25;

app.doAjax = function( subReddit ) {

  $.ajax( {
    url: "https://www.reddit.com/r/" + app.subReddit + "/.json",
    dataType: "json",

    success: function (rData) {

      console.log("AJAX working...");
      console.log("Source URL:", app.fullURL);

      // Create variable object for api data
      // to hold URLs
      var	rImages = [];
      // to hold total valid URLs count
      var validPostsNum;
      // to hold links to reddit posts
      var rPostLinks = [];
      // to hold titles
      var rPostTitles = [];

      // Loop 1
      for ( i = 0; i < app.postNum; i++ ) {

        rObject = rData.data.children[i];
        objectWithImage = rObject.data.preview;
        notModPost = rObject.data.stickied === false;

        if ( objectWithImage && notModPost ) {

          if ( !("gif" in objectWithImage.images[0].variants) ) {

            console.log( "Image "+i+": ",objectWithImage.images[0].source.url );
            rImages.push( objectWithImage.images[0].source.url );
            rPostLinks.push( "http://reddit.com"+rObject.data.permalink );
            rPostTitles.push( rObject.data.title );

          }

          else {

            console.log( "GIF "+i+": ",objectWithImage.images[0].variants.gif.source.url );
            rImages.push( objectWithImage.images[0].variants.gif.source.url );
            rPostLinks.push( "http://reddit.com"+rObject.data.permalink );
            rPostTitles.push( rObject.data.title );

          }

        }

        else {
          console.log("No image "+i);
          continue;
        }

      }

      validPostsNum = (Object.keys(rImages).length);
      console.log("Valid image posts: ", validPostsNum);

      // feed object containing URLS into app object
      app.redditImages( rImages, rPostLinks, rPostTitles, validPostsNum );

    }

  });

};


// puts images etc on page when called
app.redditImages = function( rImages, rPostLinks, rPostTitles, validPostsNum ) {

  $('.content').html("");

  for ( i = 0; i < validPostsNum; i++ ) {

    $('.content').append(
      '<a href="'+ rPostLinks[i] + '"> <img class="rPost_image" src="' + rImages[i] + '"> <p>'+ rPostTitles[i] +'</p> </a>'
    );

  }

};


// changes subreddit function
app.userSubredditInput = function( event ){

	//stops page from reloading
	event.preventDefault();

  app.subReddit = ( $( '#subreddit_form_input' ).val() );

  console.log( "app.subReddit: ", app.subReddit );
  // console.log("app.subReddit: ", app.subReddit);

	app.doAjax();

};

// User input and outcomes
$( 'form' ).submit ( app.userSubredditInput );





// Document Ready
  $(document).ready(function(){

    app.doAjax();

});
