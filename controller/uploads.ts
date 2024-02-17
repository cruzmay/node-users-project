import { Request, Response } from "express"
import { uploadFile } from "../helpers";
import { UploadedFile } from "express-fileupload";

const uploadFiles = async (req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.upload) {
      res.status(400).send('No files were uploaded.');
      return;
    }
    try {
        const {upload} = req.files
        const resp = await uploadFile(upload as UploadedFile, "images")
        res.json({resp})
    } catch (error) {
        console.log(error)
    }

 
  
}
export {
    uploadFiles
}