const { Image } = require("../models/Image");
const {ImageProcessing, UnlinkImage} = require('../util/ImageProcessing')

const AddImages = async(req,res)=>{
    let imageArray = [];
    try {
        if (!req.files || !req.body) return res.status(400).send({ success: false, message: 'Please send proper request 1' });
        const { applicationKey, categoryKey, name ,width,height,quality} = req.body;
        for (let file of req.files) {
            let newImage = new Image();
            const url = await ImageProcessing(file, newImage._id,{width,height,quality});
            newImage.width = width;
            newImage.height = height;
            newImage.quality = quality;
            newImage.name = name;
            newImage.url = url;
            newImage.applicationKey = applicationKey;
            newImage.categoryKey = categoryKey;
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
    const { applicationKey, categoryKey } = req.query;  
    let query = {};
    if(applicationKey || categoryKey){
        applicationKey && (Object.keys(query).length>0 ? query = {...query,applicationKey:applicationKey} :  query ={applicationKey:applicationKey})
        categoryKey && (Object.keys(query).length>0 ? query = {...query,categoryKey:categoryKey} :  query ={categoryKey:categoryKey})
    }
    const images = await Image.find(query);
    
    if(images && images.length>0) return res.status(200).send({success:true , result:images, message:'Images found',query });
    return res.status(404).send({ success: false, message: 'Images not found!' }); 
        
    } catch (error) {
        return res.status(500).send({ success: false, message: error.message }); 
    }
}

module.exports={
    AddImages:AddImages,
    getImages:getImages
}