import React, {useState,useEffect} from "react";
import { StyleSheet,View,TextInput,Image,TouchableOpacity,Text} from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {SocialIcon} from '@rneui/themed';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleAuthenticator } from 'expo-google-app-auth';
const UserRegistration = ()=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    const [hidePassword,setHidePassword] = useState(false);

    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);

    
    const [nameError,setNameError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [confirmPasswordError,setConfirmPasswordError] = useState('');
   

    async function signInWithGoogleAsync() {
      try {
        const result = await GoogleAuthenticator.signInAsync({
          // The Google OAuth client ID for your app
          clientId: '395230206163-a46pjv1aep90jqh1ege2tgf5inl5fsed.apps.googleusercontent.com',
          // The scopes to request from the user
          scopes: ['profile', 'email'],
        });
    
        if (result.type === 'success') {
          // User successfully authenticated with Google
          // TODO: Handle the authentication result
        } else {
          // User cancelled the authentication request
          // TODO: Handle the cancellation
        }
      } catch (e) {
        // An error occurred during the authentication process
        // TODO: Handle the error
      }
    }

    const storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
        console.log('Data stored successfully');
      } catch (error) {
        console.log('Error storing data:', error);
      }
    }

    const handleSubmit = () => {
      // submit the form data to your server or perform any other necessary action
      console.log(name, email, password, confirmPassword);
    
      // store the form data in local storage
      storeData('name', name);
      storeData('email', email);
      storeData('password', password);
      storeData('confirmPassword', confirmPassword);

      navigation.navigate('CompleteSetup')

    }


    const validate = () =>{

        if(!email.includes("@")){
            setEmailError('Invalid Email');
        }
        else if (name.length === 0){
            setNameError('Full Name is Required')

        }
        else if (password.length <8){
            setPasswordError('Password must be atleast 8 characters')

        }
        else if (password.length === 0){
            setPasswordError('Password is required')

        }
        else if (password.indexOf(' ') >=0 ){
            setPasswordError('Password cannot contain spaces')

        }
        else if (confirmPassword !== password){
            setConfirmPasswordError('Passwords do not match')

        }
        else if (email.length === 0){
            setEmailError('Email is required')

        }
        else if (email.indexOf(' ') >=0 ){
            setEmailError('Email cannot contain spaces')

        }
        else{
            setEmailError('')
            setPasswordError('')
            setConfirmPasswordError('')
            setNameError('')
        }

    }
    const navigation =useNavigation();
    const [fontsloaded]=useFonts({
        'Montaga': require('../assets/fonts/Montaga-Regular.ttf'),
    })
        if (!fontsloaded){
            return <AppLoading/>
        };


        const togglePasswordVisibility = () => {
            setHidePassword(!hidePassword);
          };


          const handleNameFocus = () => {
            setIsNameFocused(true);
          };
        
          const handleNameBlur = () => {
            setIsNameFocused(false);
          };
        
          const handleEmailFocus = () => {
            setIsEmailFocused(true);
          };
        
          const handleEmailBlur = () => {
            setIsEmailFocused(false);
          };
        
          const handlePasswordFocus = () => {
            setIsPasswordFocused(true);
          };
        
          const handlePasswordBlur = () => {
            setIsPasswordFocused(false);
          };
          const handleConfirmPasswordFocus = () => {
            setIsConfirmPasswordFocused(true);
          };
        
          const handleConfirmPasswordBlur = () => {
            setIsConfirmPasswordFocused(false);
          };
        
    return(
    <View style ={styles.input} >
        <Text style = {styles.text}> Create Account</Text>
        <Text style = {styles.lineStyle}></Text>
            <TextInput
             style = {[styles.textInput,isNameFocused && styles.inputFocused] }  
             placeholder="Enter Full Name" 
             value={name}
             onChangeText={(text) =>{
              setName(text);
              storeData('name', text);

             }
             
            }
            onFocus={handleNameFocus}
            onBlur={handleNameBlur}
            >
             </TextInput>
             <Text style = {styles.error}>{nameError}</Text>

            <TextInput 
            style = {[styles.textInput_a,isEmailFocused && styles.inputFocused] } 
            onChangeText={(text) =>{
              setEmail(text);
              storeData('email', text);

            }
            }
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            value={email}
            autoCapitalize='none'
            placeholder="Enter Email" 
            >
            </TextInput>
            <Text style = {styles.error}>{emailError}</Text>


            <TextInput 
            style = {[styles.textInput_c,isPasswordFocused && styles.inputFocused]}             
            placeholder="Enter password" 
            secureTextEntry = {!hidePassword}
            onChangeText={(text) => {
              setPassword(text);
              storeData('password', text);
            }
            }
            value={password}
            onFocus={handlePasswordFocus}
            onBlur={handlePasswordBlur}
            >
            </TextInput>
            <View style = {styles.icon}>
            <Icon 
            onPress={togglePasswordVisibility}
            name={hidePassword ? 'eye' : 'eye-slash'}
            size={15} 
            color='grey'/>

            </View>

            <Text style = {styles.error}>{passwordError}</Text>

       <TextInput 
            style = {[styles.textInput_c,isConfirmPasswordFocused && styles.inputFocused]}  
            placeholder="Confirm password" 
            secureTextEntry = {true} 
            onChangeText={(text )=> {
              setConfirmPassword(text)
              storeData('confirmPassword', text);
            }
             
            }
            onFocus={handleConfirmPasswordFocus}
            onBlur={handleConfirmPasswordBlur}
            value={confirmPassword}
            >

             </TextInput>   
             <Text style = {styles.error}>{confirmPasswordError}</Text> 
            <TouchableOpacity style = {styles.button} onPress={() => {
              validate()
              handleSubmit()

            }}>
             <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style = {styles.text_3}>Or</Text>
           
            <SocialIcon
           
                  style = {styles.socialIcon}
                  onPress={signInWithGoogleAsync}
                  type="google"
                  iconColor="white"
                  backgroundColor ='red'
    
                  //Type of Social Icon
                 
                />
          
                <TouchableOpacity onPress={() => {
                navigation.navigate('UserLogin')
                
                ;
             }}>
                <Text style = {styles.text_4}> Have an Account ? Sign in</Text>

                </TouchableOpacity>
        </View>
      
    )
}; 

const styles = StyleSheet.create({
        text:{
        fontFamily:'Montaga',
        fontSize:26,
        marginVertical:18,
        },

        lineStyle:{
        marginTop:-34,
        borderBottomWidth:1,
        marginRight:98,
        marginLeft:-18
        },

        input:{
        marginTop:32,
        marginVertical:135,    
        marginLeft:92,
       
        },

        textInput:{
            marginVertical:25,
            fontFamily:'Montaga',
            paddingTop:15

        
            },
        textInput_a:{
        marginVertical:5,
        fontFamily:'Montaga',
        paddingTop:10

       

        },
        textInput_b:{
            marginVertical:25,
            fontFamily:'Montaga',

            

    
            },
            textInput_c:{
                marginVertical:25,
                fontFamily:'Montaga',
                paddingTop:20
        
                },
              
        image_one:{
            width:299,
            height:251,
            marginLeft:-53
         },
         buttonText:{
            fontSize:20,
            fontFamily:'Montaga',
            color:'white'
        },
        button: {
            alignItems:'center',
            backgroundColor:'#2596be',
            paddingVertical: 12,
            paddingHorizontal: 22,
            marginLeft:-12,
            marginRight:85,
            marginTop:8,
            borderRadius:92,
            // background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          },
          text_3:{
            textAlign:'center',
            marginLeft:-96,
            marginTop:15,
            fontFamily:'Montaga',
            fontSize:18
          },
          socialIcon:{
            marginLeft:84,
            marginVertical:15,
            width:43,
            height:43
          },
          text_4:{
            marginVertical:11,
            fontFamily:'Montaga',
            marginLeft:4,
            fontSize:18
          },
          error:{
            color:'red',
            fontFamily:'Montaga'
          },
          icon:{
            paddingLeft:155,
            marginTop:-57 
          },
          inputFocused: {
            borderBottomWidth: 1,
            borderBottomColor: '#2596be',
            width:205,
            
          },
         


        
})

export default UserRegistration;