const multer = require('multer');
const path = require('path');

function getMulterStorageConfig (fileruta, filename) {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
          cb(null, path.join(__dirname, fileruta));
        },
        filename: (req, file, cb) => {
          const newFileName =
          filename + Date.now() + path.extname(file.originalname);
          cb(null, newFileName);
        },
      });
      return storage;
}

module.exports = getMulterStorageConfig;