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
        const couponCode: string = String(req.query.couponCode)
        let discountedPrice: number = 0;
        if(couponCode === config.CouponCode) {
            discountedPrice = Math.ceil((bookData * config.CouponDiscount) / 100);
            bookData.afterDiscount = bookData.price - discountedPrice;
        }
    }
    public async addBook(req: Request, res: Response) {
        logger.info('adding new book')
        let book;
        const param = {
            title: req.body.title,
            author: req.body.author,
            dateOfPublication: new Date(req.body.dateOfPublication),
            chapters: req.body.chapters,
            price: req.body.price,
            uploadedBy: req.body.userId
        }
        const flag: boolean = await this.isUserExist(req.body.userId)
        if(!flag) {
            return new BadRequestResponse('User doesnt exist').send(res)
        }

        try {
            logger.silly(param.dateOfPublication)
            book = await Server.instance.mongodb.setBook(param);
            logger.debug('book adding')
            logger.debug(book)
            return new SuccessMsgResponse('book added successfully').send(res)
        } catch(err) {
            logger.error('Error in add book'+err);
            return new BadRequestResponse('Error in add book : '+err).send(res)
        }
    }

    private async isUserExist(userId: string): Promise<boolean> {
        logger.info("checking user exist or not")
        try {
            const user = await Server.instance.mongodb.getUser(userId)
            logger.silly('user found')
            return true;
        } catch (err) {
            logger.error('Error in user exist : '+err);
            return false
        }
    }

    public async UpdateBook(req: Request, res: Response) {
        let bookData: any;
        if(!this.isUserExist(req.body.userId)) {
            return new BadRequestResponse('User doesnt exist').send(res)
        }
        try {
            bookData = Server.instance.mongodb.getBook(
                false,
                String(req.query.bookId)
            );
            this.swapBookData(
                bookData,
                req
            );
            await bookData.save()
            return new SuccessMsgResponse('Book updation successfull').send(res)
        } catch(err) {
            return new BadRequestResponse(err).send(res)
        }
    }

    private swapBookData(bookData:any, req: Request) {
        bookData.title = req.body.title || bookData.title
        bookData.author = req.body.author || bookData.author
        bookData.dateOfPublication = req.body.dateOfPublication || bookData.dateOfPublication
        bookData.chapters = req.body.chapters || bookData.chapters
        bookData.price = req.body.price || bookData.price

    }
    public async deleteBook(req: Request, res: Response) {
        logger.info("deleting book")
        let bookData:any;
        try {
            bookData = await Server.instance.mongodb.deleteBook(
                String(req.query.bookId),
                String(req.query.userId)
            )
            bookData.isBookDeleted = true;
            await bookData.save()
            return new SuccessMsgResponse('Book deleted successfully').send(res)
        } catch(err) {
            logger.error("Error in deleting book : "+err)
            return new BadRequestResponse("Error in deleting book : "+err).send(res)
        }
    }
}