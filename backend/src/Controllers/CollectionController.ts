import { NextFunction, Request, Response } from "express";
import collections from "../Models/collection";

class CollectionController {
  async showCollections(req: Request, res: Response) {
    collections.find()
      .exec()
      .then(collection => {
        return res.status(200).json({
          collections: collection
        })
      })
      .catch(err => {
        return res.status(500).json({
          message: err.message,
          err
        })
      })
  }

  async createCollections(req: Request, res: Response) {
    const collection = req.body

    await collections.insertMany(collection)
      .then(_ => {
        return res.status(200).json({
          message: "Coleção adicionada com sucesso!"
        })
      })
      .catch(err => {
        return res.status(500).json({
          message: err.message,
          err
        })
      })
  }

  async deleteById(req: Request, res: Response) {
    const collection = req.body

    try {
      const dell = await collections.findByIdAndDelete(collection._id)

      return res.status(200).json({
        message: "Excluída com sucesso!"
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        err
      })
    }
  }

  async updateNameById(req: Request, res: Response) {
    const collection = req.body

    try {
      const up = await collections.findByIdAndUpdate(collection._id, { name: collection.name })

      return res.status(200).json({
        message: "Alterada com Sucesso!"
      })
    } catch (err) {
      return res.status(500).json({
        message: err.message,
        err
      })
    }
      
  }

  async updateACBI(req: Request, res: Response) { // update Amount Clothing By Id
    const collectionBody = req.body

    try {
      const up = await collections
        .findByIdAndUpdate(collectionBody.idCollection, { clothes: collectionBody.clothes})
      console.log(up)

      if(up){
        return res.status(200).json({
          message: "Alterada com Sucesso!"
        })
      }
      return res.status(200).json({
        message: "Coleção nula"
      })

    }catch (err) {
      return res.status(500).json({
        message: err.message,
        err
      })
    }
  }

  async updateClothes(req, res: Response) {

    try {
      const {
        idCollection,
        clothing
      } = JSON.parse(req.body.body)

      const { originalname, size, key, location = "" } = req.file

      const image = {
        name: originalname,
        size,
        key,
        url: location || '',
      }
      clothing.image.push(image)
      console.log(req.file)
      return res.status(200).json({
        clothing,
        idCollection
      })

    } catch (error) {
      return res.status(200).json({
        message: error.message,
        error
      })
      
    }
      

  }

}

export { CollectionController }