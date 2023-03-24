 const express=require("express")
const { default: mongoose } = require("mongoose")
const productRoute=require("./routes/productRoute")
const cors = require("cors");
const app=express()

app.use(cors())

mongoose.connect("mongodb+srv://gulshen:program2022@cluster0.fg9rwde.mongodb.net/test")
    .then(res => {
        console.log('Connect!');
    })
    .catch(err => {
        console.log('err', err);
    })
app.use(express.json());
app.use(express.urlencoded());
app.use("/api/product",productRoute)

app.get('/', function (req, res) {
    res.json("Hello");
})


app.listen(8080);