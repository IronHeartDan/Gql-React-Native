import {gql} from '@apollo/client';
import React, {useState} from 'react';
import {View, Text, TextInput, Button, Image, StatusBar} from 'react-native';
import {useSelector} from 'react-redux';
import {selectClient} from '../../redux/slicers/GqlClient';

const UserName = ({navigation}) => {
  const client = useSelector(selectClient);
  const [userName, setUserName] = useState(null);
  const [err, setErr] = useState(false);

  const checkUserName = async data => {
    let res = await client.query({
      query: gql`
      query  {
  checkUserName(userName: "${data}")
}
`,
    });
    setErr(res.data.checkUserName);
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
          source={require('../../assets/asset_login.png')}
          resizeMode="contain"
        />
      </View>

      {err ? <Text style={{color: 'red'}}>UserName Already Taken</Text> : <></>}

      <TextInput
        placeholder="Create UserName"
        onChangeText={text => {
          setUserName(text);
          checkUserName(text);
        }}
        style={{
          borderBottomWidth: err ? 1 : userName.length > 3 ? 5 : 0,
          borderBottomColor: err
            ? 'red'
            : userName.length > 3
            ? 'lightgreen'
            : 'none',
        }}
      />
      <Button
        title="Next"
        disabled={err}
        onPress={() => navigation.navigate('EmailPass', {userName: userName})}
      />
    </View>
  );
};

export default UserName;
