import React, {useState} from "react";
import { StyleSheet,View,TextInput,Image,TouchableOpacity,Text} from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import {SocialIcon} from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserRegistration = ()=>{
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmPassword,setConfirmPassword] = useState('');
    
    const [nameError,setNameError] = useState('');
    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');
    const [confirmPasswordError,setConfirmPasswordError] = useState('');


    const handleSubmit = async ()=>{
        const data = {name:name,email:email,password:password}
        try {
            await AsyncStorage.setItem("data", JSON.stringify(data));
            navigation.navigate('CompleteSetup');

          } catch (error) {
            console.log(error);
          }
    }


    const validate = (handleSubmit) =>{

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
        handleSubmit()

    }
    const navigation =useNavigation();
    const [fontsloaded]=useFonts({
        'Montaga': require('../assets/fonts/Montaga-Regular.ttf'),
    })
        if (!fontsloaded){
            return <AppLoading/>
        };

    return(
    <View style ={styles.input} >
        <Text style = {styles.text}> Create Account</Text>
        <Text style = {styles.lineStyle}></Text>
            <TextInput
             style = {styles.textInput}  
             placeholder="Enter Full Name" 
             value={name}
             onChangeText={text => setName(text)}

            >

             </TextInput>
             <Text style = {styles.error}>{nameError}</Text>

            <TextInput 
            style = {styles.textInput} 
            onChangeText={text => setEmail(text)}
            value={email}
            autoCapitalize='none'
            placeholder="Enter Email" >
            </TextInput>
            <Text style = {styles.error}>{emailError}</Text>


            <TextInput 
            style = {styles.textInput} 
            placeholder="Enter password" 
            secureTextEntry = {true}
            onChangeText={text => setPassword(text)}
            value={password}
            >
            </TextInput>
            <Text style = {styles.error}>{passwordError}</Text>
       <TextInput 
            style = {styles.textInput}  
            placeholder="Confirm password" 
            secureTextEntry = {true} 
            onChangeText={text => setConfirmPassword(text)}
            value={confirmPassword}

            >

             </TextInput>   
             <Text style = {styles.error}>{confirmPasswordError}</Text> 


            <TouchableOpacity style = {styles.button} onPress={validate}>
             <Text style = {styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text style = {styles.text_3}>Or</Text>
            <SocialIcon
            
             style = {styles.socialIcon}
                  //Social Icon using @rneui/themed
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
        marginTop:42,
        marginVertical:135,    
        marginLeft:92,
        },
        
        textInput:{
        marginVertical:32,
        fontFamily:'Montaga'

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
        
})

export default UserRegistration;