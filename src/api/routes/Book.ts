import { Router } from 'express';
import { Book } from '../../controller/Book';
import middleware  from '../middlewares';
import multer from 'multer';

const route = Router();

export default ( app: Router) => {
    app.use('/book',route);
    const book = new Book();

    const storage = multer.diskStorage({
        destination (req, file, cb) {
            cb(
                null,
                './public/uploads/'
            )
        },

        filename (req: any, file: any, cb: any) {
            cb(
                null,
                file.image
             )
        }
    });

    const fileFilter = (req: any,file: any,cb: any) => {
        if(file.mimetype === "image/jpg"  ||
           file.mimetype ==="image/jpeg"  ||
           file.mimetype ===  "image/png"){

        cb(null, true);
       }else{
          cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
    }
    }

    const upload = multer({storage, fileFilter});

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
        // upload.array('image',1),
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

}