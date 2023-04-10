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

    getHistory = async (id) => {
        const user = await this.getOneByID(id)
        const history = user.history
        return history
    }

    addHistory = async (id, data) => {
        const user = await this.getOneByID(id)
        const history = user.history
        history.push(data)
        return await this.update(id, user)
    }

    update = async(id, updUser)=>{
        try {
            console.log(updUser);
            const result = await contactModel.updateOne({_id: id}, {$set: updUser});
            return result;
        } catch (error) {
            console.log('Error en mongo: ', error);
        }
    }

    deleteOne = async(id) => {
        return await contactModel.deleteOne({_id: id})
    }

    getPaginate = async (search, options) => {
        return await contactModel.paginate(search, options)
    }
}