import { ValidCollections } from "../interfaces"


export const validateCollection = (collection: string) => {
    const includes = Object.values(ValidCollections).includes(collection as unknown as ValidCollections)
    if(!includes) {
        throw new Error(`Collection ${collection} is not in the whitelist, ${Object.values(ValidCollections)}`)
    }
    return true
}
