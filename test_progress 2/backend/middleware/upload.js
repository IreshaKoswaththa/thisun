const path = require('path')
const multer = require('multer')


var storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null, 'uploads/')
  },
  filename:function(req,file,cb){
    let ext = path.extname(file.originalname)
    cb(null, Date.now()+ext)
  }
})

var upload = multer({
  storage: storage,
  fileFilter: function (req, file, callback) {
    if (file.mimetype === 'application/pdf') {
      callback(null, true); // Allow PDF files
    } else {
      console.log('Only PDF files are supported');
      callback(null, false); // Reject non-PDF files
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 200, // Limit file size to 200MB
  },
});

module.exports=upload