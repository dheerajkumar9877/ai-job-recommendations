const authModel = require('../models/authModel');
const nodemailer = require('nodemailer');
const transporter = require('../config/mailer');
require('dotenv').config();

const StoreOtp = new Map() ;

class System {
    async create(req , res ){
        try {

            const {
                name ,
                email ,
                password,
                role
            } = req.body ;

            if(!name||!email||!password||!role){
                return res.status(400).json({
                    message: "All feild is required"
                });
            }

            const existUser = await authModel.checkEmail(email);
            if (existUser) {
                return res.status(409).json({
                    message: "Email already registered"
                });
            }
            
            await authModel.create(
                name,
                email,
                password,
                role
            );
            
            return res.status(201).json({
                message: "Created Successfully"
            });
    } 
    catch (error) {
        console.log(error);

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

            const user = await authModel.login(email , password);

            if (!user) {
                return res.status(401).json({
                    message: "Invalid email or password"
                });
            }

            return res.status(200).json({
                message: "logined Successful" ,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role:user.role
                }
            });
            
        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Server Error"
            });
        }
    }

    async sendOTP(req, res) {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(400).json({
                    message: "All field is required"
                });
            }

            const existUser = await authModel.checkEmail(email);

            if (!existUser) {
                return res.status(400).json({
                    message: "No user found"
                });
            }

            const otp = Math.floor(
                1000 + Math.random() * 9000
            );

            const expireAt = Date.now() + 5 * 60 * 1000;

            // 🟢 CORRECT
            StoreOtp.set(email, {
                otp: otp,
                expireAt: expireAt,
                verified: false
            });

            const mail = {
                from: process.env.EMAIL_USER,
                to: email,
                subject: "OTP FOR DT JOB PORTAL",
                text: `
    Your OTP is: ${otp}

    This OTP is valid for 5 minutes.

    Please do not share this OTP with anyone.
                `,
            };

            await transporter.sendMail(mail);

            return res.status(200).json({
                message: "OTP sent successfully"
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Server Error"
            });
        }
    }

    async verifyOtp(req ,res){
        try{const {
            email ,
            otp
        } = req.body ;

        if(!email || !otp){
            return res.status(400).json({
                message:"Email and otp is required"
            })
        }

        const storedOtp = StoreOtp.get(email);

        if (!storedOtp) {
            return res.status(400).json({
                message: "OTP not found. Please request a new OTP"
            });
        }

        if (Date.now() > storedOtp.expireAt) {

            StoreOtp.delete(email);

            return res.status(400).json({
                message: "OTP has expired"
            });
        }

        if(Number(otp) !== storedOtp.otp){
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        storedOtp.verified = true;

        return res.status(200).json({
            message: "OTP verified successfully"
        });

    }catch(err){
        console.log(err);

        return res.status(500).json({
            message:"Server Error"
        });
    }
    }

    async updatePassword(req ,res){
        try {

            const {
                email,
                password
            } = req.body ;

            if (!email || !password) {
                return res.status(400).json({
                    message: "Email and password are required"
                });
            }


            const storedData = StoreOtp.get(email);

            if (!storedData) {
                return res.status(403).json({
                    message: "Please verify OTP first"
                });
            }

            if (Date.now() > storedData.expireAt) {

                StoreOtp.delete(email);

                return res.status(403).json({
                    message: "OTP has expired. Please request a new OTP"
                });
            }

            if (!storedData.verified) {
                return res.status(403).json({
                    message: "Please verify OTP first"
                });
            }

            // Update password
            const response = await authModel.updatePassword(
                email,
                password
            );

            if (!response) {
                return res.status(404).json({
                    message: "User not found"
                });
            }

            // Delete OTP after password update
            StoreOtp.delete(email);

            return res.status(200).json({
                message: "Password updated successfully"
            });

        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message: "Server Error"
            });
        }
    }
}

module.exports = new System() ;