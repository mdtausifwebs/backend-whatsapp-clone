const mongoose = require("mongoose");

const messageSchma = new mongoose.Schema({
  conversationId: {
    type: String,
  },
  senderId: {
    type: String,
  },
  receivedId: {
    type: String,
  },
  text: {
    type: String,
  },
  type: {
    type: String,
  },
},
{
    timestamps:true,
    versionKey:false
});
module.exports=mongoose.model("message",messageSchma)
