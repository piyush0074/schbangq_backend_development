import { Request, Response } from 'express';
import config from '../config';
import { BadRequestResponse, SuccessMsgResponse, SuccessResponse } from '../core/APIresponse';
import logger from '../loaders/Logger';
import { Server } from '../loaders/Server';

export class Book {

    public async getBook(req: Request, res: Response) {
        const bookId: string = String(req.query.bookId) || null;
        let bookData: any;
        try {
            if(bookId === null) {
                bookData = Server.instance.mongodb.getBook(
                    true,
                    ''
                )
            } else {
                
                bookData = Server.instance.mongodb.getBook(
                    false,
                    String(req.query.bookId)
                    );

                this.getDiscountPrice(
                    req,
                    bookData
                )
            }
            return new SuccessResponse('result found...',bookData).send(res)
        } catch(err) {
            logger.error(err);
            return new BadRequestResponse(err).send(res);
        }

    }

    private getDiscountPrice(req:Request, bookData: any) {
        let couponCode: string = String(req.query.couponCode)
        let discountedPrice: number = 0;
        if(couponCode === config.CouponCode) {
            discountedPrice = Math.ceil((bookData * config.CouponDiscount) / 100);
            bookData['afterDiscount'] = bookData.price - discountedPrice;
        }
    }
    public async addBook(req: Request, res: Response) {
        let book;
        let param = {
            title: req.body.title,
            author: req.body.author,
            dateOfPublication: new Date(req.body.dateOfPublication),
            chapters: req.body.chapters,
            price: req.body.price,
            uploadedBy: req.body.userId
        }
        try {
            book = await Server.instance.mongodb.setBook(param);
            return new SuccessMsgResponse('book added successfully').send(res)
        } catch(err) {
            logger.error(err);
            return new BadRequestResponse(err).send(res)
        }
    }

    public async deleteBook(req: Request, res: Response) {
        let data:any;
        try {
            data = Server.instance.mongodb.deleteBook(
                String(req.query.bookId),
                String(req.query.userId)
            )
        } catch(err) {
            logger.error(err)
            return new BadRequestResponse(err).send(res)
        }
    }
}