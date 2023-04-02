import { Router } from 'express';

import { get as getContact, create as createContact, getOneByID as getOneByIDContact, update as updateContact } from '../DAO/controller/contact.controller.js'

import { get as getEnterprise, create as createEnterprise } from '../DAO/controller/enterprise.controller.js'


const router = Router()


router.get('/contact', getContact)

router.get('/contact/:id', getOneByIDContact)

router.post('/contact', createContact)

router.put('/contact', updateContact)

router.get('/enterprise', getEnterprise)

router.post('/enterprise', createEnterprise)

export default router