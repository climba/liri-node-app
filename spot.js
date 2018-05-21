require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var Twitter = require('twitter');
var request = require("request");


var spotify = new Spotify(keys.spotify);

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

}

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
