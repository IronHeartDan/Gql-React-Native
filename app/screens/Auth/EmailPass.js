import {gql} from '@apollo/client';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Button, Image, StatusBar, Text, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import validator from 'validator';
import {selectClient} from '../../redux/slicers/GqlClient';

const EmailPass = ({route, navigation}) => {
  const client = useSelector(selectClient);
  const {userName} = route.params;
  const [email, setEmail] = useState(null);
  const [pass, setPass] = useState(null);
  const [errEmail, setErrEmail] = useState(true);
  const [errPass, setErrPass] = useState(true);

  const createAccount = async () => {
    try {
      // Create Firebase Auth Account
      let credentials = await auth().createUserWithEmailAndPassword(
        email,
        pass,
      );
      console.log(credentials);
      // Entery In DB

      try {
        let res = await client.mutate({
          mutation: gql`
          mutation  {
      insertUser(user: {
        _id:"${credentials.user.uid}"
        userName:"${userName}",
        userEmail:"${email}",
      }) {
        userEmail
        userName
      }
    }
          `,
        });

        console.log(res);
      } catch (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    }
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
        onChangeText={text => {
          if (validator.isEmail(text)) {
            setErrEmail(false);
            setEmail(text);
          } else {
            setErrEmail(true);
          }
        }}
        accessibilityLabel="TESt"
      />
      <TextInput
        placeholder="Create Password"
        textContentType="password"
        secureTextEntry={true}
        onChangeText={text => {
          if (validator.isStrongPassword(text)) {
            setErrPass(false);
            setPass(text);
          } else {
            setErrPass(true);
          }
        }}
      />
      <View style={{padding: 2}}>
        <Text style={{textAlign: 'center', color: 'red'}}>
          {errEmail ? 'Enter Valid Email' : ''}
        </Text>

        <Text style={{textAlign: 'center', color: 'red'}}>
          {errPass
            ? 'Password Should Contain A Uppcase , A Lowercase , A Digit And A Special Character'
            : ''}
        </Text>
      </View>
      <Button
        title="Create Account"
        onPress={createAccount}
        disabled={errEmail || errPass ? true : false}
      />
    </View>
  );
};

export default EmailPass;
