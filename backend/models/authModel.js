const db = require('../config/db') ;
const bcrypt = require('bcrypt')

class System{

    async create(
        name ,
        email ,
        password 
    ) {
        const hashedPassword  = await bcrypt.hash(password ,10 );

        const sql = `INSERT INTO users (name , email , password)
                        VALUES(? , ? ,?)`
        const values = [
            name ,
            email ,
            hashedPassword
        ];

        const [response]  = await db.execute(sql , values);

        return response ;
    }

    async checkEmail(
        email  
    ){
        const sql = `SELECT * FROM users WHERE email = ?`;

        const [response] = await db.execute(sql ,[email]);

        if(response.length === 0){
            return null ;
        }

        return response[0] ;
    }

    async login(
        email ,
        password
    ){
        const user = await this.checkEmail(email);
        
        if(!user){
            return null ;
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return false ;
        }

        return user ;
    }

    async forget(
        email , 
        password
    ){
        const user = await this.checkEmail(email);

        if(!user){
            return null ;
        }

        const hashedPassword  = await bcrypt.hash(password ,10 );

        const sql = `
                    UPDATE users
                    SET password = ?
                    WHERE email = ?
            `;

        const values = [ 
            hashedPassword ,
            email
        ]

        const [response] = await db.execute(sql ,values) ; 

        return response ;
    }
}

module.exports = new System() ;