import { NextFunction, Request, Response } from "express";
import collections from "../Models/collection";

class CollectionController{
  async getCollections(req: Request, res: Response, next: NextFunction) {
    collections.find()
      .exec()
      .then(collection => {
        return res.status(200).json({
          collection
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

export { CollectionController }