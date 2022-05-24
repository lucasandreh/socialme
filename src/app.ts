import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import router from './routes';
import errorHandler from './middlewares/ErrorHandler';

const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);

export default app;
