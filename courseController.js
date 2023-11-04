const coursecontroller=require("./courseModel");

let createcourse = async(req,res)=>{
    try{
        let data = req.body
        let register = await coursemodel.create(data);
        return res
        .status(201)
        .send({
            status:true,
            msg:"course created successfully",
            data:register,
        });

    }catch(error){
        return res.status(500)
        .send({status:false,msg:"internal service error"});

    }
};
module.exports={createcourse}
