const { success } = require('zod');
const RecruiterModel = require('../models/recruiterModel');
const RecruiterValidator = require('../validators/recruiterValidators');

const recValidator = new RecruiterValidator() ;

const sendValidationError = (res, result) => {
    return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: result.error.issues.map((issue) => ({
            field: issue.path?.[0] || "general",
            message: issue.message,
        })),
    });
};

class Recruiter{
    async createRecruiter (req,res){
        try{
            const validatorResponse = recValidator.CreateProfile(req.body);
            
            if(!validatorResponse.success){
                return sendValidationError(res , validatorResponse);
            }

            await RecruiterModel.createProfile(validatorResponse.data);

            return res.status(200).json({
                success:true,
                message:"Sussfully created Profile",
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
            const validatorResponse = recValidator.UpdateProfile(req.body);
            
            if(!validatorResponse.success){
                return sendValidationError(res, validatorResponse);
            }

            const response = await RecruiterModel.updateProfile(validatorResponse.data);

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

    async getProfile(req, res){
        try{
            const validatorResponse = recValidator.GetProfile({
                user_id: Number(req.params.user_id)
            });

            if (!validatorResponse.success) {
                return sendValidationError(res, validatorResponse);
            }

            const response = await RecruiterModel.getProfile(
                validatorResponse.data.user_id
            );

            if (!response) {
                return res.status(404).json({
                    success: false,
                    message: "Profile not found",
                    profile: null
                });
            }

            return res.status(200).json({
                success: true,
                message: "Profile fetched successfully",
                profile: response
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