const userModer = require("../Model/UserModel");
const AddUser = async (req, res) => {
    // console.log("req.body", req.body);
  try {
    const exist = await userModer.findOne({ sub: req.body.sub });
    if (exist) {
      // console.log("user not found",exist);
      return res.status(200).json({
        success: false,
        message: "user already exist",
      });
    }
    // console.log("user not found");
    // console.log("user create");
    const user = await userModer.create(req.body);
    // console.log("user created", user);
    await user.save();
    res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
const GetUser = async (req, res) => {
  try {
    const users = await userModer.find();
    // console.log("user",users);
    if (!users) {
      return res.status(500).json({
        success: false,
        message: "Not found any users",
      });
    }
    res.status(200).json({
      success: true,
      users,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
module.exports = { AddUser, GetUser };
