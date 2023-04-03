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
    const {enterprise, owner, name,email,imoNumber, mmsi, callSign, flag, portReg, compass, mark, serialNumber, status} = req.body
        try {
            // Crear contacto
            const newUser = {
                enterprise,
                owner, 
                name, 
                email,
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
    const {id, enterprise, owner, name,email, imoNumber, mmsi, callSign, flag, portReg, compass, mark, serialNumber, status} = req.body

    try {
        
        const data = {
            enterprise,
            owner, 
            name, 
            email,
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

export const addHistory = async (req, res) => {
    const {message} = req.body
    const {id} = req.params

    const date = new Date()
    try {
        const newHistory = {
            message,
            date: `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        }

        await ContactService.addHistory(id, newHistory)

        res.redirect('/admin')
    } catch (error) {
        console.log('ERROR: ', error);
    }
}

export const getHistory = async (req, res) => {
    const {id} = req.params

    try {
        const historyLog = await ContactService.getHistory(id)
        res.send(historyLog)
    } catch (error) {
        res.send({status: 'error', error})
    }
}