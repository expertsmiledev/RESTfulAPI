const{ products} = require("../models/productsSchema")

const productController={
    getAll:(req,res)=>{
        products.find({isDeleted: false },(err,doc)=>{
            if(!err){
                res.json(doc)
            }else{
                res.status(500).json(err)
            }
        })
    },
    getByID:(req,res)=>{
        let id=req.params.id
        products.findById(id,(err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    add:(req,res)=>{
        let newProduct= new products({
            name:req.body.name,
            description:req.body.description
        })
        newProduct.save((err,docs)=>{
            if(!err){
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    delete:(req,res)=>{
        const id=req.params.id
        products.findById(id,(err,docs)=>{
            if(!err){
                docs.save()
                docs.isDeleted = true;
                res.json(docs)
            }else{
                res.status(500).json(err)
            }
        })
    },
    update:(req,res)=>{
        const id=req.params.id
        products.findByIdAndUpdate(id,{name:req.body.name,description:req.body.description,runValidators:true},(err,docs)=>{
            if(!err){
                res.json(docs)
                docs.save()
            }else{
                res.status(500).json(err)
            }
        })
    }
}


module.exports={
    productController
}