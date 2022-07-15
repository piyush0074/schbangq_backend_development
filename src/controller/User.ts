import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { Server } from '../loaders/Server';
import logger from '../loaders/Logger';
import { BadRequestResponse, SuccessMsgResponse, SuccessResponse } from '../core/APIresponse';

import jwt from 'jsonwebtoken';
import config from '../config';

export class User {

    public async registerUser(req: Request, res: Response) {
        const password: string = await this.getHashPassword(req.body.password);
        try {
            const user = await Server.instance.mongodb.setUser(
                req.body.userId,
                password
            )
            return new SuccessMsgResponse('User register successfully').send(res)
        } catch(err) {
            logger.error(err)
            return new BadRequestResponse(err).send(res);
        }
    }

    public async login(req: Request, res: Response) {
        let token: string;
        try {
            const user = await Server.instance.mongodb.getUser(
                req.body.userId,
            )

            const validPassword = await bcrypt.compare(req.body.password, user.password);
            if (
                validPassword
            ) {
                token = this.generateToken(req.body.userId);
                return new SuccessResponse('Login in sccuessfull', {
                    token
                }).send(res);
            } else {
                return new BadRequestResponse('invalid password or userId').send(res);
            }
        } catch(err) {
            logger.error(err)
            return new BadRequestResponse('User doesnt exists. error : '+err).send(res);
        }
    }

    private generateToken(userId: string): string {
        const jwtSecretKey = config.jwtSecret;
        const data: {[id: string]: string} = {
            userId,
        }

        const token = jwt.sign(
            { userId },
            config.jwtSecret,
            { expiresIn: '2h' }
        );
        return token

    }
    private async getHashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10);

        const hashPassword = await bcrypt.hash(password, salt);
        return hashPassword
    }
}