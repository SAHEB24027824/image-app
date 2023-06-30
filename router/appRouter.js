const { AddApplication, GetApplications, UpdateApplication ,GetApplicationById } = require('../controllers/ApplicationController');
const { AddImages, getImages } = require('../controllers/ImageController');
const upload = require('../util/MulterStorage');

const router = require('express').Router();

router.get('/application',GetApplications);
router.get('/application/:id',GetApplicationById);
router.post('/application',AddApplication);
router.put('/application',UpdateApplication);

router.post('/image',upload.array('image'),AddImages);
router.get('/image/:applicationId?/:categoryId?',getImages)




module.exports = router;