import { Router } from 'express';
import user from "./routes/User";
import book from "./routes/Book";

export default () => {
    const app = Router();
    book(app)
    user(app)
    return app;
}