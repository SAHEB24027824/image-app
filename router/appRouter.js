const { AddApplication, GetApplications, UpdateApplication , GetApplication } = require('../controllers/ApplicationController');
const { AddImages, getImages } = require('../controllers/ImageController');
const upload = require('../util/MulterStorage');

const router = require('express').Router();

router.get('/application',GetApplications);
router.get('/application/:key',GetApplication);
router.post('/application',AddApplication);
router.put('/application',UpdateApplication);

router.post('/image',upload.array('image'),AddImages);
router.get('/image',getImages)




module.exports = router;