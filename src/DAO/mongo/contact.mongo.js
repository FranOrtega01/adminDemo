import contactModel from "./models/contact.model.js";

export default class Contact{
    constructor(){}

    get = async () => {
        return await contactModel.find().lean().exec()
    }

    create = async (data) => {
        return await contactModel.create(data)
    }

    getOneByID = async(id) => {
        return await contactModel.findById({_id:id}).lean().exec();
    }

    getByParam = async (param,value) => {
        const search = {}
        search[param] = value
        return await contactModel.find(search).lean().exec()
    }

    update = async(id, updUser)=>{
        try {
            const result = await contactModel.updateOne({_id: id}, updUser);
            return result;
        } catch (error) {
            console.log('Error en mongo: ', error);
        }
    }

    deleteOne = async(id) => {
        return await contactModel.deleteOne({_id: id})
    }
}