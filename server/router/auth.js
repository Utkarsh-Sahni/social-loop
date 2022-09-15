const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const USER = require('../model/userSchema')
router.get('/', (req, res) => {

    res.send("Hello from router server")
})
// router.get('/signin', (req, res) => {
//     res.cookie('c', 'c')
//     res.send("signed in")
// })

router.post('/register', async (req, res) => {

    const { username, email, password } = req.body

    if (!username || !email || !password) {
        res.status(400).json({ status: 400, error: "data field empty" })
    }
    try {
        const userExist = await USER.findOne({ email })

        if (userExist) res.status(400).json({ status: 422, error: "User Already exist " })
        else {
            const user = new USER({ username, email, password })

            await user.save()
            res.status(201).json({ status: 201, message: "User registered Successfully" })

        }
    }
    catch (err) { console.log(err) }
})

router.post('/signin', async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) res.status(400).json({ status: 400, error: 'data field empty' })
    try {
        const userReg = await USER.findOne({ username })

        let token

        if (userReg) {
            if (await bcrypt.compare(password, userReg.password)) {

                token = await userReg.generateAuthToken();

                res.status(200)
                .cookie('jwtoken', token, {
                    expires: new Date(Date.now() + 25892000000),
                    httpOnly: true
                })
                .json({ status: 200, message: "login successful" })

            }
            else res.status(400).json({ status: 400, error: "Wrong credentials" })


        }
        else res.status(400).json({ status: 400, error: "User does not exist. Please register." })
    }
    catch (err) { console.log(err) }
})



module.exports = router