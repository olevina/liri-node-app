require("dotenv").config();
//var spotify = new Spotify(keys.spotify);
var key = require("./keys");
var Spotify = require("node-spotify-api");
var bandsintown = require('bandsintown')('codingbootcamp');
var userCommand = process.argv[2];
var userBand = process.argv.slice(3).join(" ");


if (userCommand === "concert-this"){
    bandsintown
    .getArtistEventList(userBand)
    .then(function(events) {
     console.log(events[0].formatted_datetime);
     console.log(events[0].title);
    });
}

var spotify = new Spotify(key.spotify);

if (userCommand === "spotify-this-song") {
   
    if (process.argv.length < 4){
        //"The Sign" by Ace of Base.
        //returns other guy with the same song name...sorry! not my fault ...
        spotify.search({ type: 'track', query: "The Sign" }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            console.log(data.tracks.items[0].artists[0].name); 
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].external_urls.spotify); 
            console.log(data.tracks.items[0].album.name); 
          });
    }

    else {
      
        spotify.search({ type: 'track', query: userBand }, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           
            console.log(data.tracks.items[0].artists[0].name); 
            console.log(data.tracks.items[0].name);
            console.log(data.tracks.items[0].external_urls.spotify); 
            console.log(data.tracks.items[0].album.name); 
          });
    
        
    }
}





 var request = require('request');

 if (userCommand === "movie-this") {
 
    if (process.argv.length < 4) {
        request('http://www.omdbapi.com/?apikey=trilogy&t=Mr.Nobody', function (error, response, body) {
            var movie = JSON.parse(body);
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode); 
          console.log('title:', movie.Title);
          console.log('year:', movie.Year);
          console.log('IMDB rating:', movie.imdbRating);
          console.log('Rotten Tomatoes rating:', movie.Ratings[1].Value);
          console.log('Country:', movie.Country);
          console.log('Language:', movie.Language);
          console.log('Plot:', movie.Plot);
          console.log('Actors:', movie.Actors);
        });

    
    }

    else {
        request('http://www.omdbapi.com/?apikey=trilogy&t='+userBand , function (error, response, body) {
            var movie = JSON.parse(body);
          console.log('error:', error);
          console.log('statusCode:', response && response.statusCode); 
          console.log('title:', movie.Title);
          console.log('year:', movie.Year);
          console.log('IMDB rating:', movie.imdbRating);
          console.log('Rotten Tomatoes rating:', movie.Ratings[1].Value);
          console.log('Country:', movie.Country);
          console.log('Language:', movie.Language);
          console.log('Plot:', movie.Plot);
          console.log('Actors:', movie.Actors);
        });
       
    }

}







 if (userCommand === "do-what-it-says") {

 var fs = require("fs");

fs.readFile("random.txt", "utf8", function(error, data) {


  if (error) {
    return console.log(error);
  }

  var dataArr = data.split(",");


  spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
    if (err) {
      return console.log('Error occurred: ' + err);
    }
   
    console.log(data.tracks.items[0].artists[0].name); 
    console.log(data.tracks.items[0].name);
    console.log(data.tracks.items[0].external_urls.spotify); 
    console.log(data.tracks.items[0].album.name); 


  });

});
 }

