import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import RegisterScreen from './Auth/RegisterScreen';
import LoginScreen from './LoginScreen';

const Authentication = () => {
  const stack = createNativeStackNavigator();

  return (
    <stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <stack.Screen name="LogIn" component={LoginScreen} />
      <stack.Screen name="Register" component={RegisterScreen} />
    </stack.Navigator>
  );
};

export default Authentication;
 