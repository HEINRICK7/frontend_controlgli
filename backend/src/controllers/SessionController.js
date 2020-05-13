const connection = require('../database/connections');
const Boom = require('boom');
const bcrypt = require('bcryptjs');

module.exports = {
    async store(req, res) {
        const {email, password } = req.body;

        const user = await connection('users')
            .where({email:email})
            .first()
    
        if(!user){
            res.status(400).json({
                error: "Nenhum usuário com esse email"
            })
        }
        else{
            return bcrypt
            .compare(password, user.password)
            .then(isAuthenticated => {
                if(!isAuthenticated){
                   res.status(400).json({
                      error: "Senha invalida!"
                   })
                }
                return res.json(user)
                   
            })
            
        }
        
    }
        
    
}