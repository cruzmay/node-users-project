import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadFile } from "../helpers";
import path from 'path';
import { existsSync, unlinkSync } from 'fs';
import { getModel } from '../helpers/getModel';
import {v2 as cloudinary} from 'cloudinary';
          
cloudinary.config(process.env.CLOUDINARY_URL as string);


const uploadFiles = async (req: Request, res: Response) => {
  try {
    const resp =  await uploadFile(req.files?.upload as UploadedFile, "img")
    res.json({msg: resp})
  } catch (error) {
    res.status(400).json({msg: error})
  }
};

const updateFileUpload = async (req: Request, res: Response) => {
  const { id, collection } = req.params
  try {
    const modelo = await getModel(id, collection)
    if(modelo.img) {
      const imgPath =  path.join(__dirname, '../uploads', collection, modelo.img)
      if(existsSync(imgPath)) {
        console.log(true)
        unlinkSync(imgPath)
      }
    }
    const img: string = await uploadFile(req.files?.upload as UploadedFile, collection) as string
    modelo.img = img
    // @ts-ignore
    await modelo.save()
    res.json(modelo)
  } catch (error) {
    res.status(500).json({msg: error})
  }
}
const updateFileUploadCloudinary = async (req: Request, res: Response) => {
  const { id, collection } = req.params
  try {
    const modelo = await getModel(id, collection)
    if(modelo.img) {
      const imgArr =  modelo.img.split("/")
      const [imageName] =  imgArr[imgArr.length - 1].split(".")
      cloudinary.uploader.destroy(imageName)
    }
    const { tempFilePath } = req.files?.upload as UploadedFile
    const resp = await cloudinary.uploader.upload(tempFilePath)
    modelo.img = resp.secure_url
    // @ts-ignore
    await modelo.save()
    res.json(modelo)
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

const getImgFile = async (req: Request, res: Response) => {
  const { id, collection } = req.params
  try {
    const modelo = await getModel(id, collection)
    const noImageFound = path.join(__dirname, "../assets/no-image.jpg")
    if(modelo.img) {
      console.log(modelo.img)
      const imgPath =  path.join(__dirname, '../uploads', collection, modelo.img)
      console.log(imgPath)
      if(existsSync(imgPath)) {
        return res.sendFile(imgPath)
      }
    }
    res.sendFile(noImageFound)
  } catch (error) {
    res.status(500).json({msg: error})
  }
}

export { uploadFiles, updateFileUpload, getImgFile, updateFileUploadCloudinary };
