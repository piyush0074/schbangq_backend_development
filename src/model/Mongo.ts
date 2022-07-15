import mongoose from 'mongoose';
import logger from "../loaders/Logger";
import config from "../config";

const User = require('./User')
const Book = require('./Book');


export class Mongodb {
    static gameConfig: any = {}
    init(): Promise<void> {
        return new Promise(async (resolve, reject) => {
            logger.info('Mongodb init.');
            try {
                const mongoDB = config.DatabaseURL;
                logger.info("URI : " + mongoDB)
                await mongoose.connect(mongoDB);
                const db = mongoose.connection;

                db.on('error',
                    // tslint:disable-next-line:no-console
                    console.error.bind(console, 'MongoDB connection error:'));
                return resolve();
            } catch (err) {
                logger.error('Initialize mongodb failed. ' + err)
                return reject(err);
            }
        });
    }

    getUser(userId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = await User.findOne({ userId });
                if (user !== null) return resolve(user)
                return reject(null)
            } catch (err) {
                logger.error('Error while fetching user data. ' + err)
            }
        })
    }

    setUser(userId: string, password: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const user = new User({
                    "userId": userId,
                    "password": password
                });
                await user.save()
                return resolve(user)
            } catch (err) {
                logger.error('Error while saving user data. ' + err)
            }
        })
    }

    getBook(flag: boolean, bookId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            let data: any;
            try {
                logger.silly(flag)
                if(flag) {
                    data = await Book.find({
                        isBookDeleted: false
                    });
                } else {
                    logger.silly(bookId)
                    data = await Book.findOne({
                        _id: bookId,
                        isBookDeleted: false
                    })
                }
                logger.silly(data)
                if( data !== null) return resolve(data)
                return reject(null)
            } catch(err) {
                return reject(err)
            }
        })
    }

    async setBook(bookData: any): Promise<any> {
        return new Promise(async (resolve, reject) => {
            logger.silly('saving new book in db')
            let data: any;
            try {
                data = await Book.create({
                    ...bookData
                })
                return resolve(true)
            } catch(err){
                return reject(err)
            }
        })
    }

    deleteBook(bookId: string, userId: string): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                const data = await Book.findOne({
                        _id: bookId,
                        uploadedBy: userId,
                        isBookDeleted: false
                })
                if(data === null ) return reject(null)
                return resolve(data)
            } catch(err) {
                return reject(err)
            }
        })
    }
}