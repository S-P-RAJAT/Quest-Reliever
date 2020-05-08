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
    console.log("hello");
    var url = "http://www.omdbapi.com/?s="+query+"&apikey=thewdb";
    request(url, function(error, response, body){
        if(!error && response.statusCode == 200) {
            var data = JSON.parse(body);

                if (data.Response = "False"){

                    var url1 = "https://www.googleapis.com/customsearch/v1?key=AIzaSyC6KpyXFnWR9HlGQDNAXPVYwkuwrlQE_o4&cx=002210161127150476775:jxnx4i2huwl&q="+query+" movie";
                    request(url1, function(error, response, body){

                        if(!error && response.statusCode == 200) {
                            console.log("False :)")
                            var s = "";
                            var str = ""
                            var gdata = JSON.parse(body);
                            console.log(gdata);

                            if (gdata.spelling !=undefined){
                                res.redirect("/search?search=" + gdata.spelling.correctedQuery)
                                console.log("Query corrected");
                            }
                            if (gdata.items !=undefined){
                               for (var i =0; i<gdata.items.length - 1; i++) {
                                    s = gdata.items[i].title;
                                    if (s.includes("Wikipedia")){
                                        break;
                                    }
                                }
                                for (var i =0; i<s.length; i++) {
                                    
                                    if (s[i]=='(' || s[i]==':' || s[i]=='-' || s[i]=='–'){
                                        break;
                                    }
                                    str= str + s[i];
                                }
                            
                                query2 = str.trim();
                            }
                            else{
                                query2 = query;
                            }

                            url = "http://www.omdbapi.com/?s="+query2+"&apikey=thewdb";
                            
                            request(url, function(error, response, body){
                                if(!error && response.statusCode == 200) {
                                    data = JSON.parse(body);
                                    res.render("search",{title: title,data: data,condition: false});
                                    
                                    }
                            });

                        }
                    });
                }
                else{
                    res.render("search",{title: title,data: data,condition: false});
                    
                }
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
            
        }
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});