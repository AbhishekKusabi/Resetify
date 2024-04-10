// import mongoose from "mongoose";

// const UserSchema = new mongoose.Schema({
//     username: {type: String, required: true, unique: false},
//     email: {type: String, required: true, unique: true},
//     dob:{type:Date,required: true, unique: true},
//     age:{type:Number,required: true, unique: true},
//     address:{type:String,required: true, unique: true},
//     city:{type:String,required: true, unique: true},
//     state:{type:String,required: true, unique: true},
//     password: {type: String, required: true}
// })

// const UserModel = mongoose.model("User", UserSchema)

// export {UserModel as User}
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    dob:{type:Date,required: true, unique: true},
    age:{type:Number,required: true, unique: true},
    address:{type:String,required: true, unique: true},
    city:{type:String,required: true, unique: true},
    state:{type:String,required: true, unique: true},
    password: {type: String, required: true}
})

const UserModel = mongoose.model("User", UserSchema)

export {UserModel as User}