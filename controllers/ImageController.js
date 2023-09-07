const { Image } = require("../models/Image");
const { ImageProcessing, UnlinkImage } = require('../util/ImageProcessing')

const AddImages = async (req, res) => {
    let imageArray = [];
    try {
        if (!req.files || !req.body) return res.status(400).send({ success: false, message: 'Please send proper request 1' });
        const { applicationKey, categoryKey, name, width, height, quality,resizeOption } = req.body;
        for (let file of req.files) {
            let newImage = new Image();
            const url = await ImageProcessing(file, newImage._id, { width, height, quality , resizeOption });
            newImage.width = width;
            newImage.height = height;
            newImage.resizeOption=resizeOption,
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
        for (let image of imageArray) {
            UnlinkImage(image.url)
        }
        return res.status(500).send({ success: false, message: error.message });
    }
}

const getImages = async (req, res) => {
    try {
        let { applicationKey, categoryKey, searchText } = req.query;
        let query = {};

        //=======OR Conditions===========//
        if (searchText) {
            let orQuery = []
            if (searchText && searchText.match(/^ *$/) == null) {
                searchText = searchText.trim()
                let searchTextArray = searchText.split(' ')
                searchTextArray = searchTextArray.map((text) => `${text}`)
                let regex = new RegExp(searchTextArray.join("|"), "gi");

                orQuery.push({ name: { $regex: regex } });
                orQuery.push({ width: { $regex: regex } });
                orQuery.push({ height: { $regex: regex } });
                orQuery.push({ quality: { $regex: regex } });
                orQuery.push({ url: { $regex: regex } });

            }
            query = { $or: orQuery };
        }

        //========AND Conditions=============//
        if (applicationKey || categoryKey) {
            applicationKey && (Object.keys(query).length > 0 ? query = { ...query, applicationKey: applicationKey } : query = { applicationKey: applicationKey })
            categoryKey && (Object.keys(query).length > 0 ? query = { ...query, categoryKey: categoryKey } : query = { categoryKey: categoryKey })
        }
        const result = await Image.find(query,null,{sort:{_id:-1}});

        if (result && result.length > 0) return res.status(200).send({ success: true, result, message: 'Images found', query });
        return res.status(200).send({ success: false, message: 'Images not found!' });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}


const deleteImage = async (req, res) => {
    try {
        let { id } = req.params;
        let image = await Image.findOne({_id:id})
        const result = await Image.deleteOne({_id:id});
        UnlinkImage(image?.url)
        if (result) return res.status(200).send({ success: true, result, message: 'Images Deleted' });

    } catch (error) {
        return res.status(500).send({ success: false, message: error.message });
    }
}

module.exports = {
    AddImages: AddImages,
    getImages: getImages,
    deleteImage:deleteImage
}