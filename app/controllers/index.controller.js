const { temp_rtc } = require('../models/temp_rtc.model');
exports.render=(req,res)=>{
    temp_rtc.find({},(err,data)=>{
	if(!err)res.json(data);;
    });
}
