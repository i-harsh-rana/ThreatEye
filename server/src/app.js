import express, { request } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import trafficRouter from './routes/trafficLog.route.js'
import alertRouter from './routes/alert.route.js'

const app = express();

app.use(cors({
  origin: process.env.CORS_ORIGIN,  
  credentials: true,                
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

app.use(express.static('public'));

app.use(cookieParser());

app.use('/api/traffic', trafficRouter);
app.use('/api/alert', alertRouter);

export { app };
