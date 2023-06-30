const mongoose=require('mongoose');

const DBConnect=async ()=>{
    try {
        if(!process.env.MONGODB_URL) return new Error('mongoDB url is missing') 
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connected')
    } catch (error) {
        return new Error('Not able to connect Database')
    }
} 

module.exports={
    DBConnect:DBConnect
}
