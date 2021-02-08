require("dotenv").config();

var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");
//var inquirer = require("inquirer");
// var keys = require("./js/keys");
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var search = process.argv[2];
//var spotifyURI = `https://accounts.spotify.com/authorize?${keys.spotify.id}`;
var command = process.argv[2];
var input = process.argv[3];

inquirer
  .prompt([{
    type: "list",
    message: "Please choose what you would like to do?",
    choices: ["concert-this", "spotify-this-song", "movie-this"],
    name: "action",
  }])
  .then((answers) => {
   var command = answers.action;

   
switch (command) {
  case "concert-this":
    {
      var bandApi =
  "https://rest.bandsintown.com/artists/" +
  input +
  "/events?app_id=codingbootcamp";
      axios
        .get(bandApi)
        .then(function (response) {
          var info = response.data;

          console.log(
            "\n Here are the upcoming concerts:" +
              "\n" +
              "-------------------------------------------------------" +
              "\n" +
              "                                                        "
          );

          for (var i = 0; i < info.length; i++) {
            var venue = info[i].venue;
            var date = info[i].datetime;

            console.log(
              `\nPlace: ${venue.name} \n\nLocation: ${
                venue.location
              } \n\nDate: ${moment(date).format(
                "MM-DD-YYYY"
              )} \n\n---------------------------------------------------------------`
            );
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
    break;
  case "spotify-this-song":
    {
      var keys = require("./js/keys");
      var Spotify = require("node-spotify-api");
      var spotify = new Spotify(keys.spotify);

      spotify
        .search({ query: input, type: "track", limit: 1 })
        .then(function (response) {
          var tracks = response.tracks.items;

          for (var i = 0; i < tracks.length; i++) {
            var artist = tracks[i].artists;
            var songsName = tracks[i].name;
            var previewLink = tracks[i].external_urls.spotify;
            var albumName = tracks[i].album.name;
            //console.log(artist)
            //console.log(songsName.name)
            for (var i = 0; i < artist.length; i++) {
              console.log(artist[i].name);
            }
          }
        })
        .catch(function (err) {
          console.log(err);
        });
    }
    break;
  case "movie-this":
    {
      console.log("movie");
    }
    break;
  case "do-what-it-says":
    {
      console.log("do it");
    }
    break;
  default:
    {
      // console.log("Sorry that command doesn't exist!");
    }
    break;
}

  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
  });
