import { ContactService } from "../../repository/index.js";

export const get =  async (req, res) => {
    try {
        // Get all contacts
        const contacts = await ContactService.get()

        res.render('contacts', {data: contacts, title:'Contacts'})
        
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

    if(filter)  search.name = filter
    

    if(sort){
        if(sort === 'asc') options.sort = {'date': 1}
        if(sort === 'desc') options.sort = {'date': -1}
    }


    try {

        const data = await ContactService.getPaginate(search, options)

    
        data.prevLink = data.hasPrevPage ? `/admin/contact?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/admin/contact?page=${data.nextPage}` : null
    
    
        res.render('contacts', {data})

    } catch (error) {
        res.send({status: 'error', error, message:'error en el paginate'})
    }
}