import { useTimestamps } from "model/lib/base_config";
import mongoose ,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";


const videoSchema = new Schema(
    {
        videofile:{
            tpes:String, //cliodinary url
            required:true        
},
thumnail:{
    type:String, //cloudinary url
    required : true
},
title:{
    type:String, // clodinary url
required: true
},
description:{
    type:String, 
required: true
},
duration:{
type:Number,
required: true
},
views:{
    type:Number,
    default:0
},
ispublished: {
    type:Boolean,
    default:true
},
owner:{
    type:Schema.Types.ObjectId,
    ref:"User"
}
    
},  
    {useTimestamps:true})

videoSchema.plugin(mongooseAggregatePaginate)
export const Video = mongoose.model("Video, videoSchema")