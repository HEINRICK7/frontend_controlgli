const connection = require('../database/connections');

module.exports = {
    async index(req, res){
        const user_id = req.headers.authorization;


        const results = await connection('results')
            .where('user_id', user_id)
            .select(' * ');

        return res.json(results)    

    }
}
