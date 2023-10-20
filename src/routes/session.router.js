import { Router } from "express";
import passport from 'passport'
import { passportCall, authorization   } from '../utils.js';
import { login, logout } from "../DAO/controller/session.controller.js";
import UserDTO from "../DAO/DTO/user.dto.js";

const router = Router();

// Register
router.post('/register',passportCall('jwt'),authorization(['admin']) ,passport.authenticate('register', { failureRedirect: '/session/failRegister' }), async (req, res) => {
    res.redirect('/session/login')
})

router.get('/failRegister', (req, res) => {
    res.send({ error: 'Failed' })
})

// Login
router.get('/login', passportCall('jwt'), (req, res) => {
    if(req.user?.user){
        const user = new UserDTO(req.user.user).getCurrent()
        return res.status(200).json({loggedIn: true, user})
    }
    return res.status(401).json({loggedIn: false})
})

router.post('/login', passport.authenticate('login', { failureRedirect: '/session/faillogin' }), login)

router.get('/failLogin', (req, res) => {
    res.send({ error: 'Failed' })
})

router.delete('/logout', passportCall('jwt'), logout)

export default router