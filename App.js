import React from 'react';
import { StyleSheet } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './components/SplashScreen';
import Home from './components/Home';
import OnboardingScreen from './components/OnboardingScreen';
import SignUp from './components/SignUp';
import UserRegistration from './components/UserRegistration';
import UserLogin from './components/UserLogin';
import CompleteSetup from './components/CompleteSetup';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
   <NavigationContainer>
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name='SplashScreen' component = {SplashScreen}/>
      <Stack.Screen name='Home' component = {Home}/>
      <Stack.Screen name='OnboardingScreen' component = {OnboardingScreen}/>
      <Stack.Screen name='SignUp' component = {SignUp}/>
      <Stack.Screen name='UserRegistration' component = {UserRegistration}/>
      <Stack.Screen name='UserLogin' component = {UserLogin}/>
      <Stack.Screen name='CompleteSetup' component = {CompleteSetup}/>






      </Stack.Navigator>
   </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
