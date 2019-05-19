require("dotenv").config();
var inquirer = require("inquirer");

var keys = require("./keys.js");
//console.log(keys)
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var search = process.argv[2];

   spotify.search({type: 'track', query: search, limit: 1,}, function(err, response){
     if (err) {
       return console.log('Error occured: ' + err);
     } 
     

     console.log("Name: ");
     console.log(response.tracks.items[0].artists[0].name);

     console.log("Track: ");
     console.log(response.tracks.items[0].name);

     console.log("Preview Link: ");
     console.log(response.tracks.items[0].artists[0].uri);

     console.log("Album: ");
     console.log(response.tracks.items[0].album.name);
     
    // if (response){ console.log(JSON.stringify(response.items.name));
   //}
  });









// inquirer.prompt([
//   {
//     type: "input",
//     name: "name",
//     message: "Type a song to get information?"
//   }
// ]).then(function(song){
//   spotify.search({ type: 'track', query: 'dreams', limit: 2,}, function(err, response){
//     if (err) {
//       return console.log('Error occured: ' + err);
//     } else if (response){ console.log(response.data) 

//     }
//   });
// });











// {
// spotify.search(
//   { type: 'track', query: 'All the Small Things', limit: 2}
//   )
// .then(function(response) {
//   console.log(response.data);
// })
// .catch(function(err) {
//   console.log(err);
// });
// });
