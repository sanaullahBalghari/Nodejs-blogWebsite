import dotenv from "dotenv"
import e from "express";
import {app} from './app.js'
import connectDB from "./db/index.js";
import path from 'path';

import { fileURLToPath } from 'url';


// Simulate __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load env file from root
dotenv.config({
  path: path.resolve(__dirname, '../.env')
});

connectDB()
.then( ()=>{

  app.listen(process.env.PORT || 8000,  ()=>{
    console.log(`server is running at :${process.env.PORT}`)

  })

   app.on("error", error => {
      console.log("Error", error);
      throw error;
    });

})
.catch( (err)=>{
  console.log("Db connection failed",err)
})