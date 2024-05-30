import mongoose from "mongoose"

export const db_connect = () => {
    mongoose
        .connect(`${process.env.MONGODB_URI}`)
        .then(() => {
            console.log(`"MonogoDB connected successfully"`);
        })
        .catch((error) => {
            console.log("MongoDB connection failed", error);
            console.log(process.env.MONGODB_URI);
            console.log("port- ", process.env.PORT);
        })
}