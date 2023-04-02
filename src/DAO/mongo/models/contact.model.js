import mongoose from "mongoose";

const contactCollection = 'contacts';

const contactSchema = new mongoose.Schema({
    owner: String,
    name: String,
    imoNumber:{
        type:Number,
        unique:true
    },
    mmsi: Number,
    callSign: String,
    flag: String,
    portReg: String,
    compass: String,
    mark: String,
    serialNumber: String,
    status: String,
    history:{
        type: Array,
        default: []
    }
})

const contactModel = mongoose.model(contactCollection, contactSchema)

export default contactModel