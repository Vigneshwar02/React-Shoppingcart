require('dotenv').config()
const express = require('express')
const app = express();
const cors = require('cors');
const List = require("./model/mongo");
const Cart = require('./model/cart')

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000', '*', 'https://my-custom-react-shoppingcart.herokuapp.com/');


    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// app.use(cors)
app.use(express.static('build'))
app.use(express.json())
// Add headers before the routes are defined


app.get('/',(req,res)=>{
    res.send("<h1>Running on port 3001</h1>")
})

app.get('/api/list',(req,res)=>{
    List.find({}).then(list=>
        {res.json(list)
        })
})

app.get('/api/list/cart', (req, res) => {
    Cart.find({}).then(list => {
        res.json(list)
    })
})


app.post('/api/list',(req,res)=>{
    const name =req.body.name
    const genre=req.body.genre
    const price= req.body.price

    const list = new List({
        name:name,
        genre:genre,
        price:price
    })

    list.save().then(resp=>res.json(resp))
})

app.post('/api/list/cart',(req,res)=>{
    const itemAdded= req.body.name
    const itemPrice= req.body.price
    console.log(itemAdded)
    console.log(itemPrice)
    const cart = new Cart({
        name:itemAdded,
        price:itemPrice
    })

    cart.save().then(resp=>res.json(resp))
})

app.delete('/api/list/cart/:id',(req,res)=>{
    const id=req.params.id
    Cart.findByIdAndRemove(id).then(()=>res.status(204).end())
})

const port = process.env.PORT
app.listen(port,()=>{
    console.log("server's running at port 3001")
})