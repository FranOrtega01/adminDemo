import passport from 'passport'
import local from 'passport-local'
import jwt from 'passport-jwt'
import GoogleStrategy from 'passport-google-oidc'
import { createHash, isValidPassword, generateUserToken, extractCookie } from "../utils.js";
import { UserService } from '../repository/index.js'
import config from './config.js'


const LocalStrategy = local.Strategy
const JWTStrategy = jwt.Strategy
const JWTExtract = jwt.ExtractJwt


const initializePassport = () => {


    //Estrategia para register
    passport.use('register', new LocalStrategy({
        passReqToCallback: true,
        usernameField: 'email'
    },
        async (req, username, password, done) => {

            // Datos del form
            let { name, email, role } = req.body

            try {
                // Buscar un user con ese email
                const user = await UserService.getOneByEmail(username)

                // Si existe return 
                if (user) {
                    return done(null, false) // (null) No hay ningun error pero, (false) el usuario ya existe.
                }

                // Handle roles
                if (email == config.adminEmailOne && password == config.adminPassOne) role = 'admin'
                if (email == config.adminEmailTwo && password == config.adminPassTwo) role = 'admin'

                // Crea el user con el hash
                const newUser = {
                    name,
                    email: email.toLowerCase() ,
                    password: createHash(password),
                    role
                }
                const result = await UserService.create(newUser)
                console.log(result);
                return done(null, result)

            } catch (error) {
                return done('Error al obtener user ' + error)
            }
        }))

    //Estrategia para login
    passport.use('login', new LocalStrategy({
        usernameField: 'email',
    }, async (username, password, done) => {
        try {
            const email = username.toLowerCase()
            const user = await UserService.getOneByEmail(email)

            if (!user) {
                return (null, user)
            }

            // No hay error, pero esta mal las password
            if (!isValidPassword(user, password)) return done(null, false)

            // jwt Token

            const token = generateUserToken(user, '24h');
            user.token = token
            return done(null, user)

        } catch (error) {
            console.log(error)
        }
    }))


    // Estrategia para current con JWT
    passport.use('jwt', new JWTStrategy({
        jwtFromRequest: JWTExtract.fromExtractors([extractCookie]),
        secretOrKey: config.jwtSign,
    }, async (jwt_payload, done) => {
        try {
            return done(null, jwt_payload);
        } catch (error) {
            return done(error);
        }
    }))

    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    passport.deserializeUser(async (id, done) => {
        const user = await UserService.getOneByID(id)
        done(null, user)
    })
}

export default initializePassport