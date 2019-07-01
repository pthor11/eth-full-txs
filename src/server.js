import { connectMongoDB } from './mongoose'
import web3 from './web3'
import Block from './models/Block'
import TX from './models/TX'

import cluster from 'cluster'
import os from 'os'


const limit = 10000

const traceTX = async () => {
    const blocks = await Block.find({scanned: false}).sort({number: 1}).limit(limit)
    
    if (!blocks) {
        console.log(`blocks not found`)
        return true
    }
    console.log(`Tracing from block ${blocks[0].number}`)
    
    const txs = blocks.map(block => block.raw.transactions.map(transaction => {return {timestamp: block.raw.timestamp, hash: transaction}})).reduce((txs, arr) => [...txs, ...arr], [])

    console.log({txs: txs.length})
    
    const txBatch = new web3.eth.BatchRequest()
    const receiptBatch = new web3.eth.BatchRequest()

    txs.forEach(tx => {
        txBatch.add(web3.eth.getTransaction.request(tx.hash, () => {}))
        receiptBatch.add(web3.eth.getTransactionReceipt.request(tx.hash, () => {}))
    })
    
    const [txBatchResult, receiptBatchResult] = await Promise.all([txBatch.execute(), receiptBatch.execute()])
    // const txBatchResult = await txBatch.execute()
    // const receiptBatchResult = await receiptBatch.execute()

    console.log({txBatchResult: txBatchResult.response.length})
    console.log({receiptBatchResult: receiptBatchResult.response.length})

    txs.forEach((tx, i) => {
        tx.transaction = txBatchResult.response[i],
        tx.receipt = receiptBatchResult.response[i]
    })

    await TX.insertMany(txs)

    const updates = []
    
    blocks.map(block => {
        block.scanned = true
        updates.push(block.save())    
    })

    await Promise.all(updates)

    traceTX()
}


const start = async () => {
    await connectMongoDB()
    traceTX()
}


start()

