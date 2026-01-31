const validUrl = require('valid-url');
const Url = require('../models/Url');
const generateShortCode = require('../utils/generateCode');

const BASE_URL= process.env.BASE_URL || `http://localhost:${process.env.PORT || 5000}`;

//POST/api/shorten
async function createShortUrl(req, res){
try{
    const {originalUrl} = req.body;
    if (!originalUrl || !validUrl.isWebUri(originalUrl)){
        return res.status(400).json({error: 'Please provide a valid URL.'});
    }

    //if URL alredy shortened existing record will be used
    let existing = await Url.findOne({originalUrl});
    if (existing) {
        return res.status(200).json({
            id: existing._id,
            originalUrl: existing.originalUrl,
            shortUrl: `${BASE_URL}/${existing.shortCode}`,
            clicks: existing.clicks,
            createdAt: existing.createdAt,
        });
    }

    //generate a unique short code
    let shortCode;
    let duplicate = true;

    while (duplicate) {
        shortCode = generateShortCode();
        const found = await Url.findOne({ shortCode});
        duplicate = !!found;
    }

    const url = await Url.create({originalUrl, shortCode});

    return res.status(201).json({
        id: url._id,
        originalUrl: url.originalUrl,
        shortUrl: `${BASE_URL}/${url.shortCode}`,
        clicks: url.clicks,
        createdAt: url.createdAt,
    });
} catch (err){
    console.error('Error creating short URL:',err);
    return res.status(500).json({error:'Server error. Please try again'});
}
}

//GET/api/urls
async function getAllUrls(req,res){
    try{
        const urls = await Url.find().sort({ createdAt: -1}).lean();
        const mapped = urls.map((u)=>({
            id: u.id,
            originalUrl: u.originalUrl,
            shortUrl: `${BASE_URL}/${u.shortCode}`,
            clicks: u.clicks,
            createdAt: u.createdAt,
        }));
        return res.json(mapped);
    } catch (err) {
        console.error('Error fetching URLs', err);
        return res.status(500).json({ error: 'Server error. Please try again'});
    }
}

//GET/:shortCode
async function handleRedirect (req,res){
    try {
        const {shortCode} = req.params;

        const url = await Url.findOne({shortCode});
        if (!url){
            return res.status(404).json({error:'Short URL not found.'});
        }

        url.clicks += 1;
        await url.save();

        return res.redirect(url.originalUrl);
    } catch (err){
        console.error('Error handling redirect:', err);
        return res.status(500).json({error: 'Server error. Please try again'});
    }
}

//DELETE/api/urls/:id
async function deleteUrl(req,res){
    try{
        const {id} = req.params;
        const deleted = await Url.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({error: 'URL not found.'});
        }
        return res.status(204).send();
    } catch (err){
      console.error('Error deleting URL:', err);
      return res.status(500).json({ error: 'Server error. Pleasetry again.'});
    }
  
}

module.exports ={
    createShortUrl,
    getAllUrls,
    handleRedirect,
    deleteUrl,
};