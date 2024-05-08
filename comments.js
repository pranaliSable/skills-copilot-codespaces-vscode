// Create web server
var express = require('express');
var app = express();
var fs = require('fs');
var bodyParser = require('body-parser');

// Set the port
app.set('port', process.env.PORT || 3000);

// Set the view engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', './views');

// Set the body-parser
app.use(bodyParser.urlencoded({extended: false}));

// Set the public directory
app.use(express.static('./public'));

// Render the homepage
app.get('/', function(req, res){
    res.render('index');
});

// Render the comments page
app.get('/comments', function(req, res){
    fs.readFile('./data/comments.json', 'utf8', function(err, data){
        if(err){
            console.log(err);
        } else {
            var comments = JSON.parse(data);
            res.render('comments', {comments: comments});
        }
    });
});

// Add a comment
app.post('/comments', function(req, res){
    fs.readFile('./data/comments.json', 'utf8', function(err, data){
        if(err){
            console.log(err);
        } else {
            var comments = JSON.parse(data);
            comments.push(req.body);
            fs.writeFile('./data/comments.json', JSON.stringify(comments), function(err){
                if(err){
                    console.log(err);
                } else {
                    res.redirect('/comments');
                }
            });
        }
    });
});

// Start the server
app.listen(app.get('port'), function(){
    console.log('Server started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});