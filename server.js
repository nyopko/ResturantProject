var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var tables = [];

var waitlist = [];

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
  });
  
  app.get("/reservations", function(req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
  });

  app.get("/tables", function(req, res) {
      res.sendFile(path.join(__dirname, "tables.html"));
  });
  
  // Displays all tables
  app.get("/api/tables", function(req, res) {
    return res.json(tables);
  });

app.get("/api/waitlist", function(req, res) {
    return res.json(waitlist);
});

  // Displays a single character, or returns false
app.get("/api/tables/:diner", function(req, res) {
    var chosen = req.params.diner;
  
    console.log(chosen);
  
    for (var i = 0; i < tables.length; i++) {
      if (chosen === tables[i].customerID) {
        return res.json(tables[i]);
      }
    }
  
    return res.json(false);
  });

  app.get("/api/waitlist/:diner", function(req, res) {
      var chosen = req.params.diner;
      console.log(chosen);

      for (var i = 0; i < waitlist.length; i++) {
          if (chosen === waitlist[i].customerID) {
              return res.json(waitlist[i]);
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
    newDiner.customerID = newDiner.customerID.replace(/\s+/g, "").toLowerCase();
  
    console.log(newDiner);
    if (tables.length < 5) {
        tables.push(newDiner);
    } else {
        waitlist.push(newDiner);
    }
  
    res.json(newDiner);
  });
  
  // Starts the server to begin listening
  // =============================================================
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
