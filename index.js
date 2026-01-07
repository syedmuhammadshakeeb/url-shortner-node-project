const exprees = require('express');
const path = require('path');
const urlRouter = require('./routes/url_router.js');
const { connectToDB } = require('./connect.js');
const staticRouter = require('./routes/staticRouter.js');
const URL = require('./models/url_model.js');
const { timeStamp } = require('console');
const app = exprees();
const PORT = 5000;

connectToDB('mongodb://localhost:27017/urlShortenerDB');
app.use(exprees.json());
app.use(exprees.urlencoded({ extended: true }));
app.use('/Url', urlRouter);
app.use('/', staticRouter)
app.set('view engine', 'ejs')
app.set('views', path.resolve('./views'))




app.get('/Url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId: shortId }, {
        $push: {
            visitHistory: {
                timeStamp: Date.now()
            }
        }
    })
    res.redirect(entry.redirectUrl);

})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
