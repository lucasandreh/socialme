import express from 'express';
import 'express-async-errors';
import 'dotenv/config';
import router from './routes';
import errorHandler from './middlewares/ErrorHandler';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
