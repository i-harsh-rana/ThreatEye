import mongoose, {Schema} from "mongoose";

const alertSchema = new Schema({
    srcIP: {
        type: String,
        required: true,
        match: /^(\d{1,3}\.){3}\d{1,3}$/, // Regex to ensure valid IP format
    },
    dstIP: {
        type: String,
        required: true,
        match: /^(\d{1,3}\.){3}\d{1,3}$/, // Regex to ensure valid IP format
    },
    severity: {
        type: String,
        enum: ['Low', 'Medium', 'High', 'Critical'], 
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    description: {
        type: String,
        required: true,
    }
}, {
    timestamps: true,  
});

alertSchema.index({ srcIP: 1, dstIP: 1 }, { unique: true }); 

export const Alert = mongoose.model('Alert', alertSchema);