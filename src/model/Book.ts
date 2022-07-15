
import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const bookSchema = new Schema({
    _id: {
        type: false,
    },
    bookId: {
        type: String,
        primaryKey: true
    },
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
        type: [Schema.Types.Mixed]
    },
    chapters: {
        type: [Schema.Types.Mixed]
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

const Users = mongoose.model('book', bookSchema);

module.exports = Users;