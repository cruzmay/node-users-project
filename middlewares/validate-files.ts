import { NextFunction, Request, Response } from "express";

export const validateFiles = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.upload) {
        return res.status(400).json({ msg: "No files were uploaded." });
        
      }
     next()
}
