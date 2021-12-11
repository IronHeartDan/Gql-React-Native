import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {View, Text, Image, TextInput, Button} from 'react-native';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';

const Authentication = ({client}) => {
  //   const sendOTP = async () => {
  //     if (!phone) {
  //       alert('Enter Valid Phone');
  //     } else {
  //       try {
  //         let code = await auth().signInWithPhoneNumber(`+91${phone}`);
  //         console.log(`Watch This ${JSON.stringify(code)}`);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //   };

  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <stack.Screen
        name="LogIn"
        component={LoginScreen}
        initialParams={{client: client}}
      />
      <stack.Screen
        name="Register"
        component={RegisterScreen}
        initialParams={{client: client}}
      />
    </stack.Navigator>
  );
};

export default Authentication;
