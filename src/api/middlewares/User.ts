import { Request, Response } from 'express';
import Joi from 'joi';
import logger from '../../loaders/Logger';

import { BadRequestError } from '../../core/APIerror';

export class UserReqValidate{

    public static registerRequestValidate(req: Request, res: Response, next: any) {
        const schemaRules = {
            userId: Joi.string().min(5).max(15).required(),
            password: Joi.string().min(6).max(10).required()
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.body);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
        } else {
            next();
        }
    }

    public static loginRequestValidate(req: Request, res: Response, next: any) {
        const schemaRules = {
            userId: Joi.string().min(5).max(15).required(),
            password: Joi.string().min(6).max(10).required()
        }
        const schema = Joi.object(schemaRules);

        const { error, value } = schema.validate(req.body);

        if(error) {
            logger.error(JSON.stringify(error));
            throw new BadRequestError(JSON.stringify(error));
        } else {
            next();
        }
    }
}