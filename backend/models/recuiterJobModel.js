const db = require("../config/db");

class RecruiterJob {

    async CreateJob(data) {

        const {
            user_id,
            title,
            c_name,
            c_location,
            c_type,
            experience,
            salary,
            category,
            skills,
            job_des,
            requir,
            active,
        } = data;

        const sql = `
            INSERT INTO jobs (
                user_id,
                title,
                c_name,
                c_location,
                c_type,
                experience,
                salary,
                category,
                skills,
                job_des,
                requir,
                active
            )
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
            user_id,
            title,
            c_name,
            c_location,
            c_type,
            experience,
            salary,
            category,
            skills,
            job_des,
            requir,
            active || "active",
        ];

        const [result] = await db.execute(sql, values);

        const [rows] = await db.execute(
            `SELECT job_id FROM jobs WHERE id = ?`,
            [result.insertId]
        );

        return {
            id: result.insertId,
            job_id: rows[0]?.job_id
        };
    }

    async GetJob(user_id) {

        const sql = `
            SELECT *
            FROM jobs
            WHERE user_id = ?
            ORDER BY id DESC
        `;

        const [result] = await db.execute(
            sql,
            [user_id]
        );

        return result;
    }

    async getJobById(user_id, job_id) {

        const sql = `
            SELECT *
            FROM jobs
            WHERE user_id = ?
            AND job_id = ?
        `;

        const values = [
            user_id,
            job_id
        ];

        const [result] = await db.execute(
            sql,
            values
        );

        return result[0] || null;
    }

    async updateJob(data) {

        const {
            user_id,
            job_id,
            title,
            c_name,
            c_location,
            c_type,
            experience,
            salary,
            category,
            skills,
            job_des,
            requir,
            active
        } = data;

        const sql = `
            UPDATE jobs
            SET
                title = ?,
                c_name = ?,
                c_location = ?,
                c_type = ?,
                experience = ?,
                salary = ?,
                category = ?,
                skills = ?,
                job_des = ?,
                requir = ?,
                active = ?
            WHERE user_id = ?
            AND job_id = ?
        `;

        const values = [
            title,
            c_name,
            c_location,
            c_type,
            experience,
            salary,
            category,
            skills,
            job_des,
            requir,
            active,
            user_id,
            job_id
        ];

        const [response] = await db.execute(sql,values);

        if (response.affectedRows === 0) {
            return {
                success: false,
                message: "Job not found or does not belong to this recruiter"
            };
        }

        return {
            success: true,
            message: "Job updated successfully",
            affectedRows: response.affectedRows
        };
    }

    async viewJob(data){
        const {
            user_id ,
            job_id
        } = data ;

        const sql = `SELECT * FROM jobs WHERE
                    user_id = ? and job_id = ?`;

        const values = [
            user_id ,
            job_id
        ];

        const [response] = await db.execute(sql , values);
        
        return response ;
    }

    async deleteJob(data){
        const {
            user_id ,
            job_id
        } = data ;

        const sql = `DELETE FROM jobs 
                    WHERE user_id = ? and job_id = ?`;

        const values = [
            user_id ,
            job_id
        ];

        const [response] = await db.execute(sql , values);
        
        return response ;
    }
}

module.exports = new RecruiterJob();