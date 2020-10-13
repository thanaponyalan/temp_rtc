var mongoose=require('mongoose');

module.exports=()=>{
    mongoose.set('debug',true);
    var db=mongoose.connect('mongodb://localhost/s60030037');
    require('../app/models/temp_rtc.model');
    return db;
}
