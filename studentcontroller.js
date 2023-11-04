const Studentmodel = require("../Models/studentmodel.js");
const validation = require("./validator.js");
let jwt = require("jsonwebtoken")

let createStudent = async (req, res) => {
try{
    let data = req.body;
    if (!validation.isValidBody(data)){
        return res.status(400).send({ status: false, msg: "No Data Provided"});
    }
    let {Name, Usn, Gender, Email, Mobile, Password} = data;
    // Name validation
    if(!validation.isValid(Name)){
        return res.status(400).send({status:false, msg:"Please Enter your Name"})
    }
    if(!validation.isValidName.test(Name)){
        return res.status(400).send({msg:"Invalid Name"});

    }
    //usn validation
    if(!validation.isValid(Usn)){
        return res.status(400).send({status:false, msg:"Please Enter your Usn"})
    }
    let dupUsn = await Studentmodel.findOne({Usn});
    if(dupUsn) {
        return res.status(400).send({msg:"Usn Already Exists"});
    }
    //email validation
    if(!validation.isValid(Email)){
        return res.status(400).send({status:false, msg:"Please Enter your Email"})
    }
    let dupEmail = await Studentmodel.findOne({Email});
    if(dupEmail) {
        return res.status(400).send({msg:"Email Already Exists"});
    }
    if(!validation.isValidEmail.test(Email)){
        return res.status(400).send({msg:"Invalid Email"});

    }
    //gender validation
    if(!validation.isValid(Gender)){
        return res.status(400).send({status:false, msg:"Please Enter your Gender"})
    }
    //mobile validation
    if(!validation.isValid(Mobile)){
        return res.status(400).send({status:false, msg:"Please Enter your Mobile"})
    }
    let dupMobile = await Studentmodel.findOne({Mobile});
    if(dupMobile) {
        return res.status(400).send({msg:"Mobile Already Exists"});
    }
    if(!validation.isValidMobile.test(Mobile)){
        return res.status(400).send({msg:"Invalid Mobile"});

    }
    //password validation
    if(!validation.isValid(Password)){
        return res.status(400).send({status:false, msg:"Please Enter your Password"})
    }


    let registerStudent = await Studentmodel.create(data);
    return res.status(201)
    .send({
        status:true,
        msg: "Student Data registered Successfully",
        data: registerStudent,
        });
} catch(error){
    return res
    .status(500)
    .send({status:false, msg:"Internal Server Error"});

}


};


//login student

let loginStudent = async(req,res)=>{
    try{
        let data = req.body
        if(!validation.isValidBody(data)){
            return res.status(404).send({status: false, msg: "No data provided"});
        }
        let {Email, Password } = data;
        if(!validation.isValid(Email)){
            return res.status(400).send({status: false, msg: "Please enter your Email" });
        }
        if(!validation.isValid(Password)){
            return res.status(400).send({status: false, msg: "Please enter your Password" });
        }

        let matchStudent = await Studentmodel.findOne({ Email, Password});
        if(!matchStudent){
            return res.status(200).send({ msg: "Student Registered"});
        }else{
            const token = jwt.sign({
                studentId: matchStudent._id.toString(),
            },
            "MERN STACK",
            {
                expiresIn: "20000sec",
            }
            );
            return res.status(200)
            .send({msg: "Student logged in successfully", token});
        }
    }catch(error){
        return res
        .status(500)
        .send({ status: false, msg: "Internal Server Error"});  

    }
};

module.exports = {createStudent, loginStudent}

