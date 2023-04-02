import config from '../config/config.js'
import mongoose from 'mongoose'

export default {};
export let Enterprise
export let Contact

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

        Enterprise = EnterpriseMongo
        Contact = ContactMongo
        
        break;
    default:
        break;
}
