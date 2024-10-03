import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    email : {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
});

const adminUser = mongoose.model("adminUser", adminUserSchema);

export default adminUser;