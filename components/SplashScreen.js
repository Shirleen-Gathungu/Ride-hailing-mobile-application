import React from "react";
import { Image,StyleSheet,View } from "react-native";

const SplashScreen = ({navigation})=>{
        setTimeout(()=> {
            navigation.replace('OnboardingScreen')

        },3000);
    return (
        <View style= {styles.container} >
        <Image source={require('../assets/images/Digiride2.png')} style ={styles.bgImage}  />

        </View>
    );
}

const styles = StyleSheet.create({
    container:{
    flex:1,
    backgroundColor:'#ef5a9b',
    justifyContent:'center'
    },
    bgImage:{
        marginLeft:-13
    }
})
export default SplashScreen;