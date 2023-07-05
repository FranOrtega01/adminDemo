import { Router } from 'express';
import { getPaginate as getPaginateContact } from '../DAO/controller/contact.view.controller.js'
import { getPaginate as getPaginateEnterprise } from '../DAO/controller/enterprise.view.controller.js';
import { ContactService } from '../repository/index.js';

const router = Router()

router.get('/', async (req, res) => {
    const newShip = await ContactService.getByParam('status', 'newShip')
    const waiting = await ContactService.getByParam('status', 'waiting')
    const compensating = await ContactService.getByParam('status', 'compensating')
    const signing = await ContactService.getByParam('status', 'signing')
    const billing = await ContactService.getByParam('status', 'billing')
    res.render('admin', { title: 'Admin Dashboard', newShip, waiting, compensating, signing, billing })
})

router.get('/contact', getPaginateContact)

router.get('/enterprise', getPaginateEnterprise)


export default router