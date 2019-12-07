const Todo = require('@sequelize/models').Todo
const ErrorAPI = require('../../api/error')
const CustomError = require('../../entities/error')
const TodoDetails = require('@sequelize/models').TodoDetails
const Workspace = require('@sequelize/models').Workspace

import { Response, Request } from "express";


class TodoListener {

  static async getAllByWorkspaceId(req: Request, res: Response) {
    try{
      const { workspaceId } = req.params
      if(!workspaceId) throw new CustomError("null-value", "workspaceId parameter is required")

      const result = await Todo.findAll({
        where: {
          WorkspaceId: workspaceId,
          deleted: false
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['id', 'ASC']
        ]
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  
  static async getAll(req: Request, res: Response) {
    try{

      const result = await Todo.findAll({
        where: {
          deleted: false
        },
        order: [
          // Will escape title and validate DESC against a list of valid direction parameters
          ['id', 'ASC']
        ]
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }
  
  static async getDetails(req: Request, res: Response){
    try{
      const { todoId } = req.params

      const result = await Todo.findOne({
        where: {
          id: todoId,
          deleted: false
        },
        include: [
          { model: Workspace },
          { model: TodoDetails }
        ]
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async create(req: Request, res: Response) {
    try{
      const { content, workspaceId } = req.body
      if(!content || !workspaceId) throw new CustomError("null-value", "content and workspaceId parameter is required")

      const result = await Todo.create({
        WorkspaceId: workspaceId,
        content: content
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async update(req: Request, res: Response) {
    try{
      const { id, content } = req.body
      if(!id || !content) throw new CustomError("null-value", "id and content parameter is required")

      const result = await Todo.update({
        content: content,
      }, {
        where: {
          id: id
        }
      });
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async destroy(req: Request, res: Response) {
    try{
      const { id } = req.body
      if(!id) throw new CustomError("null-value", "id parameter is required")

      const result = await Todo.update({
        deleted: true,
      }, {
        where: {
          id: id
        }
      });
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

}

module.exports = TodoListener