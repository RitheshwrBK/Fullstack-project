import mongoose from 'mongoose';

import { NODE_ENV, DB_URI } from '../config/env.js';
import { Code } from 'mongodb';

if (!DB_URI){
    throw new Error("Please define the MONGODB_URI environment variable inside .env<development/production>.local");
}

const connectToDatabase = async() => {
    try{
        await mongoose.connect(DB_URI);
        console.log(`DB connected to ${NODE_ENV} mode `);
    } catch(error){
        console.error("Error connecting to Database: ", error)

        process.exit(1)
    }

};

export default connectToDatabase;