const ErrorAPI = require('../../api/error')
const CustomError = require('../../entities/error')
const User = require('@sequelize/models').User
const bcrypt = require("bcrypt");

import { Response, Request, json } from "express";

class UserListener{

  static async login(req: Request, res: Response) {
    try{
      const { username, password } = req.body
      if(!username || !password) throw new CustomError("null-value", "username and password parameter is required")
      // const hashPass = await bcrypt.hash(password, 10)
      const users = await User.findAll({
        where: {
          username: username
        }
      })
      
      if(users.length > 0 && bcrypt.compareSync(password, users[0].password)) {
        res.status(200).json(users[0])
      } else throw new CustomError("auth/error", "Auth failed")
      
    }catch(err){
      console.log("asdfasdf")
      ErrorAPI.responseError(res, err)
    }  
  }

}

module.exports = UserListener