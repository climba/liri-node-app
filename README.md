# Command Line Node APP

### Overview

This project is a command line node app that takes in parameters and returns data from specific APIs depending on what command the user enters into the terminal.

### Running the App

1. The App has 4 main functions. It ca display your latest tweets, return details about Spotify songs, return details about movies from OMDB and it also reads a text file that is inside the main project directory, takes data from that file and runs it through the spotify function.


2. To run this app, you'll need to install the following Node packages.

   * [Twitter](https://www.npmjs.com/package/twitter)
   
   * [Node-Spotify-API](https://www.npmjs.com/package/node-spotify-api)
   
   * [Request](https://www.npmjs.com/package/request)

   * [DotEnv](https://www.npmjs.com/package/dotenv)


### Instructions

1. Once you have installed the above packages you are almost ready to run the app. However, to allow the app to connet to the APIs you also need API keys and secrets from twitter and spotify. These keys will be contained in a file called .env

2. After you have cloned the app from github, to run it, you will need to populate your own `.env` file.

3. Create a file named `.env`, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```js
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret

```

* This file will be used by the `dotenv` package to set what are known as environment variables to the global `process.env` object in node. These are values that are meant to be specific to the computer that node is running on. You should also add the .env file into your gitignore file. The will allow you to push the project to github without publising your privte API keys onto github.


4. Get your Twitter API keys by following these steps:

   * Step One: Visit  <https://apps.twitter.com/app/new>
   
   * Step Two: Fill out the form with dummy data. Type `http://google.com` in the Website input. Don't fill out the Callback URL input. Then submit the form.
   
   * Step Three: On the next screen, click the Keys and Access Tokens tab to get your consume key and secret. 
     
     * Copy and paste them into your .env file, replacing the `your-twitter-consumer-key` and `your-twitter-consumer-secret` placeholders.
   
   * Step Four: At the bottom of the page, click the `Create my access token` button to get your access token key and secret. 
     
     * Copy the access token key and secret displayed at the bottom of the next screen. Paste them into your .env file, replacing the placeholders for `your-twitter-access-token-key` and `your-twitter-access-token-secret`.



To use this app run one of the following commands:

    * `node liri.js my-tweets`

    * `node liri.js spotify-this-song`

    * `node liri.js spotify-this-song <song name here>`

    * `node liri.js movie-this`

    * `node liri.js movie-this movie-title`

    * `node liri.js do-what-it-says`

To run the app with shortcut commands use:

    * `node liri.js myt`

    * `node liri.js sts`

    * `node liri.js sts <song name here>`

    * `node liri.js mt`

    * `node liri.js mt movie-title`

    * `node liri.js dws`    

### What Each Command Does

1. `node liri.js my-tweets` or `node liri.js myt`

   * Once you set a user name in the twitter function This will show the last 20 tweets and when they were created at in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'` or `node liri.js sts '<song name here>'`

   * This will show the following information about the requested song in your terminal/bash window
     
     * Artist(s)
     * The song's name
     * A preview link of the song from Spotify
     * The album that the song is from

   * If no song is provided then the program will default to "The Sign" by Ace of Base.
   

3. `node liri.js movie-this '<movie name here>'` or `node liri.js mt '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
     * If you haven't watched "Mr. Nobody," then you should: <http://www.imdb.com/title/tt0485947/>
     
     * It's on Netflix!
   
   * You'll use the request package to retrieve data from the OMDB API. Like all of the in-class activities, the OMDB API requires an API key. You may use `trilogy`.

4. `node liri.js do-what-it-says`
   
   * Uses the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It will run `spotify-this-song` for "I Want it That Way," as specified in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.




