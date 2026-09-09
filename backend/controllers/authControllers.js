const authModel = require('../models/authModel');
const nodemailer = require('nodemailer');
const transporter = require('../config/mailer');

const StoreOtp = Map() ;

class System {
    async create(req , res ){
        try {

            const {
                name ,
                email ,
                password
            } = req.body ;

            if(!name||!email||!password){
                return res.status(400).json({
                    message: "All feild is required"
                });
            }

            const result = await authModel.create(name , email ,password) ;
            
            return res.status(200).json({
                message: "Created Successful"
            });

    } 
    catch (error) {

        console.log(err);
        return res.status(500).json({
            message: "Server Error"
        });
    }
    }

    async login(req, res){
        try {

            const {
                email ,
                password
            } = req.body ;

            if(!email||!password){
                return res.status(400).json({
                    message: "All feild required"
                });
            }

            const result = await authModel.login(email , password);

            return res.status(200).json({
                message: "logined Successful"
            });
            
        } catch (error) {
            console.log(err);
            return res.status(500).json({
                message: "Server Error"
            });
        }
    }

    async sendOTP(req,res){
        try {
            const {
                email
            } = req.body ;

            if(!email){
                return res.status(400).json({
                    message:"All feild is required"
                });
            }

            const existUser = await authModel.checkEmail(email);
            
            if(!existUser){
                return res.status(400).json({
                    message:"No user Found"
                });
            }

            const otp = Math.floor(
                1000 + Math.random() * 9000
            );

            const expireAt = Date.now() + 5 * 60 * 1000;

            StoreOtp(email) = {
                otp:otp ,
                expireAt:expireAt
            }

            const mail = {
                from : process.env.USER,
                to : email,
                subject : "OTP FOR DT JOB PORTAL",
                text : `
                    Your OTP is: ${otp}

                    This OTP is valid for 5 minutes.

                    Please do not share this OTP with anyone.
                `,
            }

            await transporter.sendMail(mail);

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message:"Server Error"
            });
        }
    }
}