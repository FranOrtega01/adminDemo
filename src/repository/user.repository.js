import __dirname from '../utils.js';
import userDTO from '../DAO/DTO/user.dto.js'

export default class UserRepository {

    constructor(dao) {
        this.dao = dao
    }

    get = async () => {
        try {
            return await this.dao.get();
        } catch (error) {
            throw new Error('An error ocurred getting users.')
        }
    }

    create = async (data) => {
        try {
            const dataToInsert = new userDTO(data)
            return await this.dao.create(dataToInsert)
        } catch (error) {
            throw new Error('An error ocurred creating user.')
        }
    }

    getUsersByCond = async (cond) => {
        try {
            const users = await this.dao.getUsersByCond(cond)
            return users
        } catch (error) {
            throw new Error('User not found.')
        }
    }

    getOneByID = async (id) => {
        try {
            return await this.dao.getOneByID(id)
        } catch (error) {
            throw new Error('User not found.')
        }
    }

    getOneByEmail = async (email) => {
        try {
            return await this.dao.getOneByEmail(email)
        } catch (error) {
            throw new Error('User not found.')
        }
    }

    update = async (id, user) => {
        try {
            const result = await this.dao.update(id, user);
            return result;
        } catch (error) {
            throw new Error('An error ocurred updating user.')
        }
    }

    deleteOne = async (id) => {
        try {
            return await this.dao.deleteOne(id)
        } catch (error) {
            throw new Error('An error ocurred deleting user.')
        }
    }

    deleteMany = async (cond) => {
        try {
            return await this.dao.deleteMany(cond)
        } catch (error) {
            throw new Error('An error ocurred deleting users.')
        }
    }
}
