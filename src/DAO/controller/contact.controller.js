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

export const getPaginate = async (req, res) => {

    const limit = req.query?.limit || 5
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    const sort = req.query.sort
    

    const options = {
        limit,
        page,
        lean:true,
    }

    const search = {}

    if(filter)  search.name = filter.toUpperCase()
    

    if(sort){
        if(sort === 'asc') options.sort = {'date': 1}
        if(sort === 'desc') options.sort = {'date': -1}
    }


    try {

        const data = await ContactService.getPaginate(search, options)

    
        data.prevLink = data.hasPrevPage ? `/admin/contact?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/admin/contact?page=${data.nextPage}` : null
    
    
        res.json({data})


    } catch (error) {
        res.send({status: 'error', error, message:'error en el paginate'})
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
    const {enterprise, owner, name,email, imoNumber, mmsi, callSign, flag, portReg, compass, mark, serialNumber, status} = req.body
    const { id } = req.params
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

export const deleteOne = async (req, res) => {
    const {id} = req.params
    try {
        const deleted = await ContactService.deleteOne(id)
        res.send({status: 'success'})
    } catch (error) {
        res.send({status: 'error', error})
    }
}
