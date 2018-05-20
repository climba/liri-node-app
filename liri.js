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
  movies();
  break;
  case "mt":
  movies();
  break;
}

function sts() {
  if(process.argv[3]) {
    spotify.search({ type:'track', query: process.argv[3] }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      var querry1 = data.tracks.items[0];
      console.log("\nYAY!! You searched for a song! We love music!!" + 
                  "\nThe artist's name is " + querry1.artists[0].name +
                  "\nThe songs's name is " + querry1.name +
                  "\nSee the album at " + querry1.album.external_urls.spotify +
                  "\nThe Album's name is " + querry1.album.name); 
    })
} else  {
    spotify
    .request('https://api.spotify.com/v1/artists/5ksRONqssB7BR161NTtJAm')
    .then(function(data) {
      console.log("Opps!! You didnt specify a song" + 
                  // "\nYou might Like " + data.track + data.name); 
                  "\nYou might Like " + data.items); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });

  }
}


    function movies() {
      var movieName = "";
      // Grab or assemble the movie name and store it in a variable called "movieName"
      for (var i = 3; i < process.argv.length; i++) {
        movieName += process.argv[i] + "+";
      }

    // Then run a request to the OMDB API with the movie specified
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=40e9cece";

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

    request(queryUrl, function(error, response, body) {

          // If the request is successful
        if (movieName === "") {
          movieNotGiven;

        } else if (!error && response.statusCode === 200) {
          movieGiven;  
        }
    });
    }

    

