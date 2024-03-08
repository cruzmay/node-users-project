import { UploadedFile } from "express-fileupload";
import { randomUUID } from "crypto";
import { Response } from "express";
import path from "path";

const allowedExtensionsList = ["jpg", "jpeg", "png"]

export const uploadFileV2 = (
  res: Response,
  upload: UploadedFile,
  allowedExtensions = allowedExtensionsList,
  folder?: string
) => {
  const name = upload.name;
  const separatedExt = name.split(".");
  const ext = separatedExt?.[separatedExt?.length - 1];
  const tempName = randomUUID() + "." + ext;

  if (!allowedExtensions.includes(ext)) {
    return res
      .status(401)
      .json({
        msg: `${ext} extension name not allowed, should be: ${allowedExtensions}`,
      });
  }
  const uploadPath = path.join(__dirname, "../uploads/", folder ?? "", tempName);

  upload.mv(uploadPath, (err: string) => {
    if (err) {
      res.status(500).json(err);
    }
    res.json({ msg: uploadPath });
  });
};
