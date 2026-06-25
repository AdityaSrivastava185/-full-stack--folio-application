import mongoose from "mongoose"

export  const ConnectDB = async() => {
    if(mongoose.connection.readyState === 1){
        return;
    }
    if(!process.env.MONGODB_URI){
        throw new Error("Please connect to the mongodb")
    } else {
        await mongoose.connect(process.env.MONGODB_URI);
    }
}