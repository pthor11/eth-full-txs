import mongoose from '../mongoose'

const BlockSchema = new mongoose.Schema({
    number: {type: Number, unique: true, index: true},
    scanned: {type: Boolean, default: false},
    raw: mongoose.Schema.Types.Mixed
})

export default mongoose.model('Block', BlockSchema)