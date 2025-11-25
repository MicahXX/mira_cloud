const express = require("express");
const path = require("path");

const app = express();
const PORT = 5555;

const session = require('express-session');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use(session({
  secret: '123456789',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60,  //1 hour
    secure: false
  }
}));

// req = request and res = send

//app.listen(PORT, "129.12.12.0");

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});