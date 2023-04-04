import React,{useState,useEffect} from "react";
import { StyleSheet,View,TextInput,Image,TouchableOpacity,Text} from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from "@react-navigation/native";
import Icon from 'react-native-vector-icons/FontAwesome';
import {SocialIcon} from '@rneui/themed';


const UserLogin = () =>{

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [emailError,setEmailError] = useState('');
    const [passwordError,setPasswordError] = useState('');

    const [hidePassword,setHidePassword] = useState(false);


    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);


    const validate = () =>{
        if(!email.includes("@")){
            setEmailError('Invalid Email');
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
        else{
            setEmailError('')
            setPasswordError('')
        }
    }


    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
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

    const navigation =useNavigation();
    const [fontsloaded]=useFonts({
        'Montaga': require('../assets/fonts/Montaga-Regular.ttf'),
    })
        if (!fontsloaded){
            return <AppLoading/>
        };




      
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return value;
        }
      } catch (error) {
        console.log('Error retrieving data:', error);
      }
    }


   useEffect(() => {

  getData('email').then((value) => {
    if (value) {
      setEmail(value);
    }
  });

  getData('password').then((value) => {
    if (value) {
      setPassword(value);
    }
  });
}, []);

    return(
       <View style = {styles.input}>
         <Text style = {styles.text}>Sign in to Account</Text>
        <Text style = {styles.lineStyle}></Text>
        <TextInput 
            style = {[styles.textInput,isEmailFocused && styles.inputFocused] } 
            onChangeText={text => setEmail(text)}
            onFocus={handleEmailFocus}
            onBlur={handleEmailBlur}
            value={email}
            autoCapitalize='none'
            placeholder="Enter Email" 
        
            
            >
            </TextInput>
            <Text style = {styles.error}>{emailError}</Text>

        
            <TextInput 
            style = {[styles.textInput,isPasswordFocused && styles.inputFocused]}             
            placeholder="Enter password" 
            secureTextEntry = {!hidePassword}
            onChangeText={text => setPassword(text)}
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

        <TouchableOpacity style = {styles.button} onPress={(validate)}>
             <Text style = {styles.buttonText}>Sign In </Text>
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
                navigation.navigate('UserRegistration');
             }}>
                <Text style = {styles.text_4}> Don't Have an Account ? Sign up</Text>

                </TouchableOpacity>

       </View>
    )
};
const styles = StyleSheet.create({
   

        input:{
        marginTop:52,
        marginVertical:135,    
        marginLeft:92,
        },
        
        text:{
        fontFamily:'Montaga',
        fontSize:26,
        marginVertical:18,
        },

        lineStyle:{
        marginTop:-34,
        borderBottomWidth:1,
        marginRight:72,
        marginLeft:-14
        },
        textInput:{
        marginVertical:22,
        paddingTop:10,
        fontFamily:'Montaga'
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
            marginTop:38,
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
            marginLeft:-18,
            fontSize:18
          },
          error:{
            color:'red',
            fontFamily:'Montaga'
          },
          icon:{
            paddingLeft:155,
            marginTop:-45 
          },
          inputFocused: {
            borderBottomWidth: 1,
            borderBottomColor: '#2596be',
            width:205,
            
          },

})
export default UserLogin;