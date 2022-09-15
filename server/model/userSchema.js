const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    tokens: [
        {
            token: {
                type: String,
                required: true
            }
        }
    ]
})

userSchema.pre('save', async function (next) {
    // console.log("pre")
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next();
})

userSchema.methods.generateAuthToken = async function () {
    try {

        const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY)

        this.tokens= this.tokens.concat({token})
        await this.save();
        return token
    }
    catch (err) {
        console.log(err);
    }
}

const USER = mongoose.model('USER', userSchema)

module.exports = USER