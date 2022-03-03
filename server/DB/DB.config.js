const mongoose = require("mongoose")


mongoose.connect( process.env.MONGO_DEV,
{
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("DATABASE - connect successfully with server")
})
.catch(e => {
    console.log(e)
})