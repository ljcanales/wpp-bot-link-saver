const { Schema, model } = require('mongoose');

const ContactSchema = new Schema({
    number: {
        type: String,
        required: true
    },
    username: String,
    name: String,
    link: String
},
{
    collection: 'contact'
});

module.exports = model('contact', ContactSchema);