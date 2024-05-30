import express from 'express'
import { add_new_user, delete_user, get_all_users, special_route, update_user } from '../controllers/users.controller.js'


const router = express.Router()

// get all user route
router.get("/all", get_all_users)

// add new user route
router.post("/new", add_new_user)

// special route
router.get("/userid/special", special_route)

// update user dynamic route
router.put("/userid/:id", update_user)

// delete user route
router.delete("/userid/:id", delete_user)

export default router

/*
    (if you have two api with same end-point and one of them is dynamic then always
    put the dynamic route at the end. simply put all dynamic route at the end)
*/