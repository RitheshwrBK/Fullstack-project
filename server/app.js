import express from 'express';
import cors from "cors";



import { PORT } from './config/env.js';

import userRouter from './routes/user.routes.js'; 
import authRouter from './routes/auth.routes.js';
import subscriptionsRouter from './routes/subscriptions.routes.js';
import connectToDatabase from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcject.middleware.js';
import workflowRouter from './routes/workflow.routes.js';


const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(arcjetMiddleware);


app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionsRouter);
app.use('/api/v1/workflows', workflowRouter);



// health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running!" });
});



// Enable CORS for your React app
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json()); // Make sure this is also present




app.use(errorMiddleware);


app.get('/',(req,res) => {
    res.send("Welcome to my app ");
});

app.listen( PORT, async ()  => {
    console.log(`Enter the app at http://localhost:${PORT}`);

    await connectToDatabase()
});

export default app;
