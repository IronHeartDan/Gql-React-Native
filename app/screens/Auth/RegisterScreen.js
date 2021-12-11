import React from 'react';
import {View, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserName from './UserName';
import {useSelector} from 'react-redux';
import {selectClient} from '../../redux/slicers/GqlClient';
import EmailPass from './EmailPass';
import Phone from './Phone';

const RegisterScreen = () => {
  const Stack = createNativeStackNavigator();
  const client = useSelector(selectClient);

  return (
    <Stack.Navigator
      screenOptions={{
        header: () => null,
      }}>
      <Stack.Screen name="UserName" component={UserName} />
      <Stack.Screen name="EmailPass" component={EmailPass} />
      <Stack.Screen name="Phone" component={Phone} />
    </Stack.Navigator>
  );
};

export default RegisterScreen;
