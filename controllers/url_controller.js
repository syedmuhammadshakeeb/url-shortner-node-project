const nanoId = require('nanoid');
const URL = require('../models/url_model.js')
async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body.URL) return res.status(400).json({ error: 'URL is required' });
    const shortId = nanoId.nanoid(8);
    await URL.create({
        shortId: shortId,
        redirectUrl: body.URL,
        visitHistory: []
    })

    return res.json({ shortId: shortId });
};

async function handleAnatlytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({ shortId: shortId });
    if (!result) return res.status(404).json({ error: 'Short URL not found' });
    return res.json({ clicks: result.visitHistory.length, visitHistory: result.visitHistory });

}

module.exports = {
    handleGenerateShortURL,
    handleAnatlytics
}