const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const url = require('url');

const directory = 'uploads';


 const ImageProcessing = async (file,id) => {
    return new Promise(async (resolve, reject) => {
        if (!file) {
            return reject(new Error('Check request body'));
        }
        let imageDir = path.join(__dirname,'../', directory);

        fs.access(imageDir, (error) => {
            if (error) {
                return reject(error);
            }
        })
        let imageName = `${id}.webp`;
        try {
            await sharp(file.buffer)
                .resize({
                    fit: 'contain',
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .webp({quality:40})
                .toFile(`${imageDir}/${imageName}`);

            let url = `/image/${imageName}`
            return resolve(url);

        } catch (error) {
            return reject(error);
        }
    })
}

 const UnlinkImage = (imageUrl) => {
    return new Promise((resolve, reject) => {
        const imagePath = url.parse(imageUrl, true);
        const image = path.join(__dirname,`../assets/${imagePath.pathname}`);
        fs.unlink(image,function(err){
           resolve(true);
       }); 
    })
}

module.exports={
    ImageProcessing:ImageProcessing,
    UnlinkImage:UnlinkImage
}
