import mongoose from "mongoose";

const enterpriseCollection = 'enterprises';

const enterpriseSchema = new mongoose.Schema({
    country: String,
    name: String,
    phone: Array,
    cuit: {
        type: String,
        default: ''
    },
    adress: String,
    email: Array,
})

const enterpriseModel = mongoose.model(enterpriseCollection, enterpriseSchema)

export default enterpriseModel