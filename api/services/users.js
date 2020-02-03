var User = require('../../models/users')
var bcrypt = require('bcrypt')
async function hashPassword(user) {

    const password = user.Password
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
            if (err) reject(err)
            resolve(hash)
        });
    })

    return hashedPassword
}

async function checkUser(username, password) {
    const userData = await new Promise((resolve, reject) => {
        User.findOne({ "PhoneNumber": username }).exec(async (err, user) => {
            if (err) {
                reject(err)
            }
            resolve(user)
        });
    });
    // console.log(userData)
    return userData
}

exports.getUsers = async function (query) {
    // Getting All Users
    try {
        var users = await User.find(query)
        return users;
    } catch (err) {
        throw err
    }
}

exports.addUser = async function (data) {
    // Adding User to Database
    var newUser = new User(data)
    try {
        console.log(newUser)
        hash = await hashPassword(newUser)
        console.log("hash: " + hash)
        newUser.Password = hash
        newUser.save((err) => {
            if (err) {
                throw err
            }
            console.log("User Added")
        });
        return newUser
    } catch (err) {
        throw err
    }
}
exports.userLogin = async function (data) {
    // Adding User to Database
    try {
        var username = data.PhoneNumber
        var password = data.Password
        var user = await checkUser(username, password)
        return user
    } catch (err) {
        throw err
    }
}
exports.findUser =  async function(username, email){
    try{
        var user = await User.find({$or:[ {"PhoneNumber": username}, {"Email": email} ]})
        return user
    }catch(err){
        throw err
    }
}
exports.getUserEmail = async function(username){
    try{
        var user = new Promise((resolve, reject)=>{
            User.findOne({"PhoneNumber": username}).exec((err, data)=>{
                if(err){
                    reject(err)
                }
                resolve(data)
            })
        });
        return user
    }catch(err){
        throw err
    }
}
exports.getUserByEmail = async function(email){
    try{
        var user = new Promise((resolve, reject)=>{
            User.findOne({"Email": email}).exec((err, data)=>{
                if(err){
                    reject(err)
                }
                resolve(data)
            })
        });
        return user
    }catch(err){
        throw err
    }
}