import { Router } from 'express';

import { 
    get as getContact, 
    create as createContact, 
    getOneByID as getOneByIDContact, 
    update as updateContact, 
    deleteOne as deleteContact, 
    addHistory, 
    getHistory, 
    deleteHistory, 
    deleteAlert } 
from '../DAO/controller/contact.controller.js'

import { get as getEnterprise, 
    create as createEnterprise, 
    getOneByID as getOneByIDEnterprise, 
    update as updateEnterprise, 
    deleteOne as deleteEnterprise } 
    from '../DAO/controller/enterprise.controller.js'

import { getPaginate as getPaginateContact } from '../DAO/controller/contact.view.controller.js';
import { getPaginate as getPaginateEnterprise } from '../DAO/controller/enterprise.view.controller.js';
import { authorization } from '../utils.js';


const router = Router()

// Contact

router.get('/contact', getPaginateContact)

router.get('/contact/all', getContact)

router.get('/contact/:id', getOneByIDContact)

router.post('/contact', authorization(['admin']), createContact)

router.put('/contact/:id', authorization(['admin']), updateContact)

router.delete('/contact/:id' , authorization(['admin']), deleteContact)

// Contact History

router.get('/contact/:id/history',authorization(['admin']), getHistory)

router.post('/contact/:id/history',authorization(['admin']), addHistory)

router.delete('/contact/:id/history/:hid',authorization(['admin']), deleteHistory)

// Contact Alert

router.put('/contact/:id/alert',authorization(['admin']), deleteAlert)


// Enterprise

router.get('/enterprise',authorization(['admin']), getPaginateEnterprise)

router.get('/enterprise/all',authorization(['admin']), getEnterprise)

router.get('/enterprise/:id',authorization(['admin']), getOneByIDEnterprise)

router.post('/enterprise',authorization(['admin']), createEnterprise)

router.put('/enterprise/:id',authorization(['admin']), updateEnterprise)

router.delete('/enterprise/:id',authorization(['admin']), deleteEnterprise)


export default router