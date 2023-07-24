import { Router } from 'express';

import { get as getContact, create as createContact, getOneByID as getOneByIDContact, update as updateContact, deleteOne as deleteContact, addHistory, getHistory, deleteHistory } from '../DAO/controller/contact.controller.js'

import { get as getEnterprise, create as createEnterprise, getOneByID as getOneByIDEnterprise, update as updateEnterprise, deleteOne as deleteEnterprise } from '../DAO/controller/enterprise.controller.js'
import { getPaginate as getPaginateContact } from '../DAO/controller/contact.view.controller.js';
import { getPaginate as getPaginateEnterprise } from '../DAO/controller/enterprise.view.controller.js';


const router = Router()

// Contact

router.get('/contact', getPaginateContact)

router.get('/contact/all', getContact)

router.get('/contact/:id', getOneByIDContact)

router.post('/contact', createContact)

router.put('/contact/:id', updateContact)

router.delete('/contact/:id' , deleteContact)

// Contact History

router.get('/contact/:id/history', getHistory)

router.post('/contact/:id/history', addHistory)

router.delete('/contact/:id/history/:hid', deleteHistory)


// Enterprise

router.get('/enterprise', getPaginateEnterprise)

router.get('/enterprise/all', getEnterprise)

router.get('/enterprise/:id', getOneByIDEnterprise)

router.post('/enterprise', createEnterprise)

router.put('/enterprise/:id', updateEnterprise)

router.delete('/enterprise/:id', deleteEnterprise)


export default router