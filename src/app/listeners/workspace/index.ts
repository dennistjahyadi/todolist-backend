const Workspace = require('@sequelize/models').Workspace
const ErrorAPI = require('../../api/error')
const CustomError = require('../../entities/error')

import { Response, Request } from "express";

class WorkspaceListener{

  static async getAll(req: Request, res: Response) {
    try{
      const result = await Workspace.findAll({
        where: {
          deleted: false
        }
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async create(req: Request, res: Response) {
    try{
      const { name } = req.body
      if(!name) throw new CustomError("null-value", "name parameter is required")

      const result = await Workspace.create({
        name: name
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async update(req: Request, res: Response) {
    try{
      const { id, name } = req.body
      if(!id || !name) throw new CustomError("null-value", "id and name parameter is required")

      await Workspace.update({
        name: name,
      }, {
        where: {
          id: id
        }
      });
      return res.status(200).json(1)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async destroy(req: Request, res: Response) {
    try{
      const { id } = req.body
      if(!id) throw new CustomError("null-value", "id parameter is required")

      await Workspace.update({
        deleted: true,
      }, {
        where: {
          id: id
        }
      });
      return res.status(200).json(1)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

}

module.exports = WorkspaceListener