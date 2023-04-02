import { Enterprise, Contact } from '../DAO/factory.js'

import EnterpriseRepository from './enterprise.repository.js'
import ContactRepository from './contact.repository.js'

export const EnterpriseService = new EnterpriseRepository( new Enterprise)
export const ContactService = new ContactRepository(new Contact)