const TodoDetails = require('@sequelize/models').TodoDetails
const ErrorAPI = require('../../api/error')
const CustomError = require('../../entities/error')

import { Response, Request } from "express";

class TodoDetailsListener {

  static async getAllByTodoId(req: Request, res: Response) {
    try{
      const { todoId } = req.body
      if(!todoId) throw new CustomError("null-value", "todoId parameter is required")

      const result = await TodoDetails.findAll({
        where: {
          todoId: todoId,
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
      const { content, todoId } = req.body
      if(!content || !todoId) throw new CustomError("null-value", "content and todoId parameter is required")

      const result = await TodoDetails.create({
        todoId: todoId,
        content: content
      })
      return res.status(200).json(result)
    }catch(err){
      ErrorAPI.responseError(res, err)
    }
  }

  static async update(req: Request, res: Response) {
    try{
      const { id, content, isComplete } = req.body
      if(!id || !content) throw new CustomError("null-value", "id and content parameter is required")

      await TodoDetails.update({
        content: content,
        isComplete: (isComplete)
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

      await TodoDetails.update({
        deleted: true
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

module.exports = TodoDetailsListener