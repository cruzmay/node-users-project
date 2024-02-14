import { Request, Response } from "express"

const uploadFile = (req: Request, res: Response) => {

    console.log(req.files)

    res.json({ msg: "uploads"})
}
export {
    uploadFile
}