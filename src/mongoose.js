import mongoose from 'mongoose'
import {mongoCf} from '../config'

mongoose.Promise = global.Promise

const connectMongoDB = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await mongoose.connect(`mongodb://${mongoCf.user}:${mongoCf.password}@${mongoCf.url}:${mongoCf.port}/${mongoCf.db}`, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
            if (!result) {
                console.error(`MongoDB connecting: failed`)
                reject()
            }
            console.error(`MongoDB connecting: success`)
            resolve()
        } catch (err) {
            console.error(`MongoDB not found`)
            reject(err)
        }
    })
}

export { mongoose as default, connectMongoDB } 