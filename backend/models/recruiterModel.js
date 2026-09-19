const db = require('../config/db');

class Recruiter {
    async createProfile(user_id ,name , profile_img , email , phone , location ,des ,c_name ,c_website ,c_des) {
        // create
        const sql = `INSERT INTO recruiterProfile(user_id ,profile_img , name ,  email , phone , location ,des ,c_name ,c_website ,c_des)
                        VALUES(? , ? ,? ,? ,? ,? ,? ,? ,? ,?) ;`
        
        const [values] = [
            user_id ,name , profile_img , email , phone , location ,des ,c_name ,c_website ,c_des
        ] ; 

        const result = db.execute(sql,values) ;

        return result[0] ;
    }

    async updateProfile (user_id ,name , profile_img , email , phone , location ,des ,c_name ,c_website ,c_des){

        const sql = `UPDATE recruiterProfile 
                        SET name = ? , profile_img = ?, email = ?, phone = ?, location = ?,des = ?,c_name = ?,c_website = ?,c_des= ?
                        WHERE user_id = ?` ;
        const [values] = [
            user_id ,
            name ,
            profile_img ,
            email ,
            phone ,
            location ,
            des ,
            c_name ,
            c_website ,
            c_des
        ] ;

        const result = db.execute(sql , values) ;

        return result[0] ;
        
    }
}

module.exports = new Recruiter ;