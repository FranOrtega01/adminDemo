import mongoose from "mongoose";

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    name: String,
    email:String,
    password: String,
    role: String,
})

const UserModel = mongoose.model(userCollection, userSchema)

export default UserModel