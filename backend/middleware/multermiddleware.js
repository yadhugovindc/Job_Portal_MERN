const multer=require('multer');

const storage=multer.diskStorage({
  destination:(req,file,cb)=>{
    cb(null,'./uploads');
  },
  filename:(req,file,cb)=>{
    const unique=`${Date.now()}-${file.originalname}`
    cb(null,unique);
  }
})

const fileFilter=(req,file,cb)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg'){
    cb(null,true)
  }else{
    cb(new Error("only jpg,jpeg and png allowed"),false)
  }
}

exports.upload=multer({
  storage,
  fileFilter
})

// module.exports=upload;