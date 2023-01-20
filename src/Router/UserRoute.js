const { AddUser, GetUser } = require("../Controller/UserCont");

const Routers = require("express").Router();

Routers.post("/adduser", AddUser);
Routers.get("/getusers", GetUser);
module.exports = Routers;
