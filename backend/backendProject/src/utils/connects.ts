import mongoose from 'mongoose';
import { DB } from '../config';
export const connectDb = async () => {
  try{
       

    
    const DB ="mongodb://127.0.0.1:27017/ProjectManagement"
    await mongoose.connect(DB,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify:false,
      
       
    })
    console.log(`MongoDB Connected `)
} catch (error) {
  console.error(error )
        process.exit(1)
}
};

