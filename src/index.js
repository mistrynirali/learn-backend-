import dotenv from "dotenv"
import express from "express"
const app = express()

import connectDb from "./db/index.js";

dotenv.config({path: "./env"})

connectDb()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port: ${process.env.PORT}`)
    })

})
.catch((err) => {
    console.log("Mongodb connection fail", err)
})




/*
import express from "express";
const app = express()

(async() => {
    try{
        await mongoose.connect(`${process.env.
            MONGODB_URI}/${DB_NAME}`)
            app.on("errr", (error) => {
            console.com("ERROR: ", error)
            throw error
            })

            app.listen(process.env.PORT, () => {
                console.log(`App is listing on port ${process.env.PORT}`)
            })

    }catch(error){
        console.com("ERROR: ", error)
        throw error
    }
})()
*/