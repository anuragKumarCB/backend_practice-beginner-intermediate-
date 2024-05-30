import User from "../models/user.model.js"
import bcrypt from "bcrypt"

export const get_all_users = async (req, res) => {
    try {
        const all_user = await User.find()
        res.status(200).json({
            success: true,
            message: "all user fetched successfully",
            all_user,
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "user fetching failed",
            error
        })
    }
}

export const add_new_user = async (req, res) => {
    const { name, email, password } = req.body;
    const user_exists = await User.findOne({ email })

    if (user_exists) return res.status(400).json({
        success: false,
        message: "user already exists with this email please login"
    })

    const hashed_password = await bcrypt.hash(password, 10)

    try {
        const create_user = await User.create({ name, email, password: hashed_password })
        res.status(201).json({
            success: true,
            message: "user created succesfully",
            create_user
        })
    } catch (error) {
        res.status(400).json({
            success: false,
            message: "cannot add new user",
            error
        })
    }
}

export const special_route = async (req, res) => {
    res.status(200).json({
        success: true,
        message: "this is special route"
    })
}

export const update_user = async (req, res) => {
    // for error handeling we need to make sure provide id is valid by mongoDB

    const { id } = req.params

    const { name, email, password } = req.body

    const hashed_password = await bcrypt.hash(password, 10)
    const user = await User.findById(id)
    if (!user) return res.status(400).json({
        success: false,
        message: "user not found"
    })
    try {
        const updated_user = await User.findByIdAndUpdate(id, { name, email, password: hashed_password }, { new: true, useFindAndModify: true })
        res.status(202).json({
            success: true,
            message: "user updated successfully",
            updated_user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "cannot update user",
            error
        })
    }
}

export const delete_user = async (req, res) => {
    // for error handeling we need to make sure provide id is valid by mongoDB

    const { id } = req.params

    const user = await User.findById(id)

    if (!user) return res.status(400).json({
        success: false,
        message: "user not found"
    })
    try {
        const deleted_user = await User.findByIdAndDelete(id)
        res.status(200).json({
            success: true,
            message: "user deleted successfully",
            deleted_user
        })

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "cannot delete user",
            error
        })
    }
}