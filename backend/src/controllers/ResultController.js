const connection = require('../database/connections');

module.exports = {
    
    async store(req, res){
        const { result, created_at, description } = req.body;
        const user_id = req.headers.authorization;

        if(result !== '' && created_at !== '' && description !== ''){

        
            const [id] = await connection('results').insert({
                result,
                created_at,
                description,
                user_id,
            });

            return res.json({ id });
        }else{
            
            return res.json({message: 'Preencha todos os campos.'})
        }
    },
    async index(req, res){

        const { page = 1 } = req.query;

        const [ count ] = await connection('results').count();

        const results = await connection('results')
        .join('users', 'users.id', '=', 'results.user_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select( [
            'results.*',
            'users.firstName',
            'users.lastName',
            'users.date',
            'users.email',
            
        ])

        res.header('X-Total-Count', count['count(*)']);

        return res.json(results);
    },
    async destroy(req, res){
        const { id } = req.params;
        const user_id = req.headers.authorization;

        const result = await connection('results')
            .where('id', id)
            .select('user_id')
            .first();

        if(result.user_id !== user_id){

            return res.status(401).json({error: 'Operation not permitted'});
        }    

        await connection('results').where('id', id).delete();

        return res.status(204).send();
    }
};