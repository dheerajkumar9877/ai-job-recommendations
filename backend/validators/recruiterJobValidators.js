const z = require("zod");

const schema = z.object({
    user_id: z
        .number()
        .int()
        .positive(),

    title: z
        .string()
        .min(1, "Title is required"),

    c_name: z
        .string()
        .min(1, "Company name is required"),

    c_location: z
        .string()
        .min(1, "Company location is required"),

    c_type: z
        .string()
        .min(1, "Job type is required"),

    experience: z
        .string()
        .min(1, "Experience is required"),

    salary: z
        .string()
        .min(1, "Salary is required"),

    category: z
        .string()
        .min(1, "Category is required"),

    skills: z
        .string()
        .min(1, "Skills are required"),

    job_des: z
        .string()
        .min(1, "Job description is required"),

    requir: z
        .string()
        .min(1, "Requirements are required"),

    active: z
        .string()
        .optional()
        .default("active"),
});


class JobValidator {

    CreateJob(data) {
        return schema.safeParse(data);
    }

    UpdateJob(data) {
        return schema.partial().safeParse(data);
    }

    GetJob(data) {
        return z.object({
            user_id: z.coerce
                .number()
                .int()
                .positive()
        }).safeParse(data);
    }

    GetJobById(data) {
        return z.object({
            user_id: z.coerce
                .number()
                .int()
                .positive(),

            job_id: z
                .string()
                .min(1, "Job ID is required")
        }).safeParse(data);
    }

    UpdateJob(data) {
        const updateSchema = z.object({
            user_id: z
                .coerce
                .number()
                .int()
                .positive(),

            job_id: z
                .string()
                .min(1, "Job ID is required"),

            title: z
                .string()
                .min(1, "Title is required"),

            c_name: z
                .string()
                .min(1, "Company name is required"),

            c_location: z
                .string()
                .min(1, "Company location is required"),

            c_type: z
                .string()
                .min(1, "Job type is required"),

            experience: z
                .string()
                .min(1, "Experience is required"),

            salary: z
                .string()
                .min(1, "Salary is required"),

            category: z
                .string()
                .min(1, "Category is required"),

            skills: z
                .string()
                .min(1, "Skills are required"),

            job_des: z
                .string()
                .min(1, "Job description is required"),

            requir: z
                .string()
                .min(1, "Requirements are required"),

            active: z
                .string()
                .optional()
                .default("active"),
        });

        return updateSchema.safeParse(data);
    }

    ViewJob(data) {
        const viewJobSchema = z.object({
            user_id: z.coerce
                .number()
                .int()
                .positive(),

            job_id: z
                .string()
                .min(1, "Job ID is required"),
        });

        return viewJobSchema.safeParse(data);
    }

    DeleteJob(data){
        const deleteJobSchema = z.object({
            user_id: z.coerce
                .number()
                .int()
                .positive(),

            job_id: z
                .string()
                .min(1, "Job ID is required"),
        });

        return deleteJobSchema.safeParse(data);
    }
}

module.exports = new JobValidator();