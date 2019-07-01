import dotenv from 'dotenv'

dotenv.config()

const port = process.env.PORT || 4000

const mongoCf = {
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    url: process.env.MONGO_URL || 'localhost',
    port: process.env.MONGO_URL || '27017',
    db: process.env.MONGO_DB || 'kovan-blocks-raw'
}

const web3Cf = {
    url: process.env.WEB3_URL || 'http://192.168.1.250:8545'
}

export  {
    mongoCf,
    web3Cf
}