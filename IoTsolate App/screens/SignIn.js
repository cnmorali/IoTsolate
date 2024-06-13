import React, {useState} from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity } from 'react-native';
import '../assets/images/logo.png'
import FormError from '../components/FormError';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import FormSuccess from '../components/FormSuccess';

const SignIn = ({ navigation }) =>{
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [displayFormErr, setDisplayFormErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    function navigate(){
        navigation.navigate('signUp');
    }

    const validateInput=()=>{
        var form_inputs = [email,password];

        if(form_inputs.includes('') || form_inputs.includes(undefined)){
            setErrorMessage("Please fill in all fields.");
            return setDisplayFormErr(true);
        }
        setIsLoading(true);
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in 
            setIsLoading(false);
            const user = userCredential.user;
        })
        .catch((error) => {
            setIsLoading(false);
            setErrorMessage(error.message);
            return setDisplayFormErr(true);
         });

    }

    return(
        <View style={styles.mainView}>
            <View style={styles.TopView}>

                <Image style={styles.ImageStyle} source={require('../assets/images/logo.png')}/>

            </View>

            <View style={styles.BottomView}>

                <Text style={styles.Heading}>
                    Welcome back
                </Text>
                <View style={styles.FormView}>

                    <TextInput value={email} onChangeText={(value)=>setEmail(value)} placeholder={"Email address*"} placeholderTextColor='white' style={styles.TextInput}/>
                    <TextInput value={password} onChangeText={(value)=>setPassword(value)} placeholder={"Password*"} secureTextEntry={true} placeholderTextColor='white' style={styles.TextInput}/>
                    
                    <TouchableOpacity style={styles.Button} onPress={validateInput}>
                        <Text style={styles.ButtonText}>Sign In</Text>
                    </TouchableOpacity>

                </View>
                <TouchableOpacity style={styles.TextButton} onPress={navigate}>
                    <Text style={styles.SignUpText}>Sign Up</Text>
                </TouchableOpacity>
            </View>

            {displayFormErr == true?
                <FormError hideErrOverlay={setDisplayFormErr} error={errorMessage}/>
                :
                null
            }

            {isLoading == true?
                <FormSuccess/>
                :
                //successMessage=="Your account has been found."?
                //<FormSuccess hideSuccessOverlay={setSuccessMessage} successMessage={successMessage}/>
                //:
                null
            }

        </View>
    )
}

const styles = StyleSheet.create({
    mainView:{
      marginTop:60,
      flex:1,
      flexDirection:'column',
      justifyContent:'center',
      alignItems:'center'
    },
    textStyle:{
      color:'#ff1493',
    },
    TopView:{
        width:'100%',
        height:'30%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    BottomView:{
        width:'100%',
        height:'70%',
        backgroundColor:'#3c456c',
        borderTopLeftRadius:'30%',
        borderTopRightRadius:'30%'
    },
    ImageStyle:{
        width:'100%',
        resizeMode:'contain'
    },
    Heading:{
        color:'#fff',
        fontSize:36,
        fontWeight:'bold',
        marginLeft:30,
        marginTop:60
    },
    FormView:{
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:40
    },
    TextInput:{
        width:'90%',
        borderWidth:1,
        borderColor:"#fff",
        height:52,
        borderRadius:10,
        paddingLeft:10,
        marginTop:20,
        color:'#fff'
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
    ButtonText:{
        fontWeight:'bold',
        fontSize:18,
        color:'#3c456c'
    },
    SignUpText:{
        color:'white',
    },
    TextButton:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    }

  })

export default SignIn;