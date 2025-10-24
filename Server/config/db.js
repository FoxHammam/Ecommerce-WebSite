
const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config();
    const ConnectDb = async ()=> { 
        try {
             await mongoose.connect(process.env.MONGO_URL )
                console.log("connected sucsesfuly to MongoDB")
        } catch (error) {
            console.log("mongoDB conection error ",error)
        }
    }
    module.exports = ConnectDb;
