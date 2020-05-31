// -------------------------------------------
// FEED READER PROJECT
// by Lukefest
// -------------------------------------------

// TODO
// Curation of best subreddits
// Loading placeholders
// Pagination and or lazy loading

var app = {};

// subReddit options
// gifs, funny, EarthPorn, pics, MostBeautiful, GIFextra,
// nonononoYES, ColorizedHistory, MineralPorn, CityPorn, OldSchoolCool

// Main Controls
app.subReddit = "EarthPorn";
app.postNum = 25;

// Engine / Gets images from subreddit (defined in app.subReddit)
app.doAjax = function( subReddit ) {

  $.ajax( {
    url: "https://www.reddit.com/r/" + app.subReddit + "/.json",
    dataType: "json",

    success: function (rData) {

      console.log("AJAX working...");

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

            //console.log( "Image "+i+": ",objectWithImage.images[0].source.url );
            rImages.push( objectWithImage.images[0].source.url );
            rPostLinks.push( "http://reddit.com"+rObject.data.permalink );
            rPostTitles.push( rObject.data.title );

          }

          else {

            //console.log( "GIF "+i+": ",objectWithImage.images[0].variants.gif.source.url );
            rImages.push( objectWithImage.images[0].variants.gif.source.url );
            rPostLinks.push( "http://reddit.com"+rObject.data.permalink );
            rPostTitles.push( rObject.data.title );

          }

        }

        else {
          //console.log("No image "+i);
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

// Puts images on page when called using a loop
app.redditImages = function( rImages, rPostLinks, rPostTitles, validPostsNum ) {

  $('.content').html("");

  for ( i = 0; i < validPostsNum; i++ ) {

    $('.content').append(
      '<a href="'+ rPostLinks[i] + '"> <img class="rPost_image" src="' + rImages[i] + '"> <p>'+ rPostTitles[i] +'</p> </a>'
    );

  }

};

// Document Ready load and UI input/output JS
$(document).ready(function(){

  console.log("Page (re)loaded");

  // Take whatever is in app.subReddit and put it in the form placeholder
  document.getElementById("subreddit_form_input").placeholder = app.subReddit;

  // Runs the Ajax: 
  // 1. Puts together the subReddit URL (using app.subReddit)
  // 2. Gets info from subReddit  
  // 3. Displays everything
  app.doAjax();

  // User input and outcomes 
  $( ".subreddit-form" ).submit (function () {

    // console log 
    console.log("Form submitted");
    
    // alert to test with...
    //alert( "Handler for .submit() called." );

    // Changes the subreddit
    app.subReddit = ( $( '#subreddit_form_input' ).val() );

    // Runs the Ajax: 
    // 1. Puts together the subReddit URL (using app.subReddit)
    // 2. Gets info from subReddit  
    // 3. Displays everything
    app.doAjax();
    
    //stops page from reloading
    return false;

  });

});