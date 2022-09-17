const collegeModel = require("../models/collegeModel")
const mongoose = require("mongoose")

const createCollege = async function (req,res){
    try{
    let data = req.body 
    let savedData = await collegeModel.create(data)
    return res.status(201).send({ status : true, message :"College has been created", data : savedData})
    }
    catch(error){
        return res.status(500).send({error : error.message})
    }
}

module.exports.createCollege =createCollege