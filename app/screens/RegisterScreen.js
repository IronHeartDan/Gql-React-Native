import {gql} from '@apollo/client';
import auth from '@react-native-firebase/auth';
import React, {useState} from 'react';
import {Button, StyleSheet, TextInput, View} from 'react-native';

const RegisterScreen = ({route}) => {
  const [userName, setUserName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);

  const {client} = route.params;

  const registerUser = async () => {
    if (userName && email && phone) {
      console.log(userName, email, phone);

      try {
        let res = await client.mutate({
          mutation: gql`
            mutation  {
      insertUser(user: {
        userName:"${userName}",
        userEmail:"${email}",
        userPhone:"${phone}"
      }) {
        userEmail
        userName
      }
    }
      `,
        });

        if (res.data) {
          auth()
            .createUserWithEmailAndPassword(email, phone)
            .then(async credentials => {
              let phoneNumber = `+91${phone}`;
              console.log(phoneNumber);
              try {
                let code = await auth().verifyPhoneNumber(phoneNumber);
                console.log(code);
              } catch (error) {
                console.error(error);
              }
            })
            .catch(error => console.error(error));
        } else {
          alert('An Error Occured');
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      alert('Incorrect Input');
    }
  };

  return (
    <View style={{flex: 1, padding: 50, justifyContent: 'center'}}>
      <TextInput
        placeholder="Email"
        style={styles.input}
        onChangeText={text => setEmail(text)}
      />
      <TextInput
        placeholder="UserName"
        style={styles.input}
        onChangeText={text => setUserName(text)}
      />
      <TextInput
        placeholder="Phone"
        style={styles.input}
        onChangeText={text => setPhone(text)}
      />
      <View style={{marginTop: 10}}>
        <Button title="Register" onPress={() => registerUser()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderBottomWidth: 1,
  },
});

export default RegisterScreen;
