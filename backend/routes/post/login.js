    const express = require('express');
    const router = express.Router();
    const loginController = require('../../controllers/loginController');

    router.post('/login', loginController.handleLogin);

    module.exports = router;

    // GET /post/session
    router.get('/session', (req, res) => {
        if (req.session.user && req.session.user.logedinUser) {
            res.json({ user: req.session.user.logedinUser });
        } else {
            res.json({ user: null });
        }
    });