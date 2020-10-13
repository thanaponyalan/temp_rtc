const { temp_rtc } = require('../models/temp_rtc.model');

var render=(req,res)=>{
    temp_rtc.find({},(err,data)=>{
	if(!err)res.json(data);
    });
}

var addData=(req,res)=>{
    var r=temp_rtc.insertMany(req.body);
    res.json(r)
}

module.exports={
    render,
    addData
}


