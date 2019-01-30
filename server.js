var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var diners = [
    {

    }
]


app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "view.html"));
  });
  
  app.get("/add", function(req, res) {
    res.sendFile(path.join(__dirname, "add.html"));
  });
  
  // Displays all tables
  app.get("/api/tables", function(req, res) {
    return res.json(diners);
  });

  // Displays a single character, or returns false
app.get("/api/tables/:diner", function(req, res) {
    var chosen = req.params.diner;
  
    console.log(chosen);
  
    for (var i = 0; i < diners.length; i++) {
      if (chosen === diners[i].routeName) {
        return res.json(diners[i]);
      }
    }
  
    return res.json(false);
  });
  
  // Create New Characters - takes in JSON input
  app.post("/api/tables", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newDiner = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newDiner.routeName = newDiner.name.replace(/\s+/g, "").toLowerCase();
  
    console.log(newDiner);
  
    diners.push(newDiner);
  
    res.json(newDiner);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  