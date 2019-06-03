var express = require('express');
var router = express.Router();
const { unlink } = require('fs-extra');
const path = require('path');


function loadImg() {
    router.get('/img', function(req, res) {
        res.sendfile('./img/FILE340.JPG','./img/FILE340.JPG','./img/FILE340.JPG');

    });
}

// Models
const Image = require('../models/Image');

router.get('/', async (req, res) => {
    loadImg();
    const images = await Image.find();
    console.log(images);
    res.render('index', { images });
});
router.post('/desc', async (req, res) => {
    const image = new Image();
    image.title = req.body.title;
    image.description = req.body.description;
    image.filename = req.file.filename;
    image.path = '/img/uploads/' + req.file.filename;
    image.originalname = req.file.originalname;
    image.mimetype = req.file.mimetype;
    image.size = req.file.size;

    await image.save();
    res.redirect('/');
});

router.get('/image/:id', async (req, res) => {
    const { id } = req.params;
    const image = await Image.findById(id);
    res.render('VistaUnica', { image });
});

router.get('/desc',(req,res)=>{
  res.render('descargas');
});
router.get('/image/:id/delete', async (req, res) => {
    const { id } = req.params;
    const imageDeleted = await Image.findByIdAndDelete(id);
    await unlink(path.resolve('./public' + imageDeleted.path));
    res.redirect('/');
});
module.exports = router;
