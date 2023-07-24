import UserDTO from '../DTO/user.dto.js'
import config from '../../config/config.js';

export const login = async (req, res) => {
    if (!req.user) {
        return res.status(400).send({ status: 'error', error: 'Invalid credentials' })
    }
    try {
        res.cookie(config.jwtCookie, req.user.token, {
            maxAge: 86400000,
            httpOnly: false,
            sameSite: 'none',
            secure: true,
            path: '/'
        })

        return res.status(200).send({ status: 'success' })
    } catch (error) {
        return res.status(400).send({ status: 'error', error })
    }
}

export const profile = async (req, res) => {
    try {
        //User sin password
        const userDTO = new UserDTO(req.user.user).getCurrent()
        return res.status(200).json({ status: 'success', payload: userDTO })
    } catch (error) {
        return res.status(400).json({ status: 'error', error })
    }
}

export const logout = async (req, res) => {
    console.log('Entro al logout');
    try {
        res.clearCookie(config.jwtCookie, { sameSite: 'none', secure: true, });

        res.send({ status: 'success' })
    } catch (error) {
        console.log(error);
    }
}