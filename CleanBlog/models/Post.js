const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: String,
    detail: String,
    dateCreated: {
        type: Date,
        default: Date.now
    }
})

module.exports.Post = mongoose.model("Post", PostSchema);