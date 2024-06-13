import React, {useState} from 'react';
import {Text, StyleSheet, ScrollView, View} from 'react-native';

const History=()=>{
    const logs = ["Tue May  7 08:45:01 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 08:49:11 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 08:49:51 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 08:50:00 2024 cron.err crond[1728]: USER root pid 4273 cmd /root/uploadConnectedDevices.sh",
    "Tue May  7 08:50:06 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 08:51:08 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 09:00:00 2024 cron.err crond[1728]: USER root pid 4332 cmd /root/uploadConnectedDevices.sh",
    "Tue May  7 09:00:00 2024 cron.err crond[1728]: USER root pid 4333 cmd /root/clearARPCache.sh",
    "Tue May  7 09:10:00 2024 cron.err crond[1728]: USER root pid 4392 cmd /root/uploadConnectedDevices.sh",
    "Tue May  7 09:11:53 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 09:15:00 2024 cron.err crond[1728]: USER root pid 4451 cmd /root/clearARPCache.sh",
    "Tue May  7 09:15:00 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 09:15:07 2024 daemon.warn odhcpd[1666]: No default route present, overriding ra_lifetime!",
    "Tue May  7 09:20:00 2024 cron.err crond[1728]: USER root pid 4452 cmd /root/uploadConnectedDevices.sh"
];

    return(
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                <Text style={styles.Heading}>History</Text>
            </View>
            <ScrollView style={styles.BottomView}>
            {logs.map((log, index) => (
                    <Text key={index} style={styles.logText}>{log}</Text>
                ))}
            </ScrollView>


        </View>
    )
}
export default History

const styles = StyleSheet.create({
    mainView:{
        flex:'1'

    },
    TopView:{
        width:'100%',
        height:'20%',
        display:'flex',
        
    },
    BottomView:{
        width:'100%',
        height:'80%',
        backgroundColor:'#3c456c',
        borderTopLeftRadius:'30%',
        borderTopRightRadius:'30%',
        paddingTop:20,
    },
    Heading:{
        fontSize:32,
        marginTop:'20%',
        marginLeft:'10%',
        fontWeight:'bold',
        color:'#3c456c'
    },
    logText:{
        color: '#fff',
        marginBottom: 10,
        marginLeft:10,
        marginRight:10
    }

})