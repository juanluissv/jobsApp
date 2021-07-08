import '../env';
import path from 'path';
import express from 'express';
import { json, text, urlencoded } from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import expressPino from 'express-pino-logger';
import logger from '../logger';
import routes from './routes';
import swagger from './swagger';
import errorHandler from './middlewares/error.handler';

const { CLIENT_URL, REQUEST_LIMIT = '100kb' } = process.env;

const app = express();

app.use(expressPino({ logger }));
app.use(json({ limit: REQUEST_LIMIT }));
app.use(urlencoded({ extended: true, limit: REQUEST_LIMIT }));
app.use(text({ limit: REQUEST_LIMIT }));
app.use(cors({ origin: CLIENT_URL, credentials: true }));
swagger(app);
app.use(cookieParser());
app.use('/api/v1', routes);
app.use(express.static(path.join(__dirname, 'static')));
app.use(errorHandler);

export default app;
