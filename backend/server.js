const express = require("express");
const path = require("path");
const session = require('express-session');

const app = express();
const PORT = 5555;

const cors = require("cors");

app.use(cors({
    origin: 'http://localhost:3000', // React dev server
    credentials: true                 // allows cookies if needed
}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/** for production
 app.use(express.static(path.join(__dirname, '../frontend/build')));
 */

app.use(session({
    secret: '123456789',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60,  //1 hour
        secure: false
    }
}));

// import routes
const signupRoute = require('./routes/post/signup');
const loginRoute = require('./routes/post/login');

// use routes
app.use('/post', signupRoute);
app.use('/post', loginRoute);


// test route
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express!" });
});

// example POST test
app.post("/api/hello", (req, res) => {
    console.log(req.body);
    res.json({ received: req.body });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
