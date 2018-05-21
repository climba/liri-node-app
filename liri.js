require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");
var fs = require("fs");

var client = new Twitter(keys.twitter);
var spotify = new Spotify(keys.spotify);

// Assign process.argv[2] to a variable that will get choose a function depending on the switch
var action = process.argv[2];
// Assign process.argv[3] to a variable that will get passed as a querry into the function that get choosen
var value = process.argv[3];

// Here we call the function that will determin if we run FS or not
chooseTask(action, value);

// choose what function to run and assign the value accordingly
function chooseTask(task, toDo) {
  // I got help from my tutor here, turnary operators are still confusing.
  value = toDo ? toDo : value;
  switch (task) {
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
    case "my-tweets":
    myTweetz();
    break;
    case "myt":
    myTweetz();
    break;
    case "do-what-it-says":
    fileSys();
    break;
  }
}

// This is the Spotify This function
function sts() {
  if(value) {
    spotify.search({ type:'track', query: value }, function(err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //When a song title is entered return these results for that song
      var querry1 = data.tracks.items[0];
      console.log("\nYAY!! You searched for a song! We love music!!" + 
                  "\nThe artist's name is " + querry1.artists[0].name +
                  "\nThe songs's name is " + querry1.name +
                  "\nSee the album at " + querry1.album.external_urls.spotify +
                  "\nThe Album's name is " + querry1.album.name); 
    })
    // If no song title is entered return results for "The Sign" by Ace of Base, 
    // using spotifys unique identifyer for Ace of Base.
} else  {
    spotify
    .request('https://api.spotify.com/v1/artists/5ksRONqssB7BR161NTtJAm/albums')
    .then(function(data) {
      console.log("Opps!! You didnt specify a song" + 
                  "\nYou might Like "  + data.items[8].name + " by " + data.items[0].artists[0].name); 
                  // "\nYou might Like " + JSON.stringify(data)); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });

  }
}
// This is the Movie This function
function movies() {
  // Assign the movie name as an empty variable first.
  var movieName = "";
  // First section of the querry string
  var queryUrlp1 = "http://www.omdbapi.com/?t=";
  // API section of the querry string
  var queryUrlp2 = "&y=&plot=short&apikey=40e9cece";
  // Loop through the name of the film entered and replace the spaces with plus signs to make the URL work
  for (var i = 3; i < process.argv.length; i++) {
    movieName += process.argv[i] + "+";
  }
  // Convert all the parts of the querry string into one variable
  var queryUrlF = queryUrlp1 + movieName + queryUrlp2;
  // Run the request
  request(queryUrlF, function(error, response, body) {
    // If the user has entered a movie name return these results for that object
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
      // If the user has NOT entered a movie name return a suggestion for another movie
    var movieNotGiven = function() {
      console.log("\n---------------------------" +
        "\nYou didnt search for a movie " +
        "\nIf you haven't watched 'Mr. Nobody', then you should: <http://www.imdb.com/title/tt0485947/>" +
        "\nIt's on Netflix!" +
        "\nnext time type 'movie-this' and the name of a movie!");

    }
    // If the request is successful return the movies data specified in its function
  if (movieName === "") {
        movieNotGiven();
    // If no movie requested return the default movies data specified in its function
  } else if (!error && response.statusCode === 200) {
    movieGiven() 
  }
});
}

// Return the last 5 tweets for the Gripster
function myTweetz() {
  var params = {user_id: 'the_gripster'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
          // Loop through the results and return the 5 latest tweets
          for(var i =0; i < 5; i++) {
            console.log(tweets[i].text);
          }
        }
      });
}


// If the user inputs do-what-it-says then look at the file random.txt and insert the text into the Spotify function
function fileSys() {
  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
        return console.log(error);
    }

    console.log("We looked at the file random.txt and searched Spotify!");
    var dataArr = data.split(",");
    // console.log(dataArr);
    chooseTask(dataArr[0], dataArr[1]);
  });

}




    

