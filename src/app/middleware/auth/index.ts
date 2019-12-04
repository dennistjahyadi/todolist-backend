export {}
import { Response, NextFunction } from "express";
const User = require('@sequelize/models').User
const CustomError = require("../../entities/error")

module.exports = async (req: any, res: Response, next: NextFunction) => {
  try{
    const result = await User.findAll({
      where: {
        token: req.token
      }
    })
    if(result.length > 0) next()
    else throw new CustomError("auth/error", "Auth failed")
    
  }catch(err){
    if(err.name === "auth/error") res.status(403).end();
    res.status(500).json(err.stack);
  }
}
