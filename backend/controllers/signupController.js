const bcrypt = require('bcryptjs');
const db_con = require('../db_con');
const saltRounds = 10;

exports.handleSignup = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Username and password are required' });
    }

    // Check if the username already exists
    db_con.query('SELECT username FROM users WHERE username = ?', [username], (err, results) => {
        if (err) {
            console.error(err);
            return res.json({ success: false, message: 'Database error' });
        }

        if (results.length > 0) {
            return res.json({ success: false, message: 'Username already exists' });
        }

        // Hash the password
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error(err);
                return res.json({ success: false, message: 'Error hashing password' });
            }

            // Insert the new user into the database
            const insertQuery = 'INSERT INTO users (username, pass) VALUES (?, ?)';
            db_con.query(insertQuery, [username, hash], (err) => {
                if (err) {
                    console.error(err);
                    return res.json({ success: false, message: 'Error creating user' });
                }

                // Success
                return res.json({ success: true, message: 'Account created successfully' });
            });
        });
    });
};
