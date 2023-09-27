const { Schema, model, models } = require("mongoose");

const ImageSchema = new Schema({
    applicationKey: {
        type: String,
        required: true
    },
    categoryKey: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    width: {
        type: String,
        required: true
    },
    height: {
        type: String,
        required: true
    },
    quality: {
        type: String,
        required: true
    },
    resizeOption:{
        type: String,
        required: true
    },
    background: {
        type: String,
        default: '{ r: 255, g: 255, b: 255, alpha: 0 }'
    }

},{ collection : 'images' })
const Image = models?.image || model('image', ImageSchema);

module.exports = {
    Image: Image
}