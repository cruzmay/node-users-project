import { sign } from "jsonwebtoken"

export const generateJWT = (uid: string) => {
    return new Promise(( res, rej) => {
        const payload = {uid}
        if(process.env.SECRET) {
            sign(payload, process.env.SECRET, {
                expiresIn: "4h"
            }, (error, token) => {
                if(error) {
                    console.log(error)
                    rej("couldn't generate the Token")
                } else {
                    res(token)
                }
            })
        }
    })
}