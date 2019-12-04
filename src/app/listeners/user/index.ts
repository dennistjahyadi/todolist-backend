const ErrorAPI = require('../../api/error')
const CustomError = require('../../entities/error')
const User = require('@sequelize/models').User

import { Response, Request, json } from "express";

class UserListener{

  static async login(req: Request, res: Response) {
    try{
      const { username, password } = req.body
      if(!username || !password) throw new CustomError("null-value", "username and password parameter is required")

      const result = await User.findAll({
        where: {
          username: username,
          password: password
        }
      })
      if(result.length > 0) res.status(200).end()
      else throw new CustomError("auth/error", "Auth failed")
      
    }catch(err){
      ErrorAPI.responseError(res, err)
    }  
  }

}

module.exports = UserListener