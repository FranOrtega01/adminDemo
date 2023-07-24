import config from '../config/config.js'
import mongoose from 'mongoose'

export default {};
export let Enterprise
export let Contact
export let User

console.log(`PERSISTENCE: [${config.persistence}]`);
switch (config.persistence) {
    case "MONGO":
        mongoose.set('strictQuery', false)

        mongoose.connect(config.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: config.mongoDBName
        }, () => console.log('DB Connected'))
                
        const { default: EnterpriseMongo } = await import('./mongo/enterprise.mongo.js')
        const { default: ContactMongo } = await import('./mongo/contact.mongo.js')
        const { default: UserMongo } = await import('./mongo/user.mongo.js')

        Enterprise = EnterpriseMongo
        Contact = ContactMongo
        User = UserMongo

        
        break;
    default:
        break;
}
