const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Name is required"], minlength: 3, maxlength: 30, },
    email: {
        type: String, required: [true, "Email is required"], minlength: 3, maxlength: 30, trim: true,
        unique: [true, 'Email should be unique'],
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(v);
            },
            message: 'Please enter a valid Email'
        }
    },
    role: { type: String, required: true, enum: ["user", "admin"], default: "user" },
    password: {
        type: String, required: [true, "Password is required"], minlength: 3,
        set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10))
    },
    phone: { type: String, required: false },
    address:{type:String,required:false,default:null},
    latitude:{type:Number,required:false,default:null},
    longitude:{type:Number,required:false,default:null},
    totalEarnedAndWithdrow:{type:Number,required:false,default:0},
    grandTotal:{type:Number,required:false,default:0},
    privacyPolicyAccepted: { type: Boolean, default: false, required: false },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    isDeleted: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    image: { type: Array, required: false, default: { publicFileUrl: "images/users/user.png", path: "public\\images\\users\\user.png" } },
    // driverLicenceFront: { type: Array, required: false, default: { publicFileUrl: "images/users/user.png", path: "public\\images\\users\\user.png" } },
    // driverLicenceback: { type: Array, required: false, default: { publicFileUrl: "images/users/user.png", path: "public\\images\\users\\user.png" } },
    oneTimeCode: { type: String, required: false, default: null },
},{ timestamps: true },
 {
    toJSON: {
        transform(doc, ret) {
            delete ret.password;
        },
    },
},
    
);

module.exports = mongoose.model('User', userSchema);