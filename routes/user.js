const express = require('express');
const router = express.Router();
const Login = require('../models/Login');
const User = require('../models/User');
const verifyToken = require('../middleware/verifyToken');
const { setToken } = require('../common/session');

router.use(verifyToken);

const getUsers = async (req, res, next) => {
    try {
        await User.find({}, {password: 0}).then(users => {
            res.status(200).send(users);
            setToken(req.params.id, req.headers['x-access-token']);
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const getLoginDetails = async (req, res, next) => {
    try {
        await Login.find({userId: req.params.id}).then(logins => {
            res.status(200).send(logins);
        })
    } catch (error) {
        res.status(500).send(error);
    }
}

router.get('/', getUsers);
router.get('/:id', getUsers);
router.get('/login/:id', getLoginDetails)

module.exports = router;