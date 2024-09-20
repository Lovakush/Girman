const mongoose = require('mongoose');

// const MONGO_URI = process.env.MONGO_URI || "mongodb://random:password@localhost:27017/girma"
mongoose.connect('mongodb+srv://lovakush:UePkg22o1rlHX6u2@cluster0.cmyo8kw.mongodb.net/girman');

const UserSchema = new mongoose.Schema({
    first_name : "String",
    last_name : "String",
    city : "String",
    contact_number : Number
})

const ImageSchema = new mongoose.Schema({
    profileImage : "String",
})

const User = mongoose.model('User', UserSchema);
const Image = mongoose.model('Image', ImageSchema);

module.exports = {
    User,
    Image
}