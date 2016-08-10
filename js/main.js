


// -------------------------------------------
// FEED READER PROJECT
// by Lukefest
// -------------------------------------------



// API

var app = {};

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
    	var	rImages = [];

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

      for (i = 1; i < 10; i++) {
        console.log("rImages "+i+": ",rData.data.children[i].data.preview.images[0].source.url);
        rImages.push(rData.data.children[i].data.preview.images[0].source.url);
      }


      app.redditImages(rImages);

    }

  });

};

console.log("doSomething: ", app.redditImages);

app.redditImages = function(reddit) {

  $('.images_test').append('<img class="hero_image" src="' + reddit[0] + '">');
  $('.images_test').append('<img class="hero_image" src="' + reddit[1] + '">');
  $('.images_test').append('<img class="hero_image" src="' + reddit[2] + '">');
  $('.images_test').append('<img class="hero_image" src="' + reddit[3] + '">');
  $('.images_test').append('<img class="hero_image" src="' + reddit[4] + '">');

};


// Document Ready
  $(document).ready(function(){

    $( '.date' ).text(app.yesterdaysDate);
    app.doAjax();

});
