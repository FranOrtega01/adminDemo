import { ContactService } from "../../repository/index.js";
import { v4 as uuidv4 } from 'uuid';

// Get all contacts
export const get = async (req, res) => {
    try {
        const user = req.user.user
        const contacts = await ContactService.get()
        if (user.role === 'admin') return res.status(200).send({ status: 'success', payload: contacts })

        if (user.role === 'marilot') {
            const filteredUsers = contacts.filter((contacts) => contacts.enterprise === 'MARILOT ELECTRONIC SYSTEMS LTD');
            return res.status(200).send({ status: 'success', payload: filteredUsers })
        }

    } catch (error) {
        res.send(error)
    }
}

export const getPaginate = async (req, res) => {

    const user = req.user.user
    console.log(user);

    const limit = req.query?.limit || 5
    const page = req.query?.page || 1
    const filter = req.query?.query || ''
    const sort = req.query.sort

    const options = {
        limit,
        page,
        lean: true,
    }

    const search = {}

    if (user.role === 'admin') {
    } else if (user.role === 'marilot') {
        search.enterprise = 'MARILOT ELECTRONIC SYSTEMS LTD';
    } else {
        // Otros casos (puedes agregar más condiciones para otros roles si es necesario)
        res.status(403).json({ message: 'Acceso denegado' });
        return;
    }

    if (filter) search.name = filter.toUpperCase()

    if (sort) {
        if (sort === 'asc') options.sort = { 'date': 1 }
        if (sort === 'desc') options.sort = { 'date': -1 }
    }

    try {
        const data = await ContactService.getPaginate(search, options)

        data.prevLink = data.hasPrevPage ? `/admin/contact?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/admin/contact?page=${data.nextPage}` : null

        res.json({ data })

    } catch (error) {
        res.send({ status: 'error', error, message: 'error en el paginate' })
    }
}

// Get contact by ID
export const getOneByID = async (req, res) => {
    const { id } = req.params
    try {
        const contact = await ContactService.getOneByID(id)
        return res.status(200).json({ status: 'success', payload: contact })
    } catch (error) {
        return res.status(400).json({ status: 'error', payload: 'Contact not found' })
    }
}

export const create = async (req, res) => {
    const { enterprise, owner, name, email,imoNumber, mmsi, callSign, flag, portReg, compass, mark, serialNumber, status, alertDate } = req.body
    try {
        if (!enterprise || !owner || !email || !name || !mmsi || !callSign || !flag || !portReg || !compass || !mark || !serialNumber) {
            console.log("entro");
            return res.status(400).send({ status: 'error', message: 'Missing fields' })
        }
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
            status,
            createdBy: req.user?.user?.name,
            alerts: [
                {
                    date: new Date(alertDate),
                },
            ],
        }
        const payload = await ContactService.create(newUser)
        res.status(200).send({ status: 'success', message: 'Contact created.' })
    } catch (error) {
        console.log(error);
        res.status(400).send({ status: 'error', message: 'Missing fields.' })
    }
}

export const deleteAlert = async (req, res) => {
    const { id } = req.params
    const { date } = req.body
    console.log('date en controller', date);
    try {
        await ContactService.deleteAlert(id, date)
        res.status(200).json({ status: 'success', message: 'Alert deleted' })
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'An error ocurred deleting alert' })
    }
}

export const update = async (req, res) => {
    const { id } = req.params
    try {
        const updateUser = {
            ...req.body,
            alerts: [
                {
                    date: new Date(req.body.alertDate)
                }
            ]
        }
        await ContactService.update(id, updateUser)

        res.status(200).send({ status: 'success', message: 'Contact updated' })

    } catch (error) {
        res.status(500).send({ status: 'error', message: 'An error ocurred updating contact' })

    }
}

export const getHistory = async (req, res) => {
    const { id } = req.params

    try {
        const historyLog = await ContactService.getHistory(id)
        res.status(200).json({ status: 'success', payload: historyLog })
    } catch (error) {
        res.status(200).json({ status: 'error', message: 'An error ocurred fetching history' })

    }
}

export const addHistory = async (req, res) => {
    const { message } = req.body
    const { id } = req.params

    const date = new Date()
    try {
        const newHistory = {
            id: uuidv4(),
            message,
            date: `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
        }

        await ContactService.addHistory(id, newHistory)

        res.status(200).json({ status: 'success', message: 'History created' })
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'An error ocurred creating history' })
    }
}

export const deleteHistory = async (req, res) => {
    const { id, hid } = req.params
    try {
        await ContactService.deleteHistory(id, hid)
        return res.status(200).send({ status: 'success' })
    } catch (error) {
        res.status(500).send({ status: 'error', message: 'An error ocurred deleting contact' })
    }
}

export const deleteOne = async (req, res) => {
    const { id } = req.params
    try {
        await ContactService.deleteOne(id)
        return res.status(200).send({ status: 'success', message: 'Contact deleted' })
    } catch (error) {
        console.log(error);
        res.status(500).send({ status: 'error', message: 'An error ocurred deleting contact' })
    }
}
