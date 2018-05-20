function sts() {
  var songQuery = process.argv[3] ? { type:'track', query: process.argv[3] } : { type:'artist', query: "5ksRONqssB7BR161NTtJAm"} 
  var querry1 = data.tracks.items[0];
  
  var songGiven = function() {
      console.log("\nYAY!! You searched for a song! We love music!!" + 
                    "\nThe artist's name is " + querry1.artists[0].name +
                    "\nThe songs's name is " + querry1.name +
                    "\nSee the album at " + querry1.album.external_urls.spotify +
                    "\nThe Album's name is " + querry1.album.name); 
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


function movies() {
  var movieName = "";
  var queryUrlp1 = "http://www.omdbapi.com/?t=";
  var queryUrlp2 = "&y=&plot=short&apikey=40e9cece";
  // Grab or assemble the movie name and store it in a variable called "movieName"
  for (var i = 3; i < process.argv.length; i++) {
    movieName += process.argv[i] + "+";
  }

// Then run a request to the OMDB API with the movie specified
var queryUrlF = queryUrlp1 + movieName + queryUrlp2;

// console.log(queryUrl);

request(queryUrlF, function(error, response, body) {

      // If the request is successful
    if (movieName === "") {
      console.log("---------------------------\n");
      console.log("You didnt search for a movie ");
      console.log("If you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>");
      console.log("It's on Netflix!");
      console.log("next time type 'movie-this' and the name of a movie!");

    } else if (!error && response.statusCode === 200) {
      console.log("YAY!! You searched for a movie! We love movies!!");
      console.log("---------------------------\n");
      // * Title of the movie.
      console.log("The title of the movie is " + JSON.parse(body).Title);
      // * Year the movie came out.
      console.log("The release year was " + JSON.parse(body).Year);
      // * IMDB Rating of the movie.
      console.log("The IMDB Rating is " + JSON.parse(body).imdbRating);
      // * Rotten Tomatoes Rating of the movie.
      console.log("The Rotten Tomatoes Rating is " + JSON.parse(body).Ratings[1].Value);
      // * Country where the movie was produced.
      console.log("This movie was produced in the " + JSON.parse(body).Country);
      // * Language of the movie.
      console.log("The language of the movie is " + JSON.parse(body).Language);
      // * Plot of the movie.
      console.log("The plot of the movie is: " + JSON.parse(body).Plot);
      // * Actors in the movie.
      console.log("The actors in the movie are " + JSON.parse(body).Actors); 
      console.log("---------------------------");  
      // console.log(JSON.parse(body));   
    }
});
}