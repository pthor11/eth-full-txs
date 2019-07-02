import { connectMongoDB } from './mongoose'
import web3 from './web3'
import TX from './models/TX.full'
import Checkpoint from './models/Checkpoint'

let checkpoint = null

const traceTX = async () => {

    checkpoint = checkpoint || (await Checkpoint.findOne({ mission: 'fulltx' }) || new Checkpoint({ mission: 'fulltx', at: 11000000 }))
    await checkpoint.save()

    const blockNumber = checkpoint.at === 0 ? 0 : checkpoint.at + 1

    const block = await web3.eth.getBlock(blockNumber)

    if (!block) {
        console.log(`A L L  D O N E`)
        process.exit(0)
    }

    for (const hash of block.transactions) {
        const transaction = await web3.eth.getTransaction(hash)
        const receipt = await web3.eth.getTransactionReceipt(hash)
        const tx = {
            timestamp: block.timestamp,
            hash,
            transaction,
            receipt
        }
        await TX.findOneAndUpdate({ hash: tx.hash }, tx, { upsert: true, setDefaultsOnInsert: true })
    }

    checkpoint.at += 1

    traceTX()
}


const start = async () => {
    await connectMongoDB()

    const numBlocks = await web3.eth.getBlockNumber()
    console.log({ numBlocks })


    traceTX()

    setInterval(() => {
        console.log(`> passed: ${(checkpoint.at * 100 / numBlocks).toFixed(4)} %`)

    }, 2000)
}


start()

