import EnterpriseDTO from '../DAO/DTO/enterprise.dto.js'

export default class EnterpriseRepository{
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get()
        } catch (error) {
            throw new Error('Could not get enterprises. ', error)
        }
    }

    create = async (data) => {
        try {
            const newEnterprise = new EnterpriseDTO(data)
            return await this.dao.create(newEnterprise)
        } catch (error) {
            throw new Error(error);
        }
    }

    getOneByID = async(id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            throw new Error('Enterprise not found.');
        }
    }

    update = async (id, data) => {
        try {
            const newEnterprise = new EnterpriseDTO(data)
            const result = await this.dao.update(id, newEnterprise);
            return result;
        } catch (error) {
            throw new Error(error);
        }
    }

    deleteOne = async(id) => {
        try {
            return await this.dao.deleteOne(id)
        } catch (error) {
            throw new Error(error);
        }
    }
}