const { Schema, model, models } = require("mongoose");

const ApplicationSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    categories: [
        {
            name: {
                type: String,
                required: true
            }
        }
    ]
})
const Application = models?.application || model('application', ApplicationSchema);

module.exports = {
    Application: Application
}