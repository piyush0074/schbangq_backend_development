import { Request, Response } from 'express';
import config from '../../config';
import { BadTokenError, TokenExpiredError } from '../../core/APIerror';
import { verify } from 'jsonwebtoken';
import logger from '../../loaders/Logger';
import { BadRequestResponse } from '../../core/APIresponse';

export class AuthReqValidate{

    public static auth(req: Request, res: Response, next: any) {
        const user = req.query.userId || req.body.userId;

        let token:any;
logger.debug(user)
        if (
          (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
          (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
            logger.debug(token)
        } else {
          logger.error('token not found..')
          return new BadRequestResponse('Token not found').send(res)
        }
        // token verify
        verify(token,config.jwtSecret, (err:any,decoded:any) =>{
          if(err){

            if (err.message === 'jwt expired'){

              throw new BadRequestResponse('Token expired').send(res);
            }
            throw new BadTokenError();

          } else {
            logger.debug('d : ',decoded)
            logger.debug('u : ',user);
            if( decoded.userId === user){
              logger.debug('Token verifed')
              next()

            } else {
              logger.debug('Token verified failed')
              return new BadRequestResponse('Inavild token or userId').send(res);

            }
          }
        });
    }
}