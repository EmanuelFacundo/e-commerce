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
        collections.find()
          .exec()
          .then(collection => {
            return res.status(200).json({
              collections: collection
            })
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
    const { _id } = req.params

    try {
      const collection = await collections.findById(_id)
      
      collection?.clothes.filter(clothing => { // Deleting all images
        clothing?.colors.filter(color => {
          color.images.filter(image => {
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
        }) 
      })

      await collections.remove({ _id })
        .then(_ => {
          collections.find()
            .exec()
            .then(collection => {
              return res.status(200).json({
                collections: collection
              })
            })
        })
        .catch(err => {
          return res.status(500).json({
            message: err.message,
            err
          })
        })

    } catch (err) {
      return res.status(500).json({
        message: err.message,
        err
      })
    }
  }

  async updateNameById(req: Request, res: Response) { // Update name Collection
    const { _id, name } = req.body

    try {

      await collections.updateOne({ _id }, { name })
        .then(() => {
          collections.find()
            .exec()
            .then(collections => {
              return res.status(200).json({
                collections,
                message: "Alterada com Sucesso!"
              })
            })
            .catch(err => {
              return res.status(500).json({
                message: err.message,
                err
              })
            })
        })
        .catch(err => {
          return res.status(500).json({
            message: err.message,
            err
          })
        })

    } catch (err) {
      return res.status(500).json({
        message: err.message,
        err
      })
    }

  }

}

export { CollectionController }