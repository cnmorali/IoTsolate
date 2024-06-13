import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Overlay, Button } from '@rneui/themed';
import CheckCircle from 'react-native-vector-icons/Feather';

const FormSuccess = (props)=>{
    return(
        props.successMessage?

            <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideSuccessOverlay(false)}>
                <View style={styles.IconView}>

                    <CheckCircle name="check-circle" size={45} color={"slateblue"}/>

                    <Text style={styles.SuccessMessage}>
                        {props.successMessage}
                    </Text>

                    <TouchableOpacity style={styles.Button} onPress={()=>props.hideSuccessOverlay(false)}>
                        <Text style={styles.ButtonText}>Got it</Text>
                    </TouchableOpacity>

                </View>

            </Overlay>

        :

        <Overlay overlayStyle={styles.Overlay} isVisible={true} onBackdropPress={()=>props.hideSuccessOverlay(false)}>
            <ActivityIndicator size="large" color="##0000ff" />
        </Overlay>

        
    )
}

export default FormSuccess;

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
    SuccessMessage:{
        color:"#000",
        fontSize:20,
        marginTop:20
    },
    Button:{
        width:'80%',
        color:'darkorange',
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