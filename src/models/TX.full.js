import mongoose from '../mongoose'

const TXSchema = new mongoose.Schema({
    hash: { type: String, unique: true, index: true, required: true},
    timestamp: { type: Number, default: 0},
    transaction: {type: mongoose.Schema.Types.Mixed, default: null},
    receipt: {type: mongoose.Schema.Types.Mixed, default: null},
})

export default mongoose.model('TX', TXSchema, 'txs', true)