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
