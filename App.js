/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Alert,
  Button,
  Platform,
  TextInput,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql,
} from '@apollo/client';

const client = new ApolloClient({
  headers: {
    apiKey: 'RxRbVa46XSDA8neqdJT5mTCIWNPTJ9E6VJjtY3LVf9QiN8hy1UedF5BVgzpxOysD',
  },
  uri: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-hibwe/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  const [user, setUser] = useState('darknoon');
  const [userInput, setUserInput] = useState(user);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log('UseEffect');

    client
      .query({
        query: gql`
        query {
          connections(query: {userName: {userName: "${user}"}}) {
            _id
            who {
              userName
              userEmail
              userPhone
            }
          }
        }
      `,
      })
      .then(result => {
        setData(result.data.connections);
      })
      .catch(e => console.log(e));
  }, [user]);

  const changeUser = () => {
    console.log('Run');
    if (Platform.OS == 'ios') {
      Alert.prompt(
        'Enter Username',
        'Enter UserName',
        [{text: 'Ok', onPress: () => console.log('Ok Pressed')}],
        Alert.alert,
      );
    } else {
      Alert.alert('BC!');
    }
  };

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <View style={styles.info}>
        <TouchableOpacity onPress={() => alert('Change User')}>
          <Image
            style={{width: 100, height: 100}}
            source={require('./assets/defaultUserPic.png')}
          />
        </TouchableOpacity>
        <TextInput
          value={userInput}
          placeholder="Enter UserName"
          style={{textAlign: 'center'}}
          onChangeText={value => setUserInput(value)}
        />
        {user !== userInput ? (
          <Button title="OK!" onPress={() => setUser(userInput)} />
        ) : null}
      </View>
      <Text style={{fontSize: 24, padding: 10}}>Followers</Text>
      <FlatList
        style={{flex: 1, width: '100%'}}
        data={data}
        renderItem={item => (
          <View style={styles.item}>
            <Image
              style={{width: 50, height: 50}}
              source={require('./assets/defaultUserPic.png')}
            />
            <Text style={{marginStart: 10}}>{item.item.who.userName}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  info: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    shadowColor: 'black',
    marginVertical: 0,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default App;
