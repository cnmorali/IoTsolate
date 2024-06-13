import React, {useState, useEffect} from 'react';
import {Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { getAuth, signOut } from "firebase/auth";

const Profile=({navigation,route})=>{
    const [userDetails, setUserDetails] = useState({
        email: '',
        emailVerified: false,
    });

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user !== null) {
            // Set user details into state
            setUserDetails({
                email: user.email,
                emailVerified: user.emailVerified,
            });
        }
    }, []);
    // Added above

    const signedOut = ()=>{
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    }).catch((error) => {
    // An error happened.
    });
    }
    return(
        <View style={styles.regView}>
            <Text style={styles.Heading}>Profile</Text>

            <View style={styles.mainView}>
                <Text style={styles.textStyle}>Email: {userDetails.email}</Text>

                <TouchableOpacity style={styles.Button} onPress={signedOut}>
                <Text style={styles.ButtonText}>Sign out</Text> 
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default Profile

const styles = StyleSheet.create({
    mainView:{
      marginTop:60,
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    regView:{
        flex:'1'
    },
    textStyle:{
      color:'#6471a9',
    },
    TextButton:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    Button:{
        width:'90%',
        color:'#fff',
        height:52,
        backgroundColor:'#fff',
        borderRadius:'10%',
        marginTop:20,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'

    },
    Heading:{
        fontSize:32,
        marginTop:'20%',
        marginLeft:'10%',
        fontWeight:'bold',
        color:'#3c456c'
    },
    ButtonText:{
        fontWeight:'bold',
        fontSize:18,
        color:'#3c456c'
    },

  })