import mongoose, {Schema} from "mongoose";
import { JsonWebTokenError } from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {username:{
        type : String,
        required: true,
        unique : true,
        lowercase:true,
        trim: true,
        index:true
    },
    email:{
    type : String,
    required: true,
    unique : true,
    lowercase:true,
    trim: true,
    },
    fullname:{
        type : String,
        required: true,
        trim: true,
        index:true
    },
    avatar:{
        type:String, //clodinary url
        required:true,
    },
    coverimage:{
        type:String,
    },
    watchHistory:{
        type:Schema.Types.ObjectId,
        ref:"Video"
    },
    password:{
        type:String,
        required:[true, 'password is required']
    },
    refreshTokens:{
        type:String
    },
    
    },
    {timestamps:ture}
)

userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=bcrypt.hash(this.password,10)
    next()
})
userSchema.methods.ispasswordCorrect = async function (password) {
return await bcrypt.compare(password,this.password)
}
userSchema.methods.genrateAccessToken = function(){
    JsonWebTokenError.sing(
        {
            _id:this._id,
            email:this.email,
            username:this.username,
            fullname:this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiryIn:env.ACCESS_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.genrateRefreshToken = function(){
    JsonWebTokenError.sing(
        {
            _id:this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiryIn:env.REFRESH_TOKEN_EXPIRY
        }
    )
}
export const User = mongoose.model("User", userSchema)