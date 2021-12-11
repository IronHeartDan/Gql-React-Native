import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';

import auth from '@react-native-firebase/auth';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const logIn = () => {
    auth()
      .signInWithEmailAndPassword(email, pass)
      .then(user => {
        console.log(user);
      })
      .catch(error => console.error(error));
  };
  return (
    <View style={{height: '100%', backgroundColor: 'white'}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 50}}>Login</Text>
      </View>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{width: '100%', height: 250}}
          resizeMode="contain"
          source={require('../assets//asset_login.png')}
        />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: 10,
        }}>
        <TextInput
          style={{padding: 10, width: '100%', borderBottomWidth: 1}}
          placeholder="Email"
          textContentType="emailAddress"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={{padding: 10, width: '100%'}}
          placeholder="Password"
          secureTextEntry={true}
          textContentType="password"
          onChangeText={text => setPass(text)}
        />
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={{width: '100%'}}>
            <Button onPress={() => logIn()} title="Login" />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
