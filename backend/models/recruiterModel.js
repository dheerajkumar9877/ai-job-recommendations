const db = require("../config/db");

class Recruiter {

    // ================= CREATE PROFILE =================
    async createProfile(data) {
        const {
            user_id,
            name,
            profile_img,
            email,
            phone,
            location,
            des,
            c_name,
            c_website,
            c_des
        } = data;

        const sql = `
            INSERT INTO recruiterProfile
            (
                user_id,
                profile_img,
                name,
                email,
                phone,
                location,
                des,
                c_name,
                c_website,
                c_des
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user_id,
            profile_img || null,
            name,
            email,
            phone,
            location,
            des,
            c_name,
            c_website,
            c_des
        ];

        const [result] = await db.execute(sql, values);

        return result;
    }


    // ================= UPDATE PROFILE =================
    async updateProfile(data) {

        const {
            user_id,
            name,
            profile_img,
            email,
            phone,
            location,
            des,
            c_name,
            c_website,
            c_des
        } = data;
        

        const sql = `
            UPDATE recruiterProfile
            SET
                name = ?,
                profile_img = ?,
                email = ?,
                phone = ?,
                location = ?,
                des = ?,
                c_name = ?,
                c_website = ?,
                c_des = ?
            WHERE user_id = ?
        `;

        const values = [
            name,
            profile_img || null,
            email,
            phone,
            location,
            des,
            c_name,
            c_website,
            c_des,
            user_id
        ];
        console.log(profile_img);

        const [result] = await db.execute(sql, values);

        return result;
    }

    async getProfile(user_id){
        const sql = `SELECT * FROM recruiterProfile 
                    WHERE user_id = ? LIMIT 1` ;

        const [result] =await db.execute(sql ,[user_id]);

        return result[0] || null ;
    }
}

module.exports = new Recruiter();