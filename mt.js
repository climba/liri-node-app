require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");



var action = process.argv[2];
var value = process.argv[3];

switch (action) {
  // case "spotify-this-song":
  case "movie-this":
  mt();
  break;
  case "mt":
  mt();
  break;
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
    