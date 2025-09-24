import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const ScanSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'running', 'completed', 'failed'],        
        default: 'pending'
    },
    score: {
        type: Number,
        default: null
        },
    violationsCount: {
        type: Number,
        default: 0
    },

    startedAt: {
        type: Date
    },
    finishedAt: {
        type: Date
    },
    reportId: {
        type: Schema.Types.ObjectId,
        ref: 'Report'
    },
    meta: mongoose.Schema.Types.Mixed,


}, { timestamps: true });

export default mongoose.model('Scan', ScanSchema);