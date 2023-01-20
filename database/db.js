const mongoose = require("mongoose");

const db = () => {
  mongoose
    .connect(process.env.DBURL, { useNewUrlParser: true })
    .then((data) => {
      console.log(`connect db on ${data.connection.host}`);
    })
    .catch((err) => {
      console.log(`not connected ${err.message}`);
    });
};
mongoose.set('strictQuery', false);
module.exports = db;
