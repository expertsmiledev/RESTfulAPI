const { default: mongoose } = require("mongoose");
const Schema=mongoose.Schema


const schema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    addDate: {
        type:Date,
        default: Date.now()
    },
    isDeleted: {
        type: Boolean, default: false
    },
})
const products=mongoose.model("productSchema",schema)



module.exports={
    products
}

