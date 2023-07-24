import { Enterprise, Contact, User } from '../DAO/factory.js'

import EnterpriseRepository from './enterprise.repository.js'
import ContactRepository from './contact.repository.js'
import UserRepository from './user.repository.js'

export const EnterpriseService = new EnterpriseRepository( new Enterprise)
export const ContactService = new ContactRepository(new Contact)
export const UserService = new UserRepository(new User)