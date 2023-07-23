const { AddApplication, GetApplications, UpdateApplication , GetApplication } = require('../controllers/ApplicationController');
const { signUp, login, logout } = require('../controllers/Auth');
const { AddImages, getImages, deleteImage } = require('../controllers/ImageController');
const { AuthCheck } = require('../middleware/Auth');
const upload = require('../util/MulterStorage');

const router = require('express').Router();

router.get('/application',[AuthCheck],GetApplications);
router.get('/application/:key',[AuthCheck],GetApplication);
router.post('/application',[AuthCheck],AddApplication);
router.put('/application',[AuthCheck],UpdateApplication);

router.post('/image',[AuthCheck,upload.array('image')],AddImages);
router.get('/image',[AuthCheck],getImages)
router.delete('/image/:id',[AuthCheck],deleteImage)


router.post('/signup',signUp);
router.post('/login',login);
router.get('/logout',[AuthCheck],logout);







module.exports = router;