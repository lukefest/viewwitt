


// -------------------------------------------
// FEED READER PROJECT
// by Lukefest
// -------------------------------------------



// API

var app = {};

app.postNum = 23;

app.yesterdaysDate = function() {

  var d = new Date();

  d.setDate(d.getDate()); // <-- add this

  var day = d.getDate();
  var month = d.getMonth()+1;
  var year = d.getFullYear();

  return day + "/" + month + "/" + year;

};

app.doAjax = function() {

  // uses constructed URL (weatherUrl) to get weather data
  $.ajax( {
    url: "https://www.reddit.com/top/.json",
    dataType: "json",

    success: function (rData) {

      // Create variable object for api data
      // var imagesExist; // truthy or falsy
      // var bestImageURL; // gets best version of URL
      var	rImages = []; // contains all URLs

      // individual image print test
    	// console.log("image 1: ", rData.data.children[1].data.preview.images[0].source.url);

      // working loop that prints
      // for (i = 1; i < 21; i++) {
      //   console.log("loop "+i+": ", rData.data.children[i].data.preview.images[0].source.url);
      // }

      //Working FOR loop that stops where no image exists
      // for (i = 1; i < 10; i++) {
      //   rImages.push(rData.data.children[i].data.preview.images[0].source.url);
      // }

      console.log( "redditImages 1: ", app.redditImages );


      // Loop 1
      for ( i = 0; i < app.postNum; i++ ) {

        objectWithImage = rData.data.children[i].data.preview;
        var url;

        if ( objectWithImage ) {

          if ( !("gif" in objectWithImage.images[0].variants) ) {

            console.log( "Image "+i+": ",objectWithImage.images[0].source.url );
            rImages.push( objectWithImage.images[0].source.url );

          }

          else {

            console.log( "GIF "+i+": ",objectWithImage.images[0].variants.gif.source.url );
            rImages.push( objectWithImage.images[0].variants.gif.source.url );

          }


        }

        // else if ( objectWithImage && "gif" in objectWithImage ) {
        //
        //   console.log( "GIF "+i+": ",objectWithImage.images[0].variants.gif.source.url );
        //   rImages.pop();
        //   rImages.push( objectWithImage.images[0].variants.gif.source.url );
        //
        // }




        // else {
        //   continue;
        // }

      }





      // app.bestImageURL = function(postObject) {
      //
      //   console.log( "postObject: ",postObject );
      //
      //   if ("gif" in postObject) {
      //     return postObject.images[0].variants.gif.source.url;
      //   }
      //
      //   else {
      //     return postObject.images[0].source.url;
      //   }
      //
      // };
      //
      //
      // // Loop 2
      // for ( i = 0; i < app.postNum; i++ ) {
      //
      //   imagesExist = rData.data.children[i].data.preview;
      //   console.log( "imagesExist: ",imagesExist );
      //
      //   if ( imagesExist ) {
      //
      //     app.bestImageURL( imagesExist );
      //
      //     console.log( "rImages "+i+": ",app.bestImageURL );
      //
      //     rImages.push( app.bestImageURL );
      //
      //   }
      //
      //   else {
      //
      //     continue;
      //
      //   }
      //
      // }

      console.log( "rImages: ", rImages );
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

    $( '.date' ).text(app.yesterdaysDate);
    app.doAjax();

});
