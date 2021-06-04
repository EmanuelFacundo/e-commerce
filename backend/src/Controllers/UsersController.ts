import { NextFunction, Request, Response } from "express";
import users from "../Models/users";

class UsersController {
  async getUsers(req: Request, res: Response, next: NextFunction){
    users.find()
      .exec()
      .then(users => {
        return res.status(200).json({
          users: users,
          count: users.length
        })
      })
      .catch(err => {
        return res.status(500).json({
          message: err.message,
          err
        })
      })
  }

}


export { UsersController }