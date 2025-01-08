import mongoose, {Schema} from "mongoose";

const trafficLogSchema = new Schema({
    srcIP: {
        type: String,
        required: true,
        match: /^(\d{1,3}\.){3}\d{1,3}$/, 
    },
    dstIP: {
        type: String,
        required: true,
        match: /^(\d{1,3}\.){3}\d{1,3}$/, 
    },
    protocol: {
        type: String,
        required: true,
        enum: ['TCP', 'UDP', 'ICMP', 'HTTP', 'HTTPS', 'FTP'], // Limiting protocol values
    },
    packetSize: {
        type: Number,
        required: true,
        min: 0,  // Ensures packetSize cannot be negative
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    prediction: {
        type: String,
        default: 'Normal',
        enum: ['Normal', 'Suspicious', 'Malicious'], // Restrict prediction values
    }
}, {
    timestamps: true, 
});


export const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);