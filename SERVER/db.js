const mongoose = require("mongoose");

module.exports =()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect('mongodb+srv://Roshan:25October2000@cluster0.n8ckk.mongodb.net/test' , connectionParams);
        console.log("Connection to Database succesfully...");
    } catch (error) {
        console.log(error);
        console.log("Connection to Database failed...");
    }
}