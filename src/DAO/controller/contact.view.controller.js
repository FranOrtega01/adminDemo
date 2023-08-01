import { ContactService } from "../../repository/index.js";

export const get = async (req, res) => {
    try {
        // Get all contacts
        const contacts = await ContactService.get()

        res.render('contacts', { data: contacts, title: 'Contacts' })

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

    if (filter) {
        search.name = {
            $regex: new RegExp(filter, 'i'),
        };
    }



    if (sort) {
        if (sort === 'asc') options.sort = { 'date': 1 }
        if (sort === 'desc') options.sort = { 'date': -1 }
    }


    try {

        const data = await ContactService.getPaginate(search, options)


        data.prevLink = data.hasPrevPage ? `/admin/contact?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/admin/contact?page=${data.nextPage}` : null


        res.json({
            status: 'success',
            payload: data.docs,
            totalDocs: data.totalDocs,
            limit: data.limit,
            totalPages: data.totalPages,
            prevPage: data.prevPage,
            nextPage: data.nextPage,
            hasPrevPage: data.hasPrevPage,
            hasNextPage: data.hasNextPage,
            prevLink: data.prevLink,
            nextLink: data.nextLink
        })

    } catch (error) {
        res.send({ status: 'error', error, message: 'error en el paginate' })
    }
}