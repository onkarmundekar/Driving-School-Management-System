var mongoose    =   require('mongoose');


var studentSchema =new mongoose.Schema({

Name :String,
Address :String,
email :String,
pnumber :String,
Gender:String,
Vehicle:String,
biketype:String,
cartype:String,
licence:String



});



module.exports = mongoose.model("Sform",studentSchema);
