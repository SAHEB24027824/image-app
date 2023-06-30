const { Image } = require("../models/ImagesSchema");
const {ImageProcessing, UnlinkImage} = require('../util/ImageProcessing')

const AddImages = async(req,res)=>{
    let imageArray = [];
    try {
        if (!req.files || !req.body) return res.status(400).send({ success: false, message: 'Please send proper request 1' });
        const { applicationId, categoryId, name } = req.body;
        for (let file of req.files) {
            let newImage = new Image();
            const url = await ImageProcessing(file, newImage._id,);
            newImage.name = name;
            newImage.url = url;
            newImage.applicationId = applicationId;
            newImage.categoryId = categoryId;
            imageArray.push(newImage);
        }
        if (imageArray.length > 0) {
            const imageUploaded = await Image.insertMany(imageArray)
            return res.status(200).send({ success: true, message: 'Image Uploaded', data: imageUploaded })
        }
        else {
            return res.status(400).send({ success: false, message: 'Please send proper request 2' });
        }

    } catch (error) {
        for(let image of imageArray){
            UnlinkImage(image.url)
        }
        return res.status(500).send({ success: false, message: error.message });
    }
}

const getImages = async(req,res)=>{
    try {
    const { applicationId, categoryId } = req.params;  
    let query = {};
    if(applicationId && categoryId){
        query = {applicationId:applicationId,categoryId:categoryId}
    }
    const images = await Image.find(query);
    if(images && images.length>0) return res.status(200).send({success:true , result:images, message:'Images found' });
    return res.status(404).send({ success: false, message: 'Images not found!' }); 
        
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message }); 
    }
}

module.exports={
    AddImages:AddImages,
    getImages:getImages
}