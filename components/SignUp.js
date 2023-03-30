import React from "react";
import { Image,StyleSheet,View,Text,TouchableOpacity } from "react-native";
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from "@react-navigation/native";

const SignUp = ()=>{
    const navigation =useNavigation();

    const [fontsloaded]=useFonts({
        'Montaga': require('../assets/fonts/Montaga-Regular.ttf'),
    })
        if (!fontsloaded){
            return <AppLoading/>
        };

    return(
        <View>
            <Image style={styles.image} source={require('../assets/images/start.png')}/>
            <Text style = {styles.text}>Move with Safety</Text>
            <TouchableOpacity style = {styles.button} onPress={() => {
                navigation.navigate('UserRegistration');
             }}>
             <Text style = {styles.buttonText}>Get Started</Text>
     
            </TouchableOpacity>
        </View>

    )
};

const styles = StyleSheet.create({
    image:{
       
        width:293,
        height:325,
        marginTop:155,
        marginLeft:35
    },
    text:{
        textAlign:'center',
        alignItems:'center',
        fontSize:36,
        marginVertical:53,
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
        marginTop:8,
        marginLeft:52,
        marginRight:52,
        borderRadius:92,
        // background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      }
})
export default SignUp;