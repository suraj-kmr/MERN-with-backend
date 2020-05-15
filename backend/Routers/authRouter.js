var express = require('express');
var router = express.Router();
var multer = require('multer')
var config = require('../config');
const DIR = '../public/img/users';
var path = require('path');
const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, DIR);
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });



// Schema
const User = require('../schemas/users');

// Home page route.
router.get('/', function (req, res) {
    User.create({
        "first_name": "Admin",
        "last_name": "Panel",
        "email": "admin@gmail.com",
        "address": "",
        "phone": "9534033101",
        "password": config.md5("123456"),
        "profile_pic": "assad.jpg",
        "role": "Admin"
    })
    res.send({ "status": true, "message": "Admin created successfully" });
})

// authenticate API.
router.post('/authenticate', function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let role = req.body.role;
    if (!req.body.email) {
        return res.status(400).json({ "success": false, "message": "Email field can not blank." })
    }
    if (!req.body.password) {
        return res.status(400).json({ "success": false, "message": "Password field can not blank." })
    }
    if (!req.body.role) {
        return res.status(400).json({ "success": false, "message": "Role field can not blank." })
    }
    User.findOne({ "email": email, "role": role }, function (error, user) {
        if (user) {
            var encrypt_pass = config.md5(password);
            if (encrypt_pass === user.password) {
                var token = config.jwt.sign({
                    'id': user.id,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }, config.secretToken, { expiresIn: '2h' });
                return res.status(200).json({ "success": true, "accessToken": token, "message": "user logged in successfully." });
            }
            else {
                return res.status(400).json({ "success": false, "message": "Password is not correct" })
            }
        }
        else {
            return res.status(401).json({ "success": false, "message": "Unauthorised admin." })
        }
    })
})

// User Profile 
router.get('/user-profile', function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        User.findById(decoded.id, function (err, result) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!result) return res.status(404).send({ success: false, message: "No user found." });

            return res.status(200).send({ success: true, users: result, message: 'Profile fetch successfully.' }); //Comment this out!
            // next(result); // add this line
        });
    });


})

// User Profile update
router.post('/profile-update', function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    // let first_name = req.body.first_name;
    // let last_name = req.body.last_name;
    // let phone = req.body.phone;
    // let address = req.body.address;

    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        User.findByIdAndUpdate(decoded.id, req.body, function (err, post) {
            if (err) return res.status(400).send({ success: false, message: 'Something went wrong.' });
            return res.status(200).send({ success: true, users: req.body, message: 'Profile updated successfully.' });
        });
    });
})

// Change Password
router.post('/change-password', function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    let new_password = req.body.new_password;
    let confirm_password = req.body.confirm_password;

    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        else if (new_password !== confirm_password) {
            return res.status(400).send({ success: false, message: 'New and Confirm password is not matched.' });
        }
        else {
            User.findByIdAndUpdate(decoded.id, { password: config.md5(new_password) }, function (err, post) {
                if (err) return res.status(400).send({ success: false, message: 'Something went wrong.' });
                return res.status(200).send({ success: true, message: 'Password updated successfully.' });
            });
        }
    });
})

// Change Password
router.post('/upload-profile', upload.single('profile_pic'), function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });
    var img = {
        profile_pic: req.file.filename
    }

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        User.findByIdAndUpdate(decoded.id, img, function (err, result) {
            if (err) return res.status(500).send("There was a problem finding the user.");
            if (!result) return res.status(404).send({ success: false, message: "No user found." });
            res.status(200).send({ success: true, message: 'Profile pic updated successfully.' }); //Comment this out!
        });
    });
})

router.get('/token-verify', function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        return res.status(200).send({ success: true, users: decoded, message: 'Profile fetch successfully.' }); //Comment this out!
    });
})

// Logout API
router.post('/logout', function (req, res) {
    return res.status(200).json({ success: true, token: null, message: 'You have logout successfully.' });
})
module.exports = router;