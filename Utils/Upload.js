const multer = require("multer");
const { GridFsStorage } = require("multer-gridfs-storage");

const storage = new GridFsStorage({
  url: `${process.env.DBURL}`,
  option: { useUnifindTopology: true, useNameUrlParser: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.mimeType) === -1) {
      return `${Date.now()}-file-${file.originalname}`;
    }
    return {
      bucketName: "photo",
      filename: `${Date.now()}-file-${file.originalname}`,
    };
  },
});
const Upload = multer({ storage });
// console.log(Upload)
module.exports = { Upload };
