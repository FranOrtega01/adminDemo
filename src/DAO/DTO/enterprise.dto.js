export default class EnterpriseDTO{

    constructor(cont){
        this.id = cont.id || cont._id || null
        this.country = cont.country
        this.name = cont.name
        this.phone = cont.phone || []
        this.cuit = cont.cuit || ''
        this.adress = cont.adress
        this.email = cont.email || []
    }
}