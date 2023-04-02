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
            throw new Error('Enterprise not found.');
        }
    }


    update = async (id, data) => {
        try {
            const newContact = new ContactDTO(data)
            const result = await this.dao.update(id, newContact);
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
}