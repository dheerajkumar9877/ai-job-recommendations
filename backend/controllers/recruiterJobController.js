const { success } = require("zod");
const RecruiterJob = require("../models/recuiterJobModel");
const RecruiterJobValidator = require("../validators/recruiterJobValidators.js");

class Job {

    async CreateJob(req, res) {
        try {
            const validatorsResponse =
                RecruiterJobValidator.CreateJob(req.body);

            if (!validatorsResponse.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validator error",
                    errors: validatorsResponse.error.issues.map(
                        (field) => field.message
                    ),
                });
            }

            await RecruiterJob.CreateJob(
                validatorsResponse.data
            );

            return res.status(200).json({
                success: true,
                message: "Job created successfully"
            });

        } catch (err) {
            console.error("Create Job Error:", err);

            return res.status(500).json({
                success: false,
                message: "Server error",
                error: err.message
            });
        }
    }

    async allJob(req, res) {
        try {

            const user_id = Number(req.query.user_id);

            if (!Number.isInteger(user_id) || user_id <= 0) {
                return res.status(400).json({
                    success: false,
                    message: "Valid User ID is required"
                });
            }

            const validatorsResponse =
                RecruiterJobValidator.GetJob({
                    user_id
                });

            if (!validatorsResponse.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validation Error",
                    errors: validatorsResponse.error.issues.map(
                        (field) => field.message
                    )
                });
            }

            const jobs = await RecruiterJob.GetJob(
                validatorsResponse.data.user_id
            );

            return res.status(200).json({
                success: true,
                message: "Jobs fetched successfully",
                jobs
            });

        } catch (error) {

            console.error("All Jobs Error:", error);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch jobs",
                error: error.message
            });
        }
    }

    async updateJob(req, res) {
        try {

            const { user_id, job_id } = req.params;

            if (!user_id || !job_id) {
                return res.status(400).json({
                    success: false,
                    message: "User ID and Job ID are required"
                });
            }

            if (!req.body || typeof req.body !== "object") {
                return res.status(400).json({
                    success: false,
                    message: "Request body is missing"
                });
            }

            const data = {
                user_id: Number(user_id),
                job_id: job_id,
                title: req.body.title,
                c_name: req.body.c_name,
                c_location: req.body.c_location,
                c_type: req.body.c_type,
                experience: req.body.experience,
                salary: String(req.body.salary ?? ""),
                category: req.body.category,
                skills: req.body.skills,
                job_des: req.body.job_des,
                requir: req.body.requir,
                active: req.body.active || "active"
            };

            const validatorsResponse =
                RecruiterJobValidator.UpdateJob(data);

            if (!validatorsResponse.success) {
                console.log(
                    "VALIDATION ERRORS:",
                    validatorsResponse.error.issues
                );

                return res.status(400).json({
                    success: false,
                    message: "Validator error",
                    errors: validatorsResponse.error.issues.map(
                        (field) => field.message
                    )
                });
            }

            const result = await RecruiterJob.updateJob(
                validatorsResponse.data
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Job not found or you are not authorized to update this job"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Job updated successfully",
                job: result
            });

        } catch (err) {
            console.error("Update Job Error:", err);

            return res.status(500).json({
                success: false,
                message: "Server Error",
                error: err.message
            });
        }
    }

    async getJobById(req, res) {
        try {

            const { user_id, job_id } = req.params;
            const data = {
                user_id: Number(user_id),
                job_id
            };

            const validatorsResponse =
                RecruiterJobValidator.GetJobById(data);

            if (!validatorsResponse.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validator error",
                    errors: validatorsResponse.error.issues.map(
                        (field) => field.message
                    )
                });
            }

            const response = await RecruiterJob.getJobById(
                validatorsResponse.data.user_id,
                validatorsResponse.data.job_id
            );

            return res.status(200).json({
                success: true,
                message: "Job loaded successfully",
                data: response
            });

        } catch (error) {

            console.error("Get Job By ID Error:", error);

            return res.status(500).json({
                success: false,
                message: "Server Error",
                error: error.message
            });
        }
    }

    async viewJob(req, res) {
        try {
            const data = {
                user_id: req.params.user_id,
                job_id: req.params.job_id
            };
            const validatorsResponse =
                RecruiterJobValidator.ViewJob(data);

            if (!validatorsResponse.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validator error",
                    errors: validatorsResponse.error.issues.map(
                        (field) => field.message
                    )
                });
            }


            const result = await RecruiterJob.viewJob(
                validatorsResponse.data
            );


            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Job viewed successfully",
                job: result[0]
            });

        } catch (error) {
            console.error("View Job Error:", error);

            return res.status(500).json({
                success: false,
                message: "Server error",
                error: error.message
            });
        }
    }

    async deleteJob(req ,res) {
        try {
            const data = {
                user_id: req.params.user_id,
                job_id: req.params.job_id
            };

            const validatorsResponse = 
                RecruiterJobValidator.DeleteJob(data);

            if (!validatorsResponse.success) {
                return res.status(400).json({
                    success: false,
                    message: "Validator error",
                    errors: validatorsResponse.error.issues.map(
                        (field) => field.message
                    )
                });
            }


            const result = await RecruiterJob.deleteJob(
                validatorsResponse.data
            );


            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Job not found"
                });
            }

            return res.status(200).json({
                success: true,
                message: "Job deleted successfully",
                job: result[0]
            });


        } catch (error) {
            console.log(error);

            return res.status(500).json({
                message:"Server erorr"
            })
        }
    }
}

module.exports = new Job();