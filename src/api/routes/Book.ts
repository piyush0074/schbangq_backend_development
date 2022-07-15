import { Router } from 'express';
import { Book } from '../../controller/Book';
import middleware  from '../middlewares';

const route = Router();

export default ( app: Router) => {
    app.use('/book',route);
    const book = new Book();

    route.get(
        '/getbook',
        middleware.AuthReqValidate.auth,
        (req,res) => {
            book.getBook(req,res)
        }
    )

    route.post(
        '/addbook',
        middleware.BookReqValidate.addBookRequestValidate,
        middleware.AuthReqValidate.auth,
        (req,res) => {
            book.addBook(req,res)
        }
    )

    route.delete(
        '/deletebook',
        middleware.BookReqValidate.deleteBookRequestValidate,
        middleware.AuthReqValidate.auth,
        (req,res) => {
            book.deleteBook(req,res)
        }
    )

    route.patch(
        '/updatebook',
        middleware.BookReqValidate.updateBookRequestValidate,
        middleware.AuthReqValidate.auth,
        (req,res) => {
            book.UpdateBook(req,res)
        }
    )

    route.post('/')
}