const { Application } = require("../models/Application")

const AddApplication = async(req,res)=>{
    const {name,key,category}= req.body;
    try {
        const duplicate = await Application.findOne({name:name})
        if(duplicate) return res.status(400).send({success:false,message:'Duplicate application!'})
        const newApplication = new Application({name,key,category})
        const result = await newApplication.save();
        if(result) return res.status(200).send({success:true,message:'Application saved!', result})
        res.status(400).send({success:false,message:'Uable to save application!'})
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    }
}

const UpdateApplication = async(req,res)=>{
    const {id,name,key,category}= req.body;
    try {
        const updatedApplicationData={name,key,category}
        const result = await Application.updateOne({_id:id},{$set:updatedApplicationData});
        if(result) return res.status(200).send({success:true,message:'Application updated!', result})
        res.status(400).send({success:false,message:'Uable to update application!'})
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    }
}


const GetApplications = async(req,res)=>{
    try {
        const result = await Application.find({})
        if(result && result.length>0) return res.status(200).send({success:true,message:'Applications found!', result})
        res.status(404).send({success:false,message:'Applications not found!'})
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    }
}
const GetApplication = async(req,res)=>{
    try {
        const {key}=req.params;
        const result = await Application.findOne({key:key})
        if(result) return res.status(200).send({success:true,message:'Application found!', result})
        res.status(404).send({success:false,message:'Application not found!'})
    } catch (error) {
        res.status(500).send({success:false,message:error.message})
    } 
}

module.exports={
    AddApplication:AddApplication,
    GetApplications:GetApplications,
    UpdateApplication:UpdateApplication,
    GetApplication:GetApplication
}