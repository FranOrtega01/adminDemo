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
