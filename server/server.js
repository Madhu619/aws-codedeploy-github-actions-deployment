const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 8000;
app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));
// get driver connection
const dbo = require("./db/conn");



const path = require("path");

app.use("/api", require(path.join(__dirname, "routes", "record.js")));

app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});

// static files (build of your frontend)
if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
  app.use(express.static(path.join(__dirname, '../client', 'public')));
  app.get('/*', (req, res) => {
    res.sendFile('index.html', {root: path.join(__dirname, '../client/public')});
  })
}

