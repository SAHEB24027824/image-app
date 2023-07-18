const { AddApplication, GetApplications, UpdateApplication , GetApplication } = require('../controllers/ApplicationController');
const { signUp, login, logout } = require('../controllers/Auth');
const { AddImages, getImages, deleteImage } = require('../controllers/ImageController');
const upload = require('../util/MulterStorage');

const router = require('express').Router();

router.get('/application',GetApplications);
router.get('/application/:key',GetApplication);
router.post('/application',AddApplication);
router.put('/application',UpdateApplication);

router.post('/image',upload.array('image'),AddImages);
router.get('/image',getImages)
router.delete('/image/:id',deleteImage)


router.post('/signup',signUp);
router.post('/login',login);
router.get('/logout',logout);






module.exports = router;