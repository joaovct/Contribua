const multer = require("multer")
const path = require("path")
const crypto = require("crypto")

module.exports = {
    user() {
        return {
            dest: path.resolve(__dirname, "..", "public", "temp", "uploads", "profile"),
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.resolve(__dirname, "..", "public", "temp", "uploads", "profile"))
                },
                filename: (req, file, cb) => {
                    // crypto.randomBytes(16, (err, hash) => {
                    //     if(err) cb(err)

                    //     const fileName = `${hash.toString('hex')}-${file.originalname}`
                    //     cb(null, fileName)
                    // })
                    const ex = file.originalname.split(".")
                    let fileName
                    if(req.session.ngo){
                        fileName = req.session.ngo.userName+"."+ex[1]
                    }else{
                        fileName = req.session.user.userName+"."+ex[1]
                    }
                    cb(null, fileName)
                }
            }),
            // limits: {
            //     fileSize: 5*1024*1024
            // },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/pjpeg',
                    'image/png'
                ]

                if(allowedMimes.includes(file.mimetype)){
                    cb(null, true)
                }else{
                    cb(null, false)
                }
            }
        }
    },
    action(){
        return {
            dest: path.resolve(__dirname, "..", "public", "temp", "uploads", "action"),
            storage: multer.diskStorage({
                destination: (req, file, cb) => {
                    cb(null, path.resolve(__dirname, "..", "public", "temp", "uploads", "action"))
                },
                filename: (req, file, cb) => {
                    crypto.randomBytes(16, (err, hash) => {
                        if(err) cb(err)

                        const fileName = `${hash.toString('hex')}-${file.originalname}`
                        cb(null, fileName)
                    })
                }
            }),
            // limits: {
            //     fileSize: 5*1024*1024
            // },
            fileFilter: (req, file, cb) => {
                const allowedMimes = [
                    'image/jpeg',
                    'image/pjpeg',
                    'image/png'
                ]

                if(allowedMimes.includes(file.mimetype)){
                    cb(null, true)
                }else{
                    cb(null, false)
                }
            }
        } 
    }
}