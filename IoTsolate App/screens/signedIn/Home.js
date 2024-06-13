import React, { useState, useEffect } from 'react';
import { Text, View, ScrollView, TouchableOpacity, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import { getDatabase, ref, onValue, off } from 'firebase/database';
import Icon from 'react-native-vector-icons/Feather';
import Feather from '@expo/vector-icons/Feather';

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const db = getDatabase();

const Home = () => {
    const [vlanData, setVlanData] = useState([]);
    const [collapsedSections, setCollapsedSections] = useState([]);

    useEffect(() => {
        const segments = ['br-lan', 'br-vlan10', 'br-vlan20', 'br-vlan30'];
        const fetchPromises = segments.map(segment => {
            const segmentRef = ref(db, segment);
            return new Promise((resolve, reject) => {
                onValue(segmentRef, (snapshot) => {
                    const data = snapshot.val() || {};
                    if (data.Message === "no devices") {
                        resolve({ title: segment.replace('br-', ''), data: null });
                    } else {
                        const devicesArray = Object.entries(data).map(([deviceId, deviceData]) => ({
                            id: deviceId,
                            ...deviceData,
                        }));
                        let title = segment.replace('br-', '');
                        if (title === 'lan') {
                            title = 'Main Network';
                        } else if (title.startsWith('vlan')) {
                            title = 'VLAN ' + title.substring(4);
                        }
                        resolve({ title, data: devicesArray });
                    }
                }, reject, { onlyOnce: true });
            });
        });
    
        Promise.all(fetchPromises)
            .then(results => {
                setVlanData(results);
                setCollapsedSections(Array(results.length).fill(false));
            })
            .catch(error => console.error('Error fetching data for VLANs:', error));
    }, []);
    

    const toggleCollapse = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const updatedCollapsedSections = [...collapsedSections];
        updatedCollapsedSections[index] = !updatedCollapsedSections[index];
        setCollapsedSections(updatedCollapsedSections);
    };

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>{item.id}</Text>
            <Text style={styles.itemInfo}>IP Address: {item['IP Address']}</Text>
            <Text style={styles.itemInfo}>MAC Address: {item['MAC Address']}</Text>
        </View>
    );

    return (
        <View style={styles.mainView}>
            <View style={styles.TopView}>
                <Text style={styles.Heading}>Devices</Text>
            </View>
            <ScrollView style={styles.BottomView}>
                {vlanData.map((section, index) => (
                    <View key={index}>
                        <TouchableOpacity onPress={() => toggleCollapse(index)} style={styles.header} activeOpacity={1}>
                            <Text style={styles.sectionHeader}>{section.title}</Text>
                            <Icon name={collapsedSections[index] ? "chevron-down" : "chevron-up"} size={24}  color={"#fff"} />
                        </TouchableOpacity>
                        {!collapsedSections[index] && section.data ? (
                            section.data.map((item, itemIndex) => (
                                <View key={itemIndex}>
                                    {renderItem({ item })}
                                </View>
                            ))
                        ) : (
                            !collapsedSections[index] && <Text style={styles.noDevicesText}>No devices are currently connected to this segment.</Text>
                        )}
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
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
    },
    Heading: {
        fontSize: 32,
        marginTop: '20%',
        marginBottom: '10%',
        marginLeft: '10%',
        fontWeight: 'bold',
        color: '#3c456c'
    },
    sectionHeader: {
        fontSize: 24,
        fontWeight: 'bold',
        flex: 1,
        backgroundColor: '#3c456c',
        padding: 10,
        color:'white',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        color:'lavender',
        padding: 10,
    },
    item: {
        backgroundColor: '#fca33f',
        borderRadius: '20%',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        color:'lavender',
    },
    title: {
        fontSize: 20,
        color:'white'
    },
    itemInfo: {
        color: '#3c456c'
    },
    noDevicesText: {
        fontSize: 16,
        padding: 20,
        textAlign: 'center',
        color: 'lavender'
    },
});

export default Home;
