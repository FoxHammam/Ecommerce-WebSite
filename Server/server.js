const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const ConnectDb = require("./config/db");

dotenv.config();
ConnectDb();

const app = express();

app.use(cors());
app.use(express.json());


const PORT = process.env.PORT || 5000
app.listen(PORT , ()=>{
    console.log(`sever conneted on port${PORT}`)
})