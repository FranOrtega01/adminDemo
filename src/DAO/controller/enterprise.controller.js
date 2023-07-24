import { EnterpriseService } from "../../repository/index.js";

export const get =  async (req, res) => {
    try {
        // Get all contacts
        const enterprises = await EnterpriseService.get()
        return res.json({enterprises})
    } catch (error) {
        res.send(error)
    }
}

// Get enterprise by ID
export const getOneByID = async (req, res) => {
    const { id } = req.params
    try {
        const enterprise = await EnterpriseService.getOneByID(id)
        return res.status(200).json({status: 'success', payload: enterprise})
    } catch (error) {
        return res.status(400).json({status: 'error', payload: 'Enterprise not found'})

    }
}

export const create = async (req, res) => {
    const {country, name, phone, cuit, adress, email} = req.body
        try {
        console.log(req.body);
            if (!country || !phone || !email || !name || !adress || !email) {
                return res.status(400).json({ status: 'error', message: 'Missing fields' })
            }

            // Crea contacto
            const newEnterprise = {
                country,
                name,
                phone,
                cuit,
                adress,
                email
            }
            await EnterpriseService.create(newEnterprise)
            return res.status(200).json({ status: 'success', message: 'Enterprise created'})
        } catch (error) {
            return res.status(500).json({ status: 'error', message: 'An error ocurred creating enterprise' })
        }
}

export const update = async (req, res) => {

    const { id } = req.params
    try {
        await EnterpriseService.update(id, req.body)

        res.status(200).send({ status: 'success', message: 'Enterprise updated'})

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'An error ocurred updating enterprise'})

    }
}

export const deleteOne = async (req, res) => {
    const { id } = req.params
    try {
        await EnterpriseService.deleteOne(id)
        console.log('deleted');
        return res.status(200).send({ status: 'success', message: 'Enterprise deleted'})
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: 'An error ocurred deleting enterprise'})
    }
}