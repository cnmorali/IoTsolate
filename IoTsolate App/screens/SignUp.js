import React, {useState} from 'react';
import { Text, StyleSheet, Image, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import BackIcon from 'react-native-vector-icons/Feather';
import { app } from '../Firebase/firebase';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import FormError from '../components/FormError';
import FormSuccess from '../components/FormSuccess';

const SignUp = ({ navigation }) =>{
    const auth = getAuth(app);

    const [fullName,setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [email,setEmail] = useState('');
    const [mobile,setMobile] = useState();
    const [password,setPassword] = useState();
    const [confirmPassword,setConfirmPassword] = useState();
    const [displayFormErr, setDisplayFormErr] = useState(false);

    function fullNameChange(value){
        setFullName(value);
    }
    function emailChange(value){
        setEmail(value);
    }
    function mobileChange(value){
        setMobile(value);
    }
    function passwordChange(value){
        setPassword(value);
    }
    function confirmPasswordChange(value){
        setConfirmPassword(value);
    }

    function createUser() {
        setIsLoading(true);
        createUserWithEmailAndPassword(auth, email, password)
          .then((userCredential)=>{
            // Signed up 
            const user = userCredential.user;
            setIsLoading(false);
            setSuccessMessage("Your account has been created.");
          })
          .catch((error)=>{
            setIsLoading(false);
            setErrorMessage(error.message);
            setDisplayFormErr(true);
          });
    }

    const validateForm =()=>{
        var form_inputs = [fullName,email,mobile,password,confirmPassword];
        var passwords_match = password == confirmPassword;

        if(form_inputs.includes('') || form_inputs.includes(undefined)){
            setErrorMessage("Please fill in all fields.");
            return setDisplayFormErr(true);
        }
        
        if(!passwords_match){
            setErrorMessage("Passwords do not match.");
            return setDisplayFormErr(true);
        }

        if(passwords_match) createUser();
    }

    function navigate(){
        navigation.navigate('signIn');
        //console.log(firebase);
    }
    return(
        <View style={styles.mainView}>
            <View style={styles.TopView}>

                <Image style={styles.ImageStyle} source={require('../assets/images/logo.png')}/>

            </View>

            <ScrollView style={styles.BottomView}>
                <BackIcon onPress={navigate} style={styles.Icon} name="chevron-left" size={45} color={"#fff"}/>
                <Text style={styles.Heading}>
                    Create Account
                </Text>

                <View style={styles.FormView}>
                    <TextInput onChangeText={fullNameChange} value={fullName} placeholder={"Full Name*"} placeholderTextColor='white' style={styles.TextInput}/>
                   
                    <TextInput onChangeText={emailChange} value={email} placeholder={"Email address*"} placeholderTextColor='white' style={styles.TextInput}/>
                   
                    <TextInput onChangeText={mobileChange} value={mobile} placeholder={"Mobile*"} placeholderTextColor='white' style={styles.TextInput}/>
                    
                    <TextInput onChangeText={passwordChange} value={password} placeholder={"Password*"} secureTextEntry={true} placeholderTextColor='white' style={styles.TextInput}/>
                   
                    <TextInput onChangeText={confirmPasswordChange} value={confirmPassword} placeholder={"Confirm Password*"} secureTextEntry={true} placeholderTextColor='white' style={styles.TextInput}/>
                    
                    <TouchableOpacity onPress={validateForm} style={styles.Button}>
                        <Text style={styles.ButtonText}>Sign Up</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
            {displayFormErr == true?
                <FormError hideErrOverlay={setDisplayFormErr} error={errorMessage}/>
                :
                null
            }

            {isLoading == true?
                <FormSuccess/>
                :
                successMessage=="Your account has been created."?
                <FormSuccess hideSuccessOverlay={setSuccessMessage} successMessage={successMessage}/>
                :
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
        height:'20%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    BottomView:{
        width:'100%',
        height:'80%',
        backgroundColor:'#3c456c',
        borderTopLeftRadius:'30%',
        borderTopRightRadius:'30%'
    },
    ImageStyle:{
        width:'90%',
        resizeMode:'contain'
    },
    Heading:{
        color:'#fff',
        fontSize:36,
        fontWeight:'bold',
        marginLeft:30,
        marginTop:10
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
        color:'gray',
    },
    TextButton:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:20
    },
    Icon:{
        marginLeft:10,
        marginTop:20,
    }

  })

export default SignUp;