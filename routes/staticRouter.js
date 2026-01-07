const express = require('express');
const URL = require('../models/url_model.js');
const router = express.Router();

router.get('/', async (req, res) => {
    const allUrls = await URL.find({})
    console.log(allUrls.map(url => url.shortId));
    return res.render('home', {
        urls: allUrls
    })
})

module.exports = router;