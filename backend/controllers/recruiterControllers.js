const RecruiterModel = require('../models/recruiterModel');

class Recruiter{
    async createRecruiter (req,res){
        try{
            req.body= {
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
            };

            if(!user_id ||
            !name ||
            !profile_img ||
            !email ||
            !phone ||
            !location ||
            !des ||
            !c_name ||
            !c_website ||
            !c_des){
                return res.status(400).json({
                    message: "All feild required"
                });
            }
            
            const response = RecruiterModel.createProfile(user_id ,
                name ,
                profile_img ,
                email ,
                phone ,
                location ,
                des ,
                c_name ,
                c_website ,
                c_des);

            return res.status(200).json({
                message:"Sussfully created Profile"
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message:"Server Error"
            });
        }
    }

    async updateRecruiter (req,res){
        try{
            req.body= {
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
            };

            if(!user_id ||
            !name ||
            !profile_img ||
            !email ||
            !phone ||
            !location ||
            !des ||
            !c_name ||
            !c_website ||
            !c_des){
                return res.status(400).json({
                    message: "All feild required"
                });
            }
            
            const response = RecruiterModel.updateProfile(user_id ,
                name ,
                profile_img ,
                email ,
                phone ,
                location ,
                des ,
                c_name ,
                c_website ,
                c_des);

            return res.status(200).json({
                message:"Sussfully updated Profile"
            });
        }catch(err){
            console.log(err);
            return res.status(500).json({
                message:"Server Error"
            });
        }
    }
}

module.exports = new Recruiter ;