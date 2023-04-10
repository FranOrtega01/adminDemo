import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'


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
    date:{
        type: Date,
        default: new Date()
    }
})

enterpriseSchema.plugin(mongoosePaginate)
const enterpriseModel = mongoose.model(enterpriseCollection, enterpriseSchema)

export default enterpriseModel