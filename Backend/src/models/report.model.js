import { Schema } from "mongoose";
import mongoose from "mongoose";

const ReportSchema = new Schema({
    scan: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Scan',
        required: true
    },
    url: {
        type: String,
    },
    jsonReportPath: {
        type: String,
    },
    htmlReportPath: {       
        type: String,

    },
    jsonReportFileName: {
        type: String,

    },
    htmlReportFileName: {
        type: String,
    },
    summary: {
        type: mongoose.Schema.Types.Mixed,
    }
}, { timestamps: true });

export default mongoose.model('Report', ReportSchema);
