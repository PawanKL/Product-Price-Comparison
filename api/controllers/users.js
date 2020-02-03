var UserService = require('../services/users')
var User = require('../../models/users')
var EmailService = require('../services/email')
var bcrypt = require('bcrypt')
var jwt = require('jsonwebtoken')
// var dotEnv       = require('dotenv')
async function hashPassword(pass) {

    const password = pass
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}
exports.getUsers = async function (req, res, next) {
    // Validate request parameters, queries using express-validator

    try {
        var users = await UserService.getUsers({})
        return res.status(200).json({ status: 200, data: users, message: "Succesfully Users Retrieved" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message });
    }
}

exports.addUser = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var data = req.body
    console.log(data)
    try {
        var user = await UserService.findUser(data['PhoneNumber'], data['Email'])
        if (user.length > 0) {
            return res.status(200).json({ status: 200, data: user, message: "User Already Exists", error: "User Already Exists" });
        } else {
            var users = await UserService.addUser(data)
            var email = users['Email']
            // var sent = await EmailService.accountEmail(users, email)
            return res.status(200).json({ status: 200, data: users, message: "User Created Succesfully", error: null });
        }

    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message, error: e.message });
    }
}
exports.userLogin = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var data = req.body
    // console.log(data)
    try {
        var user = await UserService.userLogin(data)
        // console.log(user)
        if (user) {
            const match = await bcrypt.compare(data.Password, user.Password)
            if (match) {
                // console.log('Logged In')
                return res.status(200).json({ status: 200, data: user, message: "User Logged In Succesfully", error: null });
            } else {
                return res.status(200).json({ status: 200, data: null, message: "Password does not match", error: "Password does not match" });

            }
        }
        return res.status(404).json({ status: 404, data: null, message: "User Not Found", error: "User Not Found" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message, error: e.message });
    }
}
exports.userForgotPassword = async function (req, res, next) {
    // Validate request parameters, queries using express-validator
    var data = req.body
    try {
        var user = await UserService.getUserByEmail(data['Email'])
        if (user) {
            const id = user['_id']
            const secret = user.Password + '-' + user.CreatedAt
            const token = jwt.sign({ id }, secret, {
                expiresIn: 300
            });
            // console.log(process.env.NODE_ENV)
            // console.log(dotEnv)
            if (process.env.NODE_ENV) {
                const forgotLink = 'https://comparekaro.herokuapp.com/password/forgot/' + user.Email + '/' + token
                var sent = await EmailService.forgotPasswordEmail(forgotLink, user.Email)
            } else {
                const forgotLink = 'http://localhost:4000/password/forgot/' + user.Email + '/' + token
                var sent = await EmailService.forgotPasswordEmail(forgotLink, user.Email)
            }
            return res.status(200).json({ status: 200, data: user, message: "Forgot Email Sent", error: null });
        }
        return res.status(404).json({ status: 404, data: user, message: "User Not Found", error: "User Not Found" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message, error: e.message });
    }
}
exports.resetPassword = async function (req, res, next) {
    var data = req.body
    try {
        var user = await UserService.getUserByEmail(data['Email'])
        if (user) {
            const match = await bcrypt.compare(data.oldPassword, user.Password)
            if (match) {
                var newPass = data.newPassword
                var hash = await hashPassword(newPass)
                var email = data['Email']
                var query = { "Email": email }
                update = {
                    $set: { "Password": hash }
                }
                const userData = new Promise((resolve, reject)=>{
                    User.updateOne(query, update, (err, newUser) => {
                        if (err){
                            reject(err)
                        }
                        resolve(newUser)
                    });
                });
                return res.status(200).json({ status: 200, data: userData, message: "Password Reset Successfully", error: null });

            } else {
                return res.status(200).json({ status: 200, data: user, message: "Wrong Old Password", error: "Wrong Old Password" });

            }
        }
        return res.status(404).json({ status: 404, data: null, message: "User Not Found", error: "User Not Found" });
    } catch (e) {
        return res.status(400).json({ status: 400, message: e.message, error: e.message });
    }
}
// exports.userTokenVerify = async function (req, res, next) {
//     // Validate request parameters, queries using express-validator
//     // var data = req.body
//     try {
//         var user = await UserService.getUserByEmail(req.params.email)
//         console.log(user)
//         if (user) {
//             const id = user['_id']
//             const secret = user.Password + '-' + user.CreatedAt
//             var token = req.params.token
//             try {
//                 var decoded = jwt.verify(token, secret);
//                 console.log(decoded)
//                 return res.status(200).json({ status: 200, data: user, token: token, message: "User Verfied", error: null });
//               } catch(err) {
//                 return res.status(404).json({ status: 404, data: null, token: token, message: "User Token not Valid", error: null });

//               }
//         }
//         return res.status(404).json({ status: 404, data: null, message: "User Not Found", error: "User Not Found" });
//     } catch (e) {
//         return res.status(400).json({ status: 400, message: e.message, error: e.message });
//     }
// }