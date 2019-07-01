import mongoose from '../mongoose'

const TXSchema = new mongoose.Schema({
    hash: {type: String, unique: true, index: true},
    scanned: {type: Boolean, default: false},
    timestamp: Number, 
    transaction: mongoose.Schema.Types.Mixed,
    receipt: mongoose.Schema.Types.Mixed
})

export default mongoose.model('TX', TXSchema)