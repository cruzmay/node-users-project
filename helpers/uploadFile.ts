import { randomUUID } from "crypto";
import { Request } from "express";
import { FileArray, UploadedFile } from "express-fileupload";
import path from "path";

enum AllowedExtensions {
    jpg = "jpg",
    jpeg = "jpeg",
    png = "png"
}

const uploadFile = (upload: UploadedFile,  folder: string = "",  ) => {
    
  return new Promise((reject, resolve) => {

     console.log(upload)

    const separatedExt = upload.name.split(".")
    const ext =  separatedExt?.[separatedExt?.length - 1]
    console.log({separatedExt, ext})
    const tempName = randomUUID() + "." + ext

    if(ext) {
        if(!Object.values(AllowedExtensions).includes(ext as AllowedExtensions)) {
            return reject({ msg: `${ext} extension name not allowed, should be: ${Object.values(AllowedExtensions).join(",")}`})
        }
    }
    const uploadPath = path.join(__dirname, '../uploads/', folder, tempName);

    upload.mv(uploadPath, (err) => {
      if (err) {
        return reject({msg: err});
      }
  
      return resolve({msg: 'File uploaded to ' + uploadPath});
    });
  })
}

export {
    uploadFile
}