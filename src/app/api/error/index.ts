import { Response } from "express";

class ErrorAPI{

  static responseError(res: Response, err: any){
    if(err.name === "null-value") res.status(401).json(ErrorAPI.toErrorResponse(err.name, err.message));
    if(err.name === "auth/error") res.status(403).end();
    if(err.name === "SequelizeForeignKeyConstraintError") res.status(500).json(ErrorAPI.toErrorResponse(err.name, err.message))
    res.status(500).json(err.stack)
  }
  
  static toErrorResponse(name: string, message: string){
    return { error: {code: name, message: message} }
  }
}
module.exports = ErrorAPI;