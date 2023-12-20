const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const bcrypt = require('bcrypt')

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const duplicateEmail = await userModel.findOne({ email }).count()
        if (duplicateEmail == 1)
            return res.status(400).send({ status: false, msg: "Email is already registered" })
        const  saltRounds = 10;
        const encPassword = await  bcrypt.hash(password,saltRounds)
        console.log({encPassword})
        const savedData = await userModel.create({ name, email,password: encPassword  })
        res.status(201).send({ status: true, msg: "Registered Successfully" })
    }
    catch (error) {
        console.log(error)
        res.status(500).send({ status: false, msg: "Internal Server Error" })
    }
}



const login = async (req, res) => {

    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email }).lean()

        if (!user)
            return res.status(400).send({ status: false, msg: "invalid Credentials" })

            const decryptPassword = await bcrypt.compare(password, user.password)
            console.log(decryptPassword)
            if (!decryptPassword) {
                return res.status(400).send({ status: false, msg: "invalid Credentials" })
            }

            // jwt token create and send back the user

        const token = jwt.sign({ id: user._id }, "extraSecurity", { expiresIn: '60m' })
        res.cookie("authorization", token,
            {
                expires: new Date((new Date).getTime() + (7 * 24 * 60 * 60 * 1000)),
            })
        return res.status(200).send({ status: true, msg: "Logged In Successfully" ,data:{token,email} })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ status: false, msg: "Internal Server Error" })
    }


}


module.exports = { register, login }