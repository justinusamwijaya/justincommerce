const { Product, productSchema } = require('./products.js')
const { User, userSchema } = require('./users.js')

productSchema.pre('save', function(next) {
    User.update(
        { }, 
        { $pull: { products: this._id } },
        { multi: true })
        .exec()
    User.findById(this.uploaderId,(err,userFound)=>{
        if(err) return res.status(400)
        userFound.products.push(this)
        userFound.save()
        next();
    })
});

productSchema.pre('remove', function(next) {
    User.update(
        { }, 
        { $pull: { products: this._id, cart: this._id } },
        { multi: true })
    .exec();
    next();
})

userSchema.pre('remove', function(next) {
    Product.remove({ uploaderId: this.uploaderId })
    .then(()=>{
        next();
    })
    .catch(error =>{
        console.log(error)
    })
})

module.exports = { Product, User }