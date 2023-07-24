export default class UserDTO{

    constructor(user){
        this.id = user.id || user._id || null
        this.name = user.name || '' 
        this.email = user.email || '' 
        this.role = user.role
        this.password = user.password
    }

    getCurrent = () => {
        return {
            _id: this.id,
            name: this.name,
            email: this.email,
            role: this.role,
        }
    }
}