import aws from 'aws-sdk'
import fs from 'fs'
import path from 'path'
import { Request, Response } from "express";
import collections from "../Models/collection";
import clothes from "../Models/clothing";

class ClothingController {

  async showClothes(req: Request, res: Response){
    try { 
      const clothe = await clothes.find()
        .exec()
        .then(clothing => {
          res.status(200).json(clothing)
        })
        .catch(err => {
          res.status(500).json({
            message: err.message,
            err
          })
        })
    } catch (err) {

    }
  }

  async addClothingInCollection(req, res: Response) {
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
        clothing.colors.filter(color => color.images.push(image))
      })

      const collection = await collections.findById(idCollection)
      console.log(collection)
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

  async updateClothingInCollection(req: Request, res: Response) { // update Clothing

    try {
      const { idCollection, clothing } = req.body

      const collection = await collections.findById(idCollection)
      const newClothes = collection.clothes.map(oldClothing => {
        if (oldClothing._id == clothing._id) {
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

  async deleteClothingInCollection(req: Request, res: Response) {

    try {
      const { idC, idc } = req.query // idC = (Id of collection) / idc =(Id of clothing)
      console.log(req.query)
      let collection = await collections.findById(idC)

      collection.clothes = collection.clothes.filter(clothing => {
        if (clothing._id == idc) {
          clothing.colors.filter(color => {
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

export { ClothingController }