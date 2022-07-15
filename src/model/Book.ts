
import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const chapterSchema = new Schema({
    chapterNo: {
        type: Number
    },
    chapterName: {
        type: String
    }
    }, {
    _id: false
})

const bookSchema = new Schema({
    title: {
        type: String
    },
    image: {
        data: Buffer,
        contentType: String
    },
    author: {
        type: String
    },
    dateOfPublication: {
        type: Date
    },
    chapters: {
        type: [chapterSchema]
    },
    price: {
        type: Number
    },
    uploadedBy: {
        type: String
    },
    isBookDeleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: new Date() // (Date.now() + (330 * 60 * 1000)).getTime()
    },
    updatedAt: {
        type: Date,
        default: new Date() // (Date.now() + (330 * 60 * 1000)).getTime()
    }
});

const Books = mongoose.model('book', bookSchema);

module.exports = Books;