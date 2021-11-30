var mongoose    =   require('mongoose');


var feedbackSchema =new mongoose.Schema({

UseInfuture : String,
AttendedBefore :String,
recommendtoothers :String,
Reason :String,
});

module.exports = mongoose.model("Fform",feedbackSchema);
