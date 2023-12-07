// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api", function(req, res) {
  res.json({ unix: (new Date()).getTime(), utc: (new Date()).toUTCString() });
});

app.get("/api/:date", function(req, res) {
  const dateParam = req.params.date;
  let unix, utc;

  if ((new Date(parseInt(dateParam))).toString() == "Invalid Date") {
    res.json({ "error": "Invalid Date" });
    return;
  }

  if (
    (new Date(parseInt(dateParam))).getTime() === parseInt(dateParam) &&
    dateParam.indexOf("-") === -1 &&
    dateParam.indexOf(" ") === -1
  ) {
    unix = parseInt(dateParam);
    utc = (new Date(parseInt(dateParam))).toUTCString();
  } else {
    unix = (new Date(dateParam)).getTime();
    utc = (new Date(parseInt(unix))).toUTCString();
  }
  res.json({ unix, utc });

});

// your first API endpoint... 
app.get("/api/hello", function(req, res) {
  res.json({ greeting: 'hello API' });
});



// listen for requests :)
var listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
