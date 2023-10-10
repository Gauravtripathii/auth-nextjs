import mongoose from "mongoose";
import "dotenv/config";
export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!.toString());
        const connection = mongoose.connection;

        connection.on('connected', ()=>{
            console.log('MongoDB connected successfully!');
        });

        connection.on('error', (err) => {
            console.log('MongoDB connection failed : ' + err);
        })
    } catch (error) {
        console.log('An error occurred while connecting to MongoDB');
        console.log(error);
    }
}