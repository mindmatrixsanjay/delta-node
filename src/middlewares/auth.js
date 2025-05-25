

const userAuth=(req,res,next)=>{
  const tokens='abc';
  const isAuthorized=tokens==='abc';
  if(!isAuthorized){
  res.status(401).send('not authorized')
  }else{ 
    next();
  }
}

const adminAuth=(req,res,next)=>{
  const tokens='abc';
  const isAuthorized=tokens==='abc';
  if(!isAuthorized){
  res.status(401).send('not authorized')
  }else{ 
    next();
  }
}

module.exports={
  userAuth,
  adminAuth
}