import jwt from 'jsonwebtoken'


//decrypt token
export const decrypt = (req, res, next) => {
   try {
    const token = req.headers.authorization.split(" ")[1]
    const decrypt = jwt.verify(token, process.env.SECRET);
    req.body.userId = decrypt.userId;
    next()
   } catch (error) {
      res.send({
        message: error.message,
        success: false
      })
   }
}