const TodoDetails = require('@sequelize/models').TodoDetails
const ErrorAPI = require('../../api/error')
const CustomError = require('../../entities/error')

import { Response, Request } from "express";

class TodoDetailsListener {

  static async getAllByTodoId(req: Request, res: Response) {
    try{
      const { todoId } = req.params
      if(!todoId) throw new CustomError("null-value", "todoId parameter is required")

      const result = await TodoDetails.findAll({
        where: {
          TodoId: todoId,
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
      const result = await TodoDetails.findAll({
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

  static async create(req: Request, res: Response) {
    try{
      const { content, todoId } = req.body
      if(!content || !todoId) throw new CustomError("null-value", "content and todoId parameter is required")

      const result = await TodoDetails.create({
        TodoId: todoId,
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

      const result = await TodoDetails.update({
        content: content
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

  static async toggleComplete(req: Request, res: Response) {
    try{
      const { id, isCompleted } = req.body
      if(!id) throw new CustomError("null-value", "id and isCompleted parameter is required")
      const result = await TodoDetails.update({
        isCompleted: isCompleted
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

      const result = await TodoDetails.update({
        deleted: true
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

module.exports = TodoDetailsListener