const mongoose = require("mongoose");

module.exports =()=>{
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };

    try {
        mongoose.connect(process.env.DB , connectionParams);
        console.log("Connection to Database succesfully...");
    } catch (error) {
        console.log(error);
        console.log("Connection to Database failed...");
    }
}