import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { Request, Response } from "express";
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
      await collections.remove({ _id: collection._id })

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
      const up = await collections.updateOne({ _id: collection._id }, { name: collection.name })

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
        .updateOne({ _id: collectionBody.idCollection }, { clothes: collectionBody.clothes })

      if (up) {
        return res.status(200).json({
          message: "Alterada com Sucesso!"
        })
      }
      return res.status(200).json({
        message: "Coleção nula"
      })

    } catch (err) {
      return res.status(500).json({
        message: err.message,
        err
      })
    }
  }

  async addClothing(req, res: Response) {
    try {
      let {
        idCollection,
        clothing
      } = JSON.parse(req.body.body)

      req.files.map(file => {
        const image = {
          name: file.originalname,
          size: file.size,
          key: file.key ? file.key : file.filename,
          url: file.location || `${process.env.APP_URL}/files/${file.filename}`,
        }
        clothing.images.push(image)
      })

      const collection = await collections.findById(idCollection)
      collection.clothes.push(clothing)
      await collections.updateOne({ _id: idCollection }, { clothes: collection.clothes })

      return res.status(200).json({
        message: "Roupa adicionada com sucesso!"
      })

    } catch (error) {
      return res.status(500).json({
        message: error.message,
        error
      })
    }

  }

  async deleteClothing(req: Request, res: Response) {

    try {
      const { idClothing, idCollection } = req.body

      let collection = await collections.findById(idCollection)

      collection.clothes = collection.clothes.filter(clothing => {
        if (clothing._id == idClothing) {
          clothing.images.filter(image => {
            if (process.env.STORAGE_TYPE == "s3") {
              const s3 = new aws.S3()
              s3.deleteObject({
                Bucket: process.env.AWS_BUCKET,
                Key: image.key.toString()
              }).promise()
            } else {
              fs.unlink(
                path.resolve(__dirname, "..", "..", "tmp", "uploads", image.key.toString()),
                () => { }
              )
            }

          })


        } else {
          return clothing
        }
      })

      await collections.updateOne({ _id: idCollection }, { clothes: collection.clothes })

      return res.status(200).json({
        message: "Roupa removida com sucesso!"
      })
    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

}

export { CollectionController }