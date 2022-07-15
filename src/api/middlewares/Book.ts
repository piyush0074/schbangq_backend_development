import { Request, Response } from 'express';
import Joi from 'joi';
import logger from '../../loaders/Logger';

import { BadRequestError } from '../../core/APIerror';
import { SuccessMsgResponse, SuccessResponse } from '../../core/APIresponse';

export class BookReqValidate{

    public static addBookRequestValidate(req: Request, res: Response, next: any) {

        // console.log(req)
        // logger.silly(req.)
        // return new SuccessResponse('',req.file).send(res)
        const schemaRules = {
            userId: Joi.string().min(5).max(15).required(),
            title: Joi.string().min(5).max(40).required(),
            author:  Joi.string().min(5).max(15).required(),
            dateOfPublication:  Joi.date(),// Joi.string().min(10).max(20).required(),
            chapters:  Joi.array().items(
                Joi.object({
                  chapterNo: Joi.number(),
                  chapterName: Joi.string().min(3).max(30).required()
                })
              ).required(),
            price:  Joi.number().min(10).required(),
            image: Joi.any()
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.body);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
        } else {
            logger.debug('param verified')
            next();
        }
    }

    public static updateBookRequestValidate(req: Request, res: Response, next: any) {
        const schemaRules = {
            userId: Joi.string().min(5).max(15).required(),
            bookId: Joi.string().min(5).max(40).required(),
            title: Joi.string().min(5).max(40).required(),
            author:  Joi.string().min(5).max(15).required(),
            dateOfPublication:  Joi.date(),
            chapters:  Joi.array().items(
                Joi.object({
                  chapterNo: Joi.number(),
                  chapterName: Joi.string().min(3).max(30).required()
                })
              ).required(),
            price:  Joi.number().min(10).required()
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.body);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
        } else {
            logger.debug('param verified')
            next();
        }
    }

    public static deleteBookRequestValidate(req: Request, res: Response, next: any) {
        const schemaRules = {
            userId: Joi.string().min(5).max(15).required(),
            bookId: Joi.string().min(5).max(40).required(),
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.query);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
        } else {
            logger.debug('param verified')
            next();
        }
    }
}