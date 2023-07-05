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


export const create = async (req, res) => {
    const {country, name, phone, cuit, adress, email} = req.body
        try {
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
            console.log('Created succesfully');
            return res.redirect('/admin')
        } catch (error) {
            return res.send(error)
        }
}
