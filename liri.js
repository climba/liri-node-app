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
}

function sts() {
  if(process.argv[3]) {
    spotify.search({ type:'track', query: process.argv[3] }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("\nYAY!! You searched for a song! We love music!!\n");
      console.log("---------------------------");
      // Artist(s)
      console.log("\nThe artist's name is " + data.tracks.items[0].artists[0].name); 
      // The song's name
      console.log("\nThe songs's name is " + data.tracks.items[0].name); 
      // A preview link of the song from Spotify
      console.log("\nSee the album at " + data.tracks.items[0].album.external_urls.spotify); 
      // The album that the song is from
      console.log("\nThe Album's name is " + data.tracks.items[0].album.name); 

    })
} else  {
  // console.log("Opps!! You didnt specify a song");
  spotify.search({ type:'track', query: "The Sign" }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);  
    }
      console.log("---------------------------");
      // Artist(s)
      console.log("The artist's name is " + data.tracks.items[0].artists[0]); 
      // // The song's name
      // console.log("");
      // console.log("The songs's name is " + data.tracks.items[0].name); 
      // // A preview link of the song from Spotify
      // console.log("");
      // console.log("See the album at " + data.tracks.items[0].album.external_urls.spotify); 
      // // The album that the song is from
      // console.log("");
      // console.log("The Album's name is " + data.tracks.items[0].album.name); 
      // // If no song is provided then your program will default to "The Sign" by Ace of Base.
    })
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

    // console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

          // If the request is successful
        if (movieName === "") {
          console.log("");
          console.log("---------------------------");
          console.log("You didnt search for a movie ");
          console.log("");
          console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
          console.log("");
          console.log("It's on Netflix!");
          console.log("next time type 'movie-this' and the name of a movie!");

        } else if (!error && response.statusCode === 200) {
          console.log("");
          console.log("");
          console.log("YAY!! You searched for a movie! We love movies!!");
          console.log("");
          console.log("---------------------------");
          // * Title of the movie.
          console.log("");
          console.log("The title of the movie is " + JSON.parse(body).Title);
          // * Year the movie came out.
          console.log("");
          console.log("The release year was " + JSON.parse(body).Year);
          // * IMDB Rating of the movie.
          console.log("");
          console.log("The IMDB Rating is " + JSON.parse(body).imdbRating);
          // * Rotten Tomatoes Rating of the movie.
          console.log("");
          console.log("The Rotten Tomatoes Rating is " + JSON.parse(body).Ratings[1].Value);
          // * Country where the movie was produced.
          console.log("");
          console.log("This movie was produced in the " + JSON.parse(body).Country);
          // * Language of the movie.
          console.log("");
          console.log("The language of the movie is " + JSON.parse(body).Language);
          // * Plot of the movie.
          console.log("");
          console.log("The plot of the movie is: " + JSON.parse(body).Plot);
          // * Actors in the movie.
          console.log("");
          console.log("The actors in the movie are " + JSON.parse(body).Actors);   
          // console.log(JSON.parse(body));   
        }
    });
    }