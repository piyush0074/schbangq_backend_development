require('dotenv').config();
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
                // tslint:disable-next-line:no-console
                // console.log('url : ',mongoDB);
                logger.info("URI : " + mongoDB)
                await mongoose.connect(mongoDB);
                const db = mongoose.connection;
                // Bind connection to error event (to get notification of connection errors)

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
                user.save()
                return resolve(user)
            } catch (err) {
                logger.error('Error while saving user data. ' + err)
            }
        })
    }

    getBook(flag: boolean, bookId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            let data: any;
            try {
                if(flag) {
                    const a = 0;
                    data = Book.findAll();
                } else {
                    data = Book.findOne({
                        where: {
                            bookId,
                            isBookDeleted: false
                        }
                    })
                }
                if( data !== null) return resolve(data)
            } catch(err) {
                return reject(err)
            }
        })
    }

    setBook(bookData: any): Promise<any> {
        return new Promise((resolve, reject) => {
            let data: any;
            try {
                data = Book.create({
                    bookData
                })
            } catch(err){
                return reject(err)
            }
        })
    }

    deleteBook(bookId: string, userId: string): Promise<any> {
        return new Promise((resolve, reject) => {
            try {
                Book.update({
                    isBookDeleted: true
                },
                {
                    where: {
                        bookId: bookId,
                        uploadedBy: userId
                    }
                })
                return resolve(true)
            } catch(err) {
                return reject(err)
            }
        })
    }
}