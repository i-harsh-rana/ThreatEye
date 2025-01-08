from scapy.all import sniff
import requests
import ipaddress

BACKEND_URL = "http://localhost:8000/api/traffic"

def validate_ip(ip):
    try:
        ipaddress.ip_address(ip)
        return True
    except ValueError:
        return False

def process_packet(packet):
    try:
        src_ip = packet[0][1].src if packet.haslayer("IP") or packet.haslayer("IPv6") else "Unknown"
        dst_ip = packet[0][1].dst if packet.haslayer("IP") or packet.haslayer("IPv6") else "Unknown"
        
        if not validate_ip(src_ip):
            src_ip = "Unknown"
        if not validate_ip(dst_ip):
            dst_ip = "Unknown"

        protocol = "Other"
        if packet.haslayer("TCP"):
            protocol = "TCP"
        elif packet.haslayer("UDP"):
            protocol = "UDP"

        packet_size = len(packet)

        traffic_log = {
            "srcIP": src_ip,
            "dstIP": dst_ip,
            "protocol": protocol,
            "packetSize": packet_size,
        }

        print(f"Captured Packet: {traffic_log}")

        response = requests.post(BACKEND_URL, json=traffic_log)
        if response.status_code == 201:
            print("Traffic log sent successfully.")
        else:
            print(f"Failed to send log: {response.text}")

    except Exception as e:
        print(f"Error processing packet: {e}")

def start_sniffing(interface):
    print(f"Sniffing on interface: {interface}")
    try:
        sniff(iface=interface, prn=process_packet, store=False)
    except Exception as e:
        print(f"Error starting sniffing: {e}")

if __name__ == "__main__":
    network_interface = "en0" 
    start_sniffing(network_interface)
