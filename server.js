var express = require("express");
var app = express();
var request = require("request");
var Handlebars = require("hbs");

Handlebars.registerHelper("ifvalid", function(conditional,options) {
    console.log(options.fn(this));
  if ((conditional == "N/A" || conditional == "True")) {
      return options.inverse(this);
    } else {
      return options.fn(this);
    }
});
//app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.get("/:name"+".css",function(req, res){
    res.sendFile(__dirname + "/public/stylesheets/"+req.params["name"]+".css");
});

app.get("/:name2"+".js",function(req, res){
    res.sendFile(__dirname + "/public/javascripts/"+req.params["name2"]+".js");
});

app.get("/:name"+".jpg",function(req, res){
    res.sendFile(__dirname + "/public/images/"+req.params["name"]+".jpg");
});

var title = "Quest Reliever";
app.get("/",function(req, res){
    res.render("index",{title: title})
});
app.get("/search", function(req, res){
    var query = req.query.search;
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);
            res.render("search",{title: title,data: data,condition: false});
            createHTML(data);
        }
    });
});
app.get("/search/:movieName/:movieID", function(req, res){
    var url = "http://www.omdbapi.com/?i="+req.params["movieID"]+"&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var Poster = "";
            var Ratings = "";
            var data = JSON.parse(body)
            if(data.imdbID) data.imdbID= "N/A";
            if(data.Poster) {
                Poster = data.Poster;
                data.Poster = undefined;
            }
            if(data.Ratings){
                Ratings = data.Ratings;
                data.Ratings = undefined;
            }
            res.render("description",{title: title,Poster: Poster,Ratings: Ratings,data: data,condition: false});
            createHTML(data);
        }
    });
});
app.get("/search/:movieName", function(req, res){
    var url = "http://www.omdbapi.com/?t="+req.params["movieName"]+"&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var Poster = "";
            var Ratings = "";
            var data = JSON.parse(body)
            if(data.imdbID) data.imdbID= "N/A";
            if(data.Poster) {
                Poster = data.Poster;
                data.Poster = undefined;
            }
            if(data.Ratings){
                Ratings = data.Ratings;
                data.Ratings = undefined;
            }
            res.render("description",{title: title,Poster: Poster,Ratings: Ratings,data: data,condition: false});
            createHTML(data);
        }
    });
});
function createHTML(petsData){
    console.log("testing from our function");
    console.log(petsData)
}


app.listen(3000, "0.0.0.0", function(){
    console.log("Handlebar App has started!!!");
});