import { UserService } from '../repository/index.js'

export const getUsersByCond = async (cond) => {
    try {
        const users = await UserService.getUsersByCond(cond)
        return users
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export const get = async (req, res) => {
    try {
        const users = await UserService.get()
        return res.status(200).json({ status: 'success', payload: users });
    } catch (error) {
        return res.status(500).json({ status: 'error', error });
    }
}

export const create = async (req, res) => {
    const data = req.body

    try {
        const newUser = await UserService.create(data)

        return res.status(200).json({ status: 'success', payload: newUser });
    } catch (error) {
        return res.status(500).json({ status: 'error', error });
    }

}

export const getOneByID = async (req, res) => {
    const { uid } = req.params

    try {
        const user = await UserService.getOneByID(uid)

        return res.status(200).json({ status: 'success', payload: user });

    } catch (error) {
        return res.status(500).json({ status: 'error', error });
    }
}

export const getOneByEmail = async (req, res) => {
    const { email } = req.params
    try {
        const user = await UserService.getOneByEmail(email)

        return res.status(200).json({ status: 'success', payload: user });

    } catch (error) {
        return res.status(500).json({ status: 'error', error });
    }
}

export const update = async (req, res) => {
    const { uid } = req.params
    const data = req.body
    try {
        const updatedUser = await UserService.update(uid, data)

        return res.status(200).json({ status: 'success', payload: updatedUser });

    } catch (error) {
        return res.status(500).json({ status: 'error', error });
    }
}

export const deleteOne = async (req, res) => {
    const { uid } = req.params
    try {
        const deletedUser = await UserService.deleteOne(uid)

        return res.status(200).json({ status: 'success', payload: deletedUser });

    } catch (error) {
        return res.status(500).json({ status: 'error', error });
    }
}
