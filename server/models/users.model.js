const mongoose = require("mongoose")
const validator = require("validator")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email address")
            }
        }
    },
    password: {
        type: String,
        required: true,
        minLength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    resettingLink: {
        data: String,
        default: ''
    },
    isHaveProject: {
        type: Boolean,
        default: false,
        required: true
    }
}, {
    timestamps: true
})


// update user object aka removeing passwod or tokens array
userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;
    delete userObject.resettingLink;
    return userObject;
}


userSchema.methods.generateJsonWebToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "30d" })
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token;
}


userSchema.pre("save", async function (next) {
    try {
        const user = this
        if (user.isModified("password")) {
            const hashedPassword = await bcrypt.hash(user.password, 12);
            user.password = hashedPassword;
        }
        next();
    }
    catch (e) {
        next(e)
    }
})


const userModal = mongoose.model("user", userSchema)

module.exports = userModal