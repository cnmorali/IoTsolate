#!/bin/sh                                                                                                                                                                                                   

# Chloé Morali and Anagha Nair
# April 2024
# IoTsolate: Network Microsegmentation for Managing and Securing IoT Devices
# uploadConnectedDeevices.sh - Shell script file in our router
        # This file is the middleman between our router and our Firebase Firestore database.
        # In our database, where we are uploading the connected host information and displaying it on our mobile application for the user to view.    

# Get the current date and time in format we can read                                                                                                                                                         
current_datetime=$(date "+%m/%d/%Y %H:%M:%S")                                                                                                                                                               
                                                                                                                                                                                                            
# Initialize JSON strings for each interface                                                                                                                                                                
json_br_lan=""                                                                                                                                                                                              
json_br_vlan10=""                                                                                                                                                                                           
json_br_vlan20=""                                                                                                                                                                                           
json_br_vlan30=""                                                                                                                                                                                           
                                                                                                                                                                                                            
# Get the ARP table entries by reading /proc/net/arp file                                                                                                                                         
while read -r ip hwtype flags mac mask iface; do                                                                                                                                                            
# Need to skip the header line and the router's IP                                                                                                                                                                  
        if [ "$ip" = "IP" ] || [ "$ip" = "address" ] || [ "$ip" = "10.0.0.1" ]; then                                                                                                                        
                continue                                                                                                                                                                                    
        fi                                                                                                                                                                                                  
                                                                                                                                                                                                            
        # Replace dots in IP address with underscores to make compatible with Firebase                                                                                                                             
        safe_ip=$(echo "$ip" | sed 's/\./_/g')                                                                                                                                                              
                                                                                                                                                                                                            
        # Check if the flags indicate the host is currently on the network (looking for 0x2 flag)                                                                                                                                    
        if [ "$flags" = "0x2" ]; then                                                                                                                                                                       
                # Format device info as a JSON object                                                                                                                                                       
                device_json="\"Device $safe_ip\":{\"IP Address\":\"$ip\",\"MAC Address\":\"$mac\"}"                                                                                                         
                # Append the device info to the respective VLAN's JSON string while managing commas                                                                                                              
                if [ "$iface" = "br-lan" ]; then                                                                                                                                                            
                        json_br_lan="${json_br_lan:+$json_br_lan,}$device_json"                                                                                                                             
                elif [ "$iface" = "br-vlan10" ]; then                                                                                                                                                       
                        json_br_vlan10="${json_br_vlan10:+$json_br_vlan10,}$device_json"                                                                                                                    
                elif [ "$iface" = "br-vlan20" ]; then                                                                                                                                                       
                        json_br_vlan20="${json_br_vlan20:+$json_br_vlan20,}$device_json"                                                                                                                    
                elif [ "$iface" = "br-vlan30" ]; then                                                                                                                                                       
                        json_br_vlan30="${json_br_vlan30:+$json_br_vlan30,}$device_json"                                                                                                                    
                fi                                                                                                                                                                                          
        fi                                                                                                                                                                                                  
done < /proc/net/arp                                                                                                                                                                                        
                                                                                                                                                                                                            
# Check if strings are empty and append "no devices" message or finalize JSON                                                                                                                               
json_br_lan="{${json_br_lan:-\"Message\": \"no devices\"}}"                                                                                                                                                 
json_br_vlan10="{${json_br_vlan10:-\"Message\": \"no devices\"}}"                                                                                                                                           
json_br_vlan20="{${json_br_vlan20:-\"Message\": \"no devices\"}}"                                                                                                                                           
json_br_vlan30="{${json_br_vlan30:-\"Message\": \"no devices\"}}"                                                                                                                                           
                                                                                                                                                                                                            
# Construct the final JSON payload                                                                                                                                                                          
json_data="{\"Last Updated\":\"$current_datetime\",\"br-lan\":$json_br_lan,\"br-vlan10\":$json_br_vlan10,\"br-vlan20\":$json_br_vlan20,\"br-vlan30\":$json_br_vlan30}"                                      
                                                                                                                                                                                                            
# For debugging                                                                                                                                                                          
echo "$json_data"                                                                                                                                                                                           
                                                                                                                                                                                                            
# This is our Firebase URL and secret key (but we have hidden it)                                                                                                                                                                                                                                                                                             
firebase_url=secreturl                                                                                                                                 
firebase_secret=sorryitsasecret                                                                                                                                                  
                                                                                                                                                                                                            
# Send data to Firebase                                                                                                                                                                                     
curl -X PUT -H "Content-Type: application/json" -d "$json_data" "$firebase_url?auth=$firebase_secret"  