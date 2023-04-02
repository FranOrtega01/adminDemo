import enterpriseModel from "./models/enterprise.model.js";

export default class Enterprise{
    constructor(){}

    get = async () => {
        return await enterpriseModel.find().lean().exec()
    }

    create = async (data) => {
        return await enterpriseModel.create(data)
    }

    getOneByID = async(id) => {
        return await enterpriseModel.findById({_id:id}).lean().exec();
    }

    update = async(id, updUser)=>{
        const result = await enterpriseModel.updateOne({_id: id}, updUser);
        return result;
    }

    deleteOne = async(id) => {
        return await enterpriseModel.deleteOne({_id: id})
    }
}