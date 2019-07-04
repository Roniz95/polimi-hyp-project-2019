const bcrypt = require('bcrypt');
const uuidv4 = require('uuid/v4');
const knex = require('./knexConfig').knexConn();


function handleResponse(res, code, statusMsg) {
    res.status(code).json([{status: statusMsg}]);
}

function loginRedirect(req, res, next) {
    if (req.user) {
        return res.status(401).json([{status: 'You are already logged in'}]);
    }
    next();
}

function createUser(req, res) {
    return handleErrors(req)
        .then(() => {
            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(req.body.password, salt);
            return knex('users')
                .insert({
                    id : uuidv4(),
                    username: req.body.username,
                    password: hash,
                    name : req.body.name,
                    surname : req.body.surname,
                    email : req.body.email

                })
                .returning('*');
        })
        .catch((err) => {
            console.log('error');
            res.status(400).json({status: err.message});
        });
}

function handleErrors(req) {
    return new Promise((resolve, reject) => {
        if (req.body.username.length < 6) {
            reject({
                message: 'Username must be longer than 6 characters'
            });
        }
        else if (req.body.password.length < 6) {
            reject({
                message: 'Password must be longer than 6 characters'
            });

        } else {

            resolve();
        }
    });
}

function loginRequired(req, res, next) {
    if (!req.user) return res.status(401).json([common.error('forbidden', res.url)]);
    return next();
}

module.exports = {
    createUser,
    loginRequired,
    loginRedirect,
    handleResponse,

};