const { Upload } = require("../../Utils/Upload");
const {
  conversation,
  getconversations,
  newmassage,
  getmessage,
  uploadfile,
  getFileImageUrl,
} = require("../Controller/ConversationContr");

const Routers = require("express").Router();
Routers.post("/conversation/add", conversation);
Routers.post("/conversation/get", getconversations);
Routers.post("/message/add", newmassage);
Routers.get("/message/get/:id", getmessage);
Routers.post("/file/upload", Upload.single("file"), uploadfile);
Routers.get("/file/:filename", getFileImageUrl);

module.exports = Routers;
