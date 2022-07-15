import { Router } from 'express';
import { User } from '../../controller/User';
import middleware  from '../middlewares';

const route = Router();

export default ( app: Router) => {
    app.use('',route);
    const user = new User()
    route.post(
        '/register',
        middleware.UserReqValidate.registerRequestValidate,
        (req,res) => {
            user.registerUser(req,res)
        }
    )

    route.post(
        '/login',
        middleware.UserReqValidate.loginRequestValidate,
        (req,res) => {
            user.login(req,res)
        }
    )


    route.post('/')
}