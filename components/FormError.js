import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Overlay, Button } from '@rneui/themed';
import ErrorCircle from 'react-native-vector-icons/Feather';

const FormError = (props)=>{
    return(
        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideErrOverlay(false)}>

        <View style={styles.IconView}>
            <ErrorCircle name="x-circle" size={45} color={"orange"}/>
            <Text style={styles.ErrorMessage}>{props.error} </Text>

            <TouchableOpacity style={styles.Button} onPress={()=>props.hideErrOverlay(false)}>
                <Text style={styles.ButtonText}>Got it</Text>
            </TouchableOpacity>
        </View>
        </Overlay>
    )
}

export default FormError;

const styles = StyleSheet.create({
    Overlay:{
        width:'90%',
        height:320,
        borderTopLeftRadius:'20%',
        borderTopRightRadius:'20%',
        borderBottomLeftRadius:'20%',
        borderBottomRightRadius:'20%'
    },
    IconView:{
        marginTop:20,
        alignItems:'center',
        justifyContent:'center',
    },
    ErrorMessage:{
        color:"#000",
        fontSize:20,
        marginTop:20
    },
    Button:{
        width:'80%',
        color:'darkslateblue',
        height:51,
        backgroundColor:'darkorange',
        borderRadius:'5%',
        marginTop:50,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    ButtonText:{
        color:"white",
        fontSize:15,
        textAlign:'center'
    }
})