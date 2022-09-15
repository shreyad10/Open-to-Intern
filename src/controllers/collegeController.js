const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose")

const createCollege = async function (req,res){
    try{
    let data = req.body 
    let savedData = await collegeModel.create(data)
    let result = await collegeModel.find(savedData).select({__v :0})
    return res.status(201).send({ status : true, message :"College has been created", data : result})
    }
    catch(error){
        return res.status(500).send({error : error.message})
    }
}

module.exports.createCollege =createCollege