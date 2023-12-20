const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const userModel = require('../models/userModel')


const authentication = async function (req, res, next) {
    try {
        let token = (req.headers.authorization)

        if (!token) {
            return res.status(400).send({ status: false, message: 'You are not logged in, Please login to proceed your request,Add token' })
        }

      
        let decodedToken
        try {
            decodedToken = jwt.verify(token, "extraSecurity")
        } catch (error) {
            return res.status(400).send({ status: false, msg: "INVALID TOKEN" })
        }
        const userId = decodedToken.id;
        const userData = await userModel.findOne({_id:userId}).lean();
        req.userData = userData;  
        next();

    } catch (error) {
        return res.status(500).send({ status: false, msg: error.message })

    }
}

module.exports = {authentication}