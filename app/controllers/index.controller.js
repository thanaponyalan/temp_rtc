const { temp_rtc } = require('../models/temp_rtc.model');

var render=(req,res)=>{
    temp_rtc.find({},(err,data)=>{
	    if(!err)res.render('index',{tempData: data});
    });
}

var addData=(req,res)=>{
    var r=temp_rtc.insertMany(req.body);
    res.json(r)
}

var getData=(req,res)=>{
    let detail=new Array();
    temp_rtc.find({},(err,data)=>{
        if(!err){
            data.forEach((item,index)=>{
                let dt=new Date(item.year, (item.month-1), item.day, item.hour, item.minute);
                detail.push(dt, item.temperature, item.humidity);
            });
            res.json(detail);
        }
    })
}

module.exports={
    render,
    addData,
    getData
}


