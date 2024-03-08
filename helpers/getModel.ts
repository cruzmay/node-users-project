import { ProductInterface, UserInterface, ValidCollections } from "../interfaces";
import { User } from "../models/User";
import { Product } from "../models/product";

export const getModel = (id: string, collection: string): Promise<UserInterface | ProductInterface> => {
return new Promise ((resolve, reject) => {
    let model
    switch (collection) {
      case ValidCollections.users:
       model = User.findById(id) as unknown as UserInterface
       if(!model){
          return reject(
            `No user found with id: ${id}`
          )
       }
       break;
      case ValidCollections.products:
        model = Product.findById(id) as unknown as ProductInterface
        if(!model){
          return reject(`No Product found with id: ${id}`
          )
       }
       break;
      default:
        return reject("error")
    }
    resolve(model)
}) 
}
