var express = require("express");
var session = require("express-session");
var bodyParser = require('body-parser')


var app = express();


app.use(express.static(__dirname + "/static"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}))

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');


app.get('/', function (request, response) {

    if(request.session.number==null){
    guess = Math.floor(Math.random() * 100) + 1;
    request.session.guess = guess;
    console.log(request.session.guess)
    number = 0;}
    else{
        response.redirect("/")
    }



    response.render("index", { guess: request.session.guess, number: request.body.number });
})

app.post('/guess', function (request, response) {

    response.render("index",{number:request.body.number,guess:request.session.guess});
})

app.get('/reset', function (request, response) {
    request.session.number=null;

    response.redirect("/");
})
app.listen(8080, function () {
    console.log("Listening on port 8080");
})