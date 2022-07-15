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

        if (
          (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
          (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
        ) {
            token = req.headers.authorization.split(' ')[1];
        } else {
          logger.error('token not found..')
          return new BadRequestResponse('Token not found').send(res)
        }
        // token verify
        verify(token,config.jwtSecret, (err:any,decoded:any) =>{
          if(err){

            if (err.message === 'jwt expired'){

              throw new TokenExpiredError();
            }
            throw new BadTokenError();

          } else {
            // console.log('d : ',decoded.user)
            // console.log('u : ',user);
            if( decoded.user === user){

              next()

            } else {
              return new BadTokenError();

            }
          }
        });
    }
}