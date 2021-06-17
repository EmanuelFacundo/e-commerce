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
        clothing?.images.filter(image => {
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

  async updateClothing(req: Request, res: Response) { // update Clothing
    
    try {
      const { idCollection, clothing } = req.body

      const collection = await collections.findById(idCollection)
      const newClothes = collection.clothes.map(oldClothing => {
        if (oldClothing._id == clothing._id) {
          console.log(clothing.name)
          return clothing
        }

        return oldClothing
      })

      await collections.updateOne({ _id: idCollection }, { clothes: newClothes })
        .then(() => {
          collections.find()
            .exec()
            .then(collections => {
              return res.status(200).json({
                collections,
                message: "Alterada com sucesso!"
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

      collections.find()
        .exec()
        .then(collections => {
          return res.status(200).json({
            collections
          })
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
      const { idC, idc } = req.query // idC = (Id of collection) / idc =(Id of clothing)
      console.log(req.query)
      let collection = await collections.findById(idC)

      collection.clothes = collection.clothes.filter(clothing => {
        if (clothing._id == idc) {
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

      await collections.updateOne({ _id: idC }, { clothes: collection.clothes })
        .then(() => {
          collections.find()
            .exec()
            .then(collections => {
              return res.status(200).json({
                message: "Roupa removida com sucesso!",
                collections
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

    } catch (error) {
      return res.status(500).json({
        message: error.message
      })
    }
  }

}

export { CollectionController }