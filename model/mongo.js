const mongoose = require('mongoose')

const url = process.env.MONGODBURI

mongoose.connect(url)
.then(result=>console.log("connected successfully"))
.catch(err=>console.log(err.message))

const itemSchema= new mongoose.Schema({
    name:String,
    genre:String,
    price:String
})

itemSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})
module.exports = mongoose.model('Item', itemSchema)