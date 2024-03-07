import { Request, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { uploadFileV2 } from "../helpers/uploadFileV2";


const uploadFiles = (req: Request, res: Response) => { 
  if (!req.files || Object.keys(req.files).length === 0 || !req.files.upload) {
    console.log(true);
    res.status(400).json({ msg: "No files were uploaded." });
    return;
  }
  uploadFileV2(res, req.files.upload as UploadedFile)
};
export { uploadFiles };
