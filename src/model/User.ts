import mongoose from 'mongoose';
const Schema = mongoose.Schema;


const userInfoSchema = new Schema({
    userId: {
        type: String,
        unique: true,
        null: false
    },
    password: {
        type: String
    },
    numOfBooksPurchased:{
        type: Number,
        default: 0
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

const Users = mongoose.model('user', userInfoSchema);

module.exports = Users;