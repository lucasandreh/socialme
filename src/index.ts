import express from 'express';
import 'dotenv/config';
import router from './routes';

const app = express();
const PORT = process.env.PORT || 3333;

app.use(express.json());
app.use(router);

app.listen(PORT, () => console.log(`App is running on ${PORT}`));
