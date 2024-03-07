import { randomUUID } from "crypto";
import { UploadedFile } from "express-fileupload";
import path from "path";

const defaultAllowedExt = ["jpg", "jpeg", "png"]

const uploadFile = (upload: UploadedFile, folder: string = "", allowedExtensions = defaultAllowedExt) => {
  return new Promise((resolve, reject) => {
    console.log(upload);

    const separatedExt = upload.name.split(".");
    const ext = separatedExt?.[separatedExt?.length - 1];
    const tempName = randomUUID() + "." + ext;
    console.log(ext, !allowedExtensions.includes(ext))

    if (!allowedExtensions.includes(ext)) {
      return reject(
        `${ext} extension name not allowed, should be: ${allowedExtensions}`
      );
    }
    const uploadPath = path.join(__dirname, "../uploads/", folder, tempName);

    upload.mv(uploadPath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(uploadPath);
    });
  });
};

export { uploadFile };
