const mongoose = require('mongoose')

const uri=process.env.MONGODBURI
mongoose.connect(uri)
.then(response=>console.log("connected to cart"))
.catch(err=>console.log(err.message))

const cartSchema = new mongoose.Schema({
    name:String,
    price:String
})

cartSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Cart', cartSchema)