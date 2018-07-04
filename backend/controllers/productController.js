const { Product } = require('../models')
const mongoose = require('mongoose')

module.exports = {
    addProduct: (req,res)=>{
        console.log(req.body)
        let { productName, productDescription, productPrice } = req.body

        let newProduct = new Product({
            productName,
            productDescription,
            productPrice,
            productPicture:req.file ? req.file.cloudStoragePublicUrl : '',
            uploaderId: mongoose.Types.ObjectId(req.user.id)
        })
        Product.create(newProduct)
        .then(result =>{
            res.status(200).json({
                message: 'data has been added!',
                result
            })
        })
    },
    getAllProduct: (req,res)=>{
        let condition = req.params.id ? { uploaderId: req.params.id } : {}
        Product.find(condition)
        .then(result =>{
            res.status(200).json({
                message: 'all data fetched!',
                result
            })
        })
    },
    getOneProduct: (req,res)=>{
        Product.findById(req.params.id)
        .then(result =>{
            res.status(200).json({
                message: 'data has been found!',
                result
            })
        })
    },
    updateProduct: (req,res)=>{
        Product.findById(req.params.id)
        .then(result =>{
            result.productName=req.body.productName
            result.productDescription=req.body.productDescription
            result.productPrice=req.body.productPrice

            result.save(err=>{
                if(err) return res.status(400).json({msg:err})
                res.status(200).json({
                    message: 'data has been updated!',
                    result
                })
            })
        })
    },
    deleteProduct: (req,res)=>{
        Product.findById(req.params.id)
        .then(result =>{
            result.remove(err=>{
                if(err) return res.status(400).json({msg:err})
                res.status(200).json({
                    message: 'data has been deleted!',
                    result
                })
            })
        })
    }
}