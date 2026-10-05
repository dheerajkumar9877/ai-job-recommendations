const z = require('zod');

const createRecruiterSchema = z.object({
    user_id: z
    .number()
    .int() 
    .positive(),

    name: z
    .string() 
    .min(4,{message : "Minimum 4 letter name required"})
    .max(30,{message: "Maximum letter should be below 30"}),

    profile_img:z
    .string()
    .optional(),

    email:z
    .string()
    .email(),

    phone: z
    .string(),

    location: z
    .string(),

    des: z
    .string(),


    c_name: z
    .string(),

    c_website: z
    .string()
    .url(),

    c_des: z
    .string()

})

const getProfileSchema = z.object({
    user_id: z.number().int().positive()
});


const updateRecuriterSchema = createRecruiterSchema.partial();

class RecruiterValidator{
    CreateProfile(data){
        return createRecruiterSchema.safeParse(data);  
    }

    UpdateProfile(data){
        return updateRecuriterSchema.safeParse(data);
    }

    GetProfile(data){
        return getProfileSchema.safeParse(data);
    }
}

module.exports = RecruiterValidator ;