import ContactDTO from '../DAO/DTO/contact.dto.js'

export default class ContactRepository{
    constructor(dao){
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get()
        } catch (error) {
            throw new Error('Could not get contacts. ', error)
        }
    }

    create = async (data) => {
        try {
            const newContact = new ContactDTO(data)
            return await this.dao.create(newContact)
        } catch (error) {
            console.log('Error en repository: ', error);
            throw new Error(error);
        }
    }

    getOneByID = async(id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            throw new Error('Contact not found.');
        }
    }

    getByParam = async(key, value) => {
        try {
            return await this.dao.getByParam(key, value)
        } catch (error) {
            throw new Error('Contact not found.');
        }
    }

    getHistory = async (id) => {
        try {
            return await this.dao.getHistory(id)
        } catch (error) {
            throw new Error(error)            
        }
    }

    addHistory = async (id, data) => {
        try {
            return await this.dao.addHistory(id,data)
        } catch (error) {
            throw new Error(error)
        }
    }

    deleteHistory = async (id, hid) => {
        try {
            return await this.dao.deleteHistory(id,hid)
        } catch (error) {
            throw new Error(error)
        }
    }

    update = async (id, data) => {
        try {
            // const newContact = new ContactDTO(data)
            const result = await this.dao.update(id, data);
            console.log('UPDATE: ',result);
            return result;
        } catch (error) {
            console.log('error in repository');
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

    getPaginate = async (search, options) => {
        try {
            return await this.dao.getPaginate(search, options)
        } catch (error) {
            console.log('error en el paginate');
            console.log(error);
            throw new Error(error);
        }
    }
}