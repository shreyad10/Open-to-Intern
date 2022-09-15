const internModel = require("../models/internModel.js")
const collegeModel = require("../models/collegeModel.js")


const createIntern = async function (req, res) {
    try {
        let data = req.body
        let name = await collegeModel.findOne({name :data.collegeName}).select({_id : 1})
        data['collegeId'] = name._id
        let saved = await internModel.create(data)
        let result = await internModel.find(saved).select({ __v: 0 })
        res.status(201).send({ status: true, message: "intern created", data: result })
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}

const getCollege = async function (req, res) {
    try {
        let name = req.query.collegeName
        if (name.length == 0) return res.status(400).send({ status: false, message: "Please provide a college name" })

        if (!name) return res.status(400).send({ status: false, message: "Must enter college name" })

        let college = await collegeModel.findOne({ name: name })
        if (!college) return res.status(400).send({ status: false, message: "This college doesn't exist" })

        let interns = await internModel.find({ collegeId: college._id }).select({ "name": 1, "email": 1, "mobile": 1 })
        if (interns.length == 0) return res.status(404).send({ status: false, message: "No interns available for this College" })

        let internDetails = {
            name: college.name, fullName: college.fullName,
            logoLink: college.logoLink, interns: interns
        }
        return res.status(200).send({ status: true, message: "list of interns", data: internDetails })
    }
    catch (error) {
        return res.status(500).send({ error: error.message })
    }
}


module.exports.createIntern = createIntern
module.exports.getCollege = getCollege
