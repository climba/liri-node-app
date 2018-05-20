require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");


var spotify = new Spotify({
  id: keys.spotify.id,
  secret: keys.spotify.secret
});

var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  // case "spotify-this-song":
  case "sts":
  sts();
  break;
  case "spotify-this-song":
  sts();
  break;
  case "movie-this":
  mt();
  break;
}

function sts() {
  var songQuery = process.argv[3] ? { type:'track', query: process.argv[3] } : { type:'artist', query: "5ksRONqssB7BR161NTtJAm"} 
  var querryStr = data.tracks.items[0];
  
  var songGiven = function() {
      console.log("\nYAY!! You searched for a song! We love music!!" + 
                    "\nThe artist's name is " + querryStr.artists[0].name +
                    "\nThe songs's name is " + querryStr.name +
                    "\nSee the album at " + querryStr.album.external_urls.spotify +
                    "\nThe Album's name is " + querryStr.album.name); 
  }

  var songNotGiven = function() { 
    console.log("Opps!! You didnt specify a song");
  }

  var displayMessage = process.argv[3] ? songGiven : songNotGiven;

  spotify.search(songQuery), function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
    displayMessage();
  }
}

function mt() {
  
  var movieName = "";
  var queryUrlp1 = "http://www.omdbapi.com/?t=";
  var queryUrlp2 = "&y=&plot=short&apikey=40e9cece";
  for (var i = 3; i < process.argv.length; i++) {
    movieName += process.argv[i] + "+";
  }
  var queryUrlF = queryUrlp1 + movieName + queryUrlp2;
  
  request(queryUrlF, function(error, response, body) {

    var movieGiven = function() {
      console.log("\nYAY!! You searched for a movie! We love movies!!" +
        "\n---------------------------" +
        "\nThe title of the movie is " + JSON.parse(body).Title +
        "\nThe release year was " + JSON.parse(body).Year +
        "\nThe IMDB Rating is " + JSON.parse(body).imdbRating +
        "\nThe Rotten Tomatoes Rating is " + JSON.parse(body).Ratings[1].Value +
        "\nThis movie was produced in the " + JSON.parse(body).Country +
        "\nThe language of the movie is " + JSON.parse(body).Language +
        "\nThe plot of the movie is: " + JSON.parse(body).Plot +
        "\nThe actors in the movie are " + JSON.parse(body).Actors );

      }
    var movieNotGiven = function() {
      console.log("\n---------------------------" +
        "\nYou didnt search for a movie " +
        "\nIf you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>" +
        "\nIt's on Netflix!" +
        "\nnext time type 'movie-this' and the name of a movie!");

    }
    // If the request is successful return the movies data
  if (movieName === "") {
        movieNotGiven();
    // If no moviie request suggest another
  } else if (!error && response.statusCode === 200) {
    movieGiven() 
  }
});
}
    