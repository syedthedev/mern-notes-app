import express from 'express';
import cors from 'cors';
import cookireParser from 'cookie-parser';
import mongoose from 'mongoose';
import  dotenv from "dotenv";
import userRoute from './Routes/userRoute.js';

dotenv.config();
const PORT = process.env.PORT;
const allowedOrigins = ['http://localhost:5173'];

// App
const app = express();

// Database 
mongoose.connect(`${process.env.MONGODB_URI}/mern_notes`)
        .then(() => console.log('Database Connected'))
        .catch(() => console.log('Database Not Connected'));
        
// Cors
app.use(cors({ credentials : true,origin : allowedOrigins}));

// Body-Parser
app.use(express.json());
app.use(express.urlencoded({ extended : false}));

// Cookies
app.use(cookireParser());

// Routes
app.use('/api/user',userRoute);

app.listen(PORT,() => console.log(`Server is running on http://localhost:${PORT}`));