require("dotenv").config();

var inquirer = require("inquirer");
var moment = require("moment");
var axios = require("axios");
var keys = require("./js/keys.js");
var Spotify = require("node-spotify-api");
//var inquirer = require("inquirer");
// var keys = require("./js/keys");
// var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
// var search = process.argv[2];
//var spotifyURI = `https://accounts.spotify.com/authorize?${keys.spotify.id}`;
var command = process.argv[2];
//var input = process.argv[3];

function start() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Please choose what you would like to do?",
        choices: ["concert-this", "spotify-this-song", "movie-this"],
        name: "action",
      },
    ])
    .then((answers) => {
      var choice = answers.action;

      if (choice === "concert-this") {
        main(
          "Please type in the artist's name to find their concerts?",
          choice
        );
      } else if (choice === "spotify-this-song") {
        main(
          "Please type in the name of the song you would like to search?",
          choice
        );
      } else if (choice === "movie-this") {
        main(
          "Please type in the name of the movie you would like to search for?",
          choice
        );
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        // Prompt couldn't be rendered in the current environment
      } else {
        // Something else when wrong
      }
    });
}

//Need question , user input and, data

function main(question, choice) {
  inquirer
    .prompt([
      {
        type: "input",
        message: question,
        name: "userInput",
      },
    ])
    .then((answer) => {
      var searchInput = answer.userInput;

      switch (choice) {
        case "concert-this":
          {
            if (searchInput === "") {
              console.log(`\n\nPlease type in the artist's name! \n\n`);
              start();
            } else {
              var bandApi =
                "https://rest.bandsintown.com/artists/" +
                searchInput +
                "/events?app_id=codingbootcamp";
              axios
                .get(bandApi)
                .then(function (response) {
                  var info = response.data;

                  if (info == [].length) {
                    console.log(
                      "\n\nSorry there is no upcoming concerts for this artist."
                    );
                  } else {
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
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          }
          break;
        case "spotify-this-song":
          {
            var spotify = new Spotify(keys.spotify);

            if (searchInput === "") {
              console.log(`\n\nPlease type in a track name!\n\n`);
              start();
            } else {
              spotify
                .search({ query: searchInput, type: "track", limit: 1 })
                .then(function (response) {
                  var tracks = response.tracks.items;

                  if (tracks == [].length || tracks == "") {
                    console.log(
                      "\nSorry we couldn't find song. \nHere you should listen to The Sign by Ace of Base."
                    );
                  } else {
                    var art = [];

                    for (var i = 0; i < tracks.length; i++) {
                      var artist = tracks[i].artists;
                      var songsName = tracks[i].name;
                      var previewLink = tracks[i].external_urls.spotify;
                      var albumName = tracks[i].album.name;

                      for (var i = 0; i < artist.length; i++) {
                        art.push(" " + artist[i].name);
                      }

                      console.log(
                        `\nHere is the track ${songsName}. \n\nThese are the artist on the track ${art}. \n\nThis track belongs to this album ${albumName}. \n\nHere is a preview link from Spotify ${previewLink}.`
                      );
                    }
                  }
                })
                .catch(function (err) {
                  console.error("there is error");
                });
            }
          }
          break;
        case "movie-this":
          {
            //take in password from env file
            
            var pass = keys.movie;

            // Take in promp answer for movie
            if (searchInput === "") {
              console.log(
                `\n\nPlease type in the name of movie you would like to know about? \n\n`
              );
              start();
            } else {
              var omdb = `http://www.omdbapi.com/?apikey=${pass.secret}&t=${searchInput}&tomatoes=true`;

              axios
                .get(omdb)
                .then(function (response) {
                  var data = response.data;
                  var newReleasedDate = moment(data.Released, "MM/DD/YYYY");
                  function tomatoRating(){
                    var tomatoR = data.Ratings;

                    for (var i = 0; i < tomatoR.length; i++) {
                      console.log(tomatoR[i]);
                    }
                  }
                  tomatoRating();
                  console.log(`\nMovie Title: ${data.Title} \n\nReleased Date: ${moment(newReleasedDate).format("MM-DD-YYYY")} \n\nIMDB Rating: ${data.imdbRating} \n\nRotten Tomatoes Rating: \n\nCountry: ${data.Country} \n\nLanguage of the Movie: ${data.Language} \n\nPlot: ${data.Plot} \n\nActors: ${data.Actors}`);
                })
                .catch(function (err) {
                  console.log(err);
                });
            }
          }
          break;
        default:
          {
            // console.log("Sorry that command doesn't exist!");
          }
          break;
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

start();
