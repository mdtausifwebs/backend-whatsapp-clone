const ConversationModel = require("../Model/ConversationModel");
const Message = require("../Model/MessageModel");

const grid = require("gridfs-stream");
const mongoose = require("mongoose");
const conn = mongoose.connection;
let gridFsBucket,gfs;
const url = "http://localhost:5000";
conn.once("open", () => {
  gridFsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});

const conversation = async (req, res) => {
  try {
    // console.log(req.body);
    const senderId = req.body.senderId;
    const receivedId = req.body.receivedId;
    // console.log(senderId,receivedId)
    const exist = await ConversationModel.findOne({
      members: { $all: [receivedId, senderId] },
    });
    if (exist) {
      return res.status(200).json({
        success: true,
        exist,
        message: "conversation already exists",
      });
    }
    const newConversation = new ConversationModel({
      members: [receivedId, senderId],
    });
    await newConversation.save();
    return res.status(201).json({
      success: true,
      newConversation,
      message: "conversation saved successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "some thing is wrong",
    });
  }
};
const getconversations = async (req, res) => {
  try {
    const senderId = req.body.senderId;
    const receivedId = req.body.receivedId;
    let conversation = await ConversationModel.findOne({
      members: { $all: [receivedId, senderId] },
    });

    if (conversation) {
      return res.status(200).json({
        success: false,
        conversation,
      });
    }
    conversation = await ConversationModel.create({
      members: [receivedId, senderId],
    });
    await conversation.save();
    if (conversation) {
      return res.status(200).json({
        success: true,
        conversation,
      });
    }
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};

const newmassage = async (req, res) => {
  try {
    const newmassage = await Message.create(req.body);
    let conversation = await ConversationModel.findByIdAndUpdate(
      req.body.conversationId,
      {
        message: req.body.text,
      }
    );
    newmassage.save();
    conversation.save();
    return res.status(200).json({
      success: true,
      newmassage,
      // conversation,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};
const getmessage = async (req, res) => {
  try {
    const message = await Message.find({ conversationId: req.params.id });
    return res.status(200).json({
      success: true,
      message,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const uploadfile = async (req, res) => {
  try {
    // console.log(req.file)
    if (!req.file) {
      return res.status(500).json({
        success: false,
        message: "file not found",
      });
    }
    const imageurl = `${url}/api/v1/file/${req.file.filename}`;
    // console.log(imageurl)
    return res.status(200).json({
      imageurl,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
const getFileImageUrl = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridFsBucket.openDownloadStream(file._id);
    readStream.pipe(res);
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = {
  conversation,
  getconversations,
  newmassage,
  getmessage,
  uploadfile,
  getFileImageUrl,
};
