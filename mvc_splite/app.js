import express from "express"
import { config } from "dotenv";
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import userRouter from "./routes/users.route.js"

config({
    path: "./.env"
});

export const app = express();


// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json())
app.use(cookieParser());
app.use("/users", userRouter)








