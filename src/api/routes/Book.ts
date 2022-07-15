import { Router } from 'express';
import { Book } from '../../controller/Book';
import logger from '../../loaders/Logger';
import middleware  from '../middlewares';

const route = Router();

export default ( app: Router) => {
    app.use('/book',route);
    const book = new Book();

    route.get(
        '/getbook',
        // middleware.UserReqValidate.registerRequestValidate,
        (req,res) => {
            book.getBook(req,res)
        }
    )

    route.post(
        '/addbook',
        // middleware.UserReqValidate.loginRequestValidate,
        (req,res) => {
            book.addBook(req,res)
        }
    )

    route.delete(
        '/deletebook',
        (req,res) => {
            book.deleteBook(req,res)
        }
    )

    route.patch(
        '/updatebook',
        (req,res) => {
            book.UpdateBook(req,res)
        }
    )

    route.post('/')
}