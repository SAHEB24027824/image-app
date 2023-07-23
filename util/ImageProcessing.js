const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const url = require('url');

const directory = 'uploads';


const ImageProcessing = async (file, id, resize) => {
    return new Promise(async (resolve, reject) => {
        if (!file) {
            return reject(new Error('Check request body'));
        }
        let imageDir = path.join(__dirname, '../', directory);

        fs.access(imageDir, (error) => {
            if (error) {
                return reject(error);
            }
        })
        let imageName = `${id}.webp`;
        try {
            await sharp(file.buffer)
                .resize({
                    height: resize && resize?.height ? +resize?.height : 800,
                    width: resize && resize?.width ? +resize?.width : 800,
                    fit: resize.resizeOption,
                    background: { r: 255, g: 255, b: 255, alpha: 0 }
                })
                .webp({ quality: resize && resize?.quality ? +resize?.quality : 40 })
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
        const imagePathArray = imageUrl.split('/')
        const imageName = imagePathArray[imagePathArray?.length-1]
        const image = path.join(__dirname, `../${directory}/${imageName}`);
        fs.unlink(image, function (error) {
            if(error) return reject(false)
            return resolve(true);
        });
    })
}

module.exports = {
    ImageProcessing: ImageProcessing,
    UnlinkImage: UnlinkImage
}
