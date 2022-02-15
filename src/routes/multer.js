const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage ( {
  destination: function (req, file, cb) {
    cb(null, path.resolve('public/images/products'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
})


const upload = multer({ storage: storage })

module.exports = upload;