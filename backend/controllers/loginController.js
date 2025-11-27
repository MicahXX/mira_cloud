const bcrypt = require('bcryptjs');
const db_con = require('../db_con');

exports.handleLogin = (req, res) => {
    const { username, password } = req.body;

    db_con.query('SELECT pass FROM users WHERE username = ?', [username], (err, results) => {
        if (err || results.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid username or password' });
        }

        bcrypt.compare(password, results[0].pass, (err, result) => {
            if (err || !result) {
                return res.status(401).json({ success: false, message: 'Invalid username or password' });
            }

            // Save user session (if using sessions)
            req.session.user = {
                logedinUser: username
            };

            res.json({
                success: true,
                user: req.session.user.logedinUser,
                messages: [],
                friends: []
            });
        });
    });
};
