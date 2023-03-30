import React from "react";
import { Image,StyleSheet } from "react-native";
import Onboarding from 'react-native-onboarding-swiper';
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useNavigation } from "@react-navigation/native";

const OnboardingScreen = ()=>{
    const navigation =useNavigation();
    
    const [fontsloaded]=useFonts({
        'Montaga': require('../assets/fonts/Montaga-Regular.ttf'),
    })
        if (!fontsloaded){
            return <AppLoading/>
        }
   
    
    return (
       <Onboarding 
            onSkip={()=> navigation.replace('SignUp')}
            onDone={()=> navigation.replace('SignUp')}

            pages={[
                {
                    backgroundColor:'#ffff',
                    image: <Image source={require('../assets/images/splash.png')}/>,
                    title:'Select Location',
                    subtitle:'Enable your location and request a ride from anywhere in the world. Its easy with just a simple tap and few inputs.'

                },
                {
                    backgroundColor:'#ffff',
                    image: <Image source={require('../assets/images/carioo.png')} style = {styles.image_one}/>,
                    title: 'Get a Ride',
                    subtitle: 'Our expert drivers will drive you safely to your destination.Following the travel guide and regulations.',
                },
                {
                    backgroundColor:'#ffff',
                    image: <Image source={require('../assets/images/hands.png')} style = {styles.image_one}/>,
                    title: 'Rate our app',
                    subtitle: "Rating your experience helps us in improve the service given to you. Rate us and ride again.",
                }
            ]}
      />
    )
}
const styles = StyleSheet.create({
    image_one:{
       width:299,
       height:251 
    },
    pages:{
        fontFamily:'Montaga'
    }
   
})
export default OnboardingScreen;