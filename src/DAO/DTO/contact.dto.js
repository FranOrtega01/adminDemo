export default class ContactDTO{

    constructor(cont){
        this.id = cont.id || cont._id || null
        this.enterprise = cont.enterprise
        this.owner = cont.owner
        this.name = cont.name
        this.email = cont.email || ''
        this.imoNumber = cont.imoNumber
        this.mmsi = cont.mmsi
        this.callSign = cont.callSign
        this.flag = cont.flag
        this.portReg = cont.portReg
        this.compass = cont.compass
        this.mark = cont.mark
        this.serialNumber = cont.serialNumber
        this.status = cont.status || 'newShip'
        this.history = cont.history || []
    }
}