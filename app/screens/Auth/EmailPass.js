import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';

import auth from '@react-native-firebase/auth';

const EmailPass = ({route, navigation}) => {
  const {userName} = route.params;
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);

  const createAccount = () => {
    console.log(userName, email, pass);
    auth()
      .createUserWithEmailAndPassword(email, pass)
      .then(credential => {
        console.log(credential);
      })
      .catch(err => console.error(err));
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: 'white',
      }}>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <View style={{flex: 1, overflow: 'hidden'}}>
        <Image
          style={{width: '100%'}}
          source={require('../../assets/asset_adventure.png')}
          resizeMode="contain"
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          borderBottomWidth: 1,
          padding: 10,
        }}>
        <Text style={{textAlign: 'center'}}>To Own </Text>
        <Text style={{color: 'green', textDecorationLine: 'underline'}}>
          "{userName}"
        </Text>
        <Text> Please</Text>
      </View>
      <TextInput
        placeholder="Enter Email"
        textContentType="emailAddress"
        keyboardType="email-address"
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="Create Password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={text => setPass(text)}
      />
      <Button title="Create Account" onPress={createAccount} />
    </View>
  );
};

export default EmailPass;
