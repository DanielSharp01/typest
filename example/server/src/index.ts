import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { expressMW } from './routes_impl';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use(expressMW);

app.listen(4000, () => {
  console.log('Listening on http://localhost:4000');
});
