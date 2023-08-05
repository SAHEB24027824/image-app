const { Schema, model, models } = require("mongoose");

const ApplicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    key: {
        type: String,
        required: true
    },
    category: [
        {
            name: {
                type: String,
                required: true
            },
            key: {
                type: String,
                required: true
            }
        }
    ]
},{ collection : 'applications' })
const Application = models?.application || model('application', ApplicationSchema);

module.exports = {
    Application: Application
}