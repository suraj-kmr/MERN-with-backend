const express = require('express');
const router = express.Router();
const setting = require('../schemas/settings')
const config = require('../config')

router.get('/', function (req, res) {
    setting.findById('5ebe30c518ea852d24fff4dc', function(err, setting){
        if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
        return res.status(200).send({ success: true, setting: setting, message: 'setting fetch successfully.' });
    })
    // return res.status(200).send({ success: true, se message: 'setting created successfully.' });
})

router.get('/create', function (req, res) {
    setting.create({
        privacy_policy: '',
        terms_and_condition: '',
        about_us: '',
    })
    return res.status(200).send({ success: true, message: 'setting created successfully.' });
})

router.post('/save-setting', function (req, res) {
    var token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(401).send({ success: false, message: 'No token provided.' });

    config.jwt.verify(token, config.secretToken, function (err, decoded) {
        if (err) return res.status(400).send({ success: false, message: 'token expired please login again' });
        var filter = { _id: '5ebe30c518ea852d24fff4dc' };
        var update = { };
        if (req.body.privacy_policy) update.privacy_policy = req.body.privacy_policy;
        if (req.body.terms_and_condition) update.terms_and_condition = req.body.terms_and_condition;
        if (req.body.about_us) update.about_us = req.body.about_us;
        setting.findByIdAndUpdate('5ebe30c518ea852d24fff4dc', update, function (err, setting) {
            if (err) return res.status(400).send({ success: false, message: 'Something went wrong' });
            return res.status(200).send({ success: true, message: 'setting updated successfully.' });
        });
    });
})
module.exports = router;