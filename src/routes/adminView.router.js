import { Router } from 'express';
import { get as getContact, getPaginate } from '../DAO/controller/contact.view.controller.js' 
import { get as getEnterprise } from '../DAO/controller/enterprise.view.controller.js';
import { ContactService } from '../repository/index.js';

const router = Router()

router.get('/', async (req, res) => {
    const newShip = await ContactService.getByParam('status', 'newShip')
    const waiting = await ContactService.getByParam('status', 'waiting')
    const compensating = await ContactService.getByParam('status', 'compensating')
    const signing = await ContactService.getByParam('status', 'signing')
    const billing = await ContactService.getByParam('status', 'billing')
    res.render('admin', {title: 'Admin Dashboard', newShip,waiting,compensating,signing,billing})
})

router.get('/contact', getPaginate)

router.get('/enterprise', getEnterprise)


export default router