import { ContactService } from "../../repository/index.js";

// Get all contacts
export const get =  async (req, res) => {
    try {
        const contacts = await ContactService.get()
        res.json({contacts})
    } catch (error) {
        res.send(error)
    }
}

// Get contact by ID
export const getOneByID = async (req, res) => {
    const { id } = req.params
    try {
        const contact = await ContactService.getOneByID(id)
        res.json(contact)
    } catch (error) {
        res.send(error)
    }
}

export const create = async (req, res) => {
    const {owner, name,imoNumber, mmsi, callSign, flag, portReg, compass, mark, serialNumber, status} = req.body
        try {
            // Crear contacto
            const newUser = {
                owner, 
                name, 
                imoNumber,
                mmsi,
                callSign, 
                flag, 
                portReg, 
                compass, 
                mark, 
                serialNumber,
                status
            }
            console.log(newUser);
            await ContactService.create(newUser)
            console.log('Created succesfully');
            res.redirect('/admin')
        } catch (error) {
            res.send(error)
        }
}

export const update = async(req, res) => {

    console.log('BODY: ', req.body);
    const {id, owner, name,imoNumber, mmsi, callSign, flag, portReg, compass, mark, serialNumber, status} = req.body

    try {
        
        const data = {
            owner, 
            name, 
            imoNumber,
            mmsi,
            callSign, 
            flag, 
            portReg, 
            compass, 
            mark, 
            serialNumber,
            status
        }

        await ContactService.update(id, data)

        console.log('Updated succesfully');
        res.send({status: 'success'})

    } catch (error) {
        res.send(error)
    }
}
