import mongoose from '../mongoose'

const AddressSchema = new mongoose.Schema({
    address: {
        type: String,
        unique: true
    },
    blance: Number,
    tokens: mongoose.Schema.Types.Mixed,
    transactions: mongoos.Schema.Types.Mixed
})

export default mongoose.model('Address', AddressSchema)