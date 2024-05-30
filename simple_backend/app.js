import express from "express"
import mongoose from "mongoose"
import Product from "./product.model.js"
import User from "./user.model.js"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import path from "path"
import jwt from "jsonwebtoken"
import { name } from "ejs"
import bcrypt from "bcrypt"

const app = express()
const port = 8000
const hostname = "http://localhost"
const MONGODB_URI = "mongodb+srv://anuragKumarCB01:8gzG8M61XYxxGAH3@cluster0.crrwipr.mongodb.net/"


// using middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(path.resolve(), "public")))


// setting ejs
app.set("view engine", "ejs")


// connecting to mongoDB
mongoose.connect(`${MONGODB_URI}`).then(() => {
    console.log("Connected to mongoDb sucessfully");
}).catch(() => {
    console.log("MongoDB connection Failed");
})


// starting server
app.listen(port, () => {
    console.log(`srever is running on ${hostname}:${port}`);
})

// check authentication
const isAuthenticated = async (req, res, next) => {
    const { token } = req.cookies
    if (token) {

        const verify_token = jwt.verify(token, "mysecretekeyisthisone")

        req.user = await User.findById(verify_token._id)

        next()
    } else {
        res.redirect("/login")
    }
}

// routes
app.get("/", isAuthenticated, (req, res) => {
    res.render("profile", { name: req.user.name })

})

app.get("/login", (req, res) => {
    res.render("login")
})
// signup route
app.get("/signup", (req, res) => {
    res.render("signup")
})

app.post("/signup", async (req, res) => {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })

    const hashed_password = await bcrypt.hash(password, 10)

    try {
        if (user) {
            res.render("signup", { message: "user already exists Login here" })
        } else {
            const created_user = await User.create({ name, email, password: hashed_password })
        }
        res.redirect("/login")
    } catch (error) {
        console.log("user not created", error);
    }
})

// // all product route
// app.get("/api/v1/products", async (req, res) => {
//     const all_products = await Product.find()
//     res.send(all_products)

// })

// // add product route
// app.post("/api/v1/product/new", async (req, res) => {
//     const add_product = await Product.create(req.body)
//     res.status(202).json({
//         message: "product added sucessflly",
//         add_product
//     })
// })

// // update product 
// app.put("/api/v1/product/update/:id", async (req, res) => {
//     const product = await Product.findById(req.params.id)

//     if (!product) return res.status(500).json({
//         message: "product not found"
//     })

//     const updated_product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, useFindAndModify: true })

//     res.status(203).json({
//         message: "product updated sucessfully",
//         updated_product
//     })
// })

// // delete product
// app.delete("/api/v1/product/delete/:id", async (req, res) => {
//     // it will validate id and only then other qerry will execute 
//     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
//         return res.status(400).json({
//             success: false,
//             message: "Invalid product ID"
//         });
//     }

//     try {
//         const deleted_product = await Product.findByIdAndDelete(req.params.id);

//         if (!deleted_product) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Product not found"
//             });
//         }


//         res.status(200).json({
//             success: true,
//             message: "Product removed successfully"
//         });

//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: "Server error",
//             error: error.message
//         });
//     }
// });


// login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email })
        if (!user) return res.render("login", { message: "user doesn't exist Register here" })

        const match_password = await bcrypt.compare(password, user.password)
        if (!match_password) return res.render("login", { email, message: "incorrect password" })

        const token = jwt.sign({ _id: user._id }, "mysecretekeyisthisone")

        res.cookie("token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + (600 * 1000))
        })
        res.redirect("/")

    } catch (error) {
        console.log(error);
    }
})

// logout route
app.get("/logout", (req, res) => {
    res.cookie("token", null, {
        httpOnly: true,
        expires: new Date(Date.now())
    })
    res.redirect("/")
})