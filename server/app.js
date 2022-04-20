require("dotenv").config({path:__dirname+'./config/dev.env'})
require("./DB/DB.config")
const express = require("express");
const cors = require("cors")
const { GeneralError } = require("./utils/error.handling")
const app = express();
var jade = require('jade');
const path = require("path")

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    optionsSuccessStatus: 204
}))

 app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');


app.use("/api/bugs", require("./routes/bugs.routes"))
app.use("/api/users", require("./routes/users.routes"))
app.use("/api/projects", require("./routes/projects.routes"))


// app.get('*',function(req,res){  
//     res.redirect(`http://localhost:3000/SignIn/`)
// })


app.use((err, req, res, next) => {
    if (err instanceof GeneralError) {
        return res.status(err.getCode()).json({
            status: 'error',
            message: err.message
        });
    }

    return res.status(500).json({
        status: 'error',
        message: err.message
    });
})

module.exports = app