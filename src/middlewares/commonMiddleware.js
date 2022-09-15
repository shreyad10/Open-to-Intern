// ------------- VALIDATORS ----------------
const collegeModel = require('../models/collegeModel')
const internModel = require('../models/internModel')
const { isValidBody, isValidEmail, isValidId, isValidName, isValidNumber, isValidUrl } = require('../validators/validators')


const collegeValidator = async function (req, res, next) {
    let data = req.body
    if (!isValidBody(data)) return res.status(400).send({ status: false, message: "Request body can't be empty" })
    let { name, fullName, logoLink } = data

    if (!name || !isValidName(name.trim())) return res.status(400).send({ status: false, message: "Enter name in valid format" })

    let result = await collegeModel.findOne({ name: name })
    console.log(result)
    if (result) return res.status(400).send({ status: true, message: "This college already exist! " })

    if (!fullName || !isValidName(fullName.trim())) return res.status(400).send({ status: false, message: "Enter fullName in valid format" })
    if (!logoLink || !isValidUrl(logoLink.trim())) return res.status(400).send({ status: false, message: "Enter logoLink in valid format" })
    next()

}

const internValidator = async function (req, res, next) {
    
    let data = req.body
    if (!isValidBody(data)) return res.status(400).send({ status: false, message: "Request body can't be empty" })

    let { name, email, mobile, collegeName } = data
    if (!name || !isValidName(name.trim())) return res.status(400).send({ status: false, message: "Enter name in valid format" })

    if (!email || !isValidEmail(email.trim())) return res.status(400).send({ status: false, message: "Enter email in valid format" })
    let result = await internModel.findOne({ email: email })
    if (result) return res.status(400).send({ status: false, message: "This email is already registered" })

    if (!mobile || !isValidNumber(mobile.trim())) return res.status(400).send({ status: false, message: "Enter mobile in valid format, a valid mobile number starts with 6,7,8 or 9" })
    let isUniqueMob = await internModel.findOne({mobile:mobile}) 
    if(isUniqueMob) return res.status(400).send({ status: false, message: "This Mobile Nubmer is already registered" })

    if (!collegeName || !isValidName(collegeName.trim())) return res.status(400).send({ status: false, message: "Enter collegeId in valid format" })

    let isValidCollege = await collegeModel.findOne({ name :collegeName});
    if(!isValidCollege) return res.status(400).send({ status: false, message: "Provided College does not exists" })
    next()
}

module.exports.collegeValidator = collegeValidator
module.exports.internValidator = internValidator
