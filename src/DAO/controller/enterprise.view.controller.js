import { EnterpriseService } from "../../repository/index.js";

export const get =  async (req, res) => {
    try {
        // Get all enterprises
        const enterprise = await EnterpriseService.get()

        res.render('enterprise', {data: enterprise, title:'Enterprises'})
        
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

        const data = await EnterpriseService.getPaginate(search, options)

    
        data.prevLink = data.hasPrevPage ? `/admin/enterprise?page=${data.prevPage}` : null
        data.nextLink = data.hasNextPage ? `/admin/enterprise?page=${data.nextPage}` : null
    
    
        res.render('enterprise', {data})

    } catch (error) {
        res.send({status: 'error', error, message:'error en el paginate'})
    }
}