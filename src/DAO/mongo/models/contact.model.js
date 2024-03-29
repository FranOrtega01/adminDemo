import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2'

const contactCollection = 'contacts2';

const contactSchema = new mongoose.Schema({
    enterprise: String,
    owner: String,
    name: String,
    email: String,
    imoNumber: {
        type: Number,
    },
    mmsi: Number,
    callSign: String,
    flag: String,
    portReg: String,
    compass: String,
    mark: String,
    serialNumber: String,
    status: {
        type: String,
        default: "newShip"
    },
    history: {
        type: Array,
        default: []
    },
    date: {
        type: Date,
        default: new Date()
    },
    createdBy: {
        type: String,
        default: ''
    },
    alerts: [{
        date: {
            type: Date,
        },
        message: {
            type: String,
            default: 'Renovar certificado!'
        }
    }]
})

contactSchema.plugin(mongoosePaginate)
const contactModel = mongoose.model(contactCollection, contactSchema)

export default contactModel