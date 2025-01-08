import mongoose, {Schema} from "mongoose";

const trafficLogSchema = new Schema({
    srcIP: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\1\.\1\.\1)$/i;
                const ipv6Regex = /^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/;
                return v === 'Unknown' || ipv4Regex.test(v) || ipv6Regex.test(v);
            },
            message: (props) => `${props.value} is not a valid IP address!`
        }
    },
    dstIP: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const ipv4Regex = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(\1\.\1\.\1)$/i;
                const ipv6Regex = /^([a-fA-F0-9:]+:+)+[a-fA-F0-9]+$/;
                return v === 'Unknown' || ipv4Regex.test(v) || ipv6Regex.test(v);
            },
            message: (props) => `${props.value} is not a valid IP address!`
        }
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
    prediction: {
        type: String,
        default: 'Normal',
        enum: ['Normal', 'Suspicious', 'Malicious'], // Restrict prediction values
    }
}, {
    timestamps: true, 
});


export const TrafficLog = mongoose.model('TrafficLog', trafficLogSchema);