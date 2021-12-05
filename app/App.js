/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React, {useEffect, useState} from 'react';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import {Button, Dimensions, Image, Text, TextInput, View} from 'react-native';
import AddPostScreen from './screens/AddPostScreen';
const ic_home = require('./assets/ic_home.png');
const ic_search = require('./assets/ic_search.png');
const ic_add = require('./assets/ic_add.png');
const ic_account = require('./assets/ic_account.png');

import auth from '@react-native-firebase/auth';

const client = new ApolloClient({
  // headers: {
  //   apiKey: 'RxRbVa46XSDA8neqdJT5mTCIWNPTJ9E6VJjtY3LVf9QiN8hy1UedF5BVgzpxOysD',
  // },
  // uri: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-hibwe/graphql',
  uri: 'http://192.168.0.109:4000/graphql',
  cache: new InMemoryCache(),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const App = () => {
  var {height, width} = Dimensions.get('window');
  const [user, setUser] = useState(null);
  const [phone, setPhone] = useState(null);

  useEffect(() => {
    if (auth().currentUser) {
      setUser(auth().currentUser);
    }
  }, []);

  const sendOTP = async () => {
    if (!phone) {
      alert('Enter Valid Phone');
    } else {
      let code = await auth().signInWithPhoneNumber(`+91${phone}`);
      console.log(code);
    }
  };

  // if (!user) {
  //   return (
  //     <View style={{height: '100%', backgroundColor: 'white'}}>
  //       <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
  //         <Text style={{fontSize: 50}}>Login</Text>
  //       </View>
  //       <View
  //         style={{
  //           alignItems: 'center',
  //           justifyContent: 'center',
  //         }}>
  //         <Image
  //           style={{width: '100%', height: 250}}
  //           resizeMode="contain"
  //           source={require('./assets/asset_login.png')}
  //         />
  //       </View>
  //       <View
  //         style={{
  //           flex: 1,
  //           alignItems: 'center',
  //           justifyContent: 'flex-end',
  //           padding: 10,
  //         }}>
  //         <TextInput
  //           style={{padding: 10, width: '100%'}}
  //           placeholder="Phone"
  //           keyboardType="number-pad"
  //           maxLength={10}
  //           onChangeText={text =>
  //             text.length == 10 ? setPhone(text) : setPhone(null)
  //           }
  //         />

  //         <View style={{width: '100%'}}>
  //           <Button onPress={() => sendOTP()} title="Login" />
  //         </View>
  //       </View>
  //     </View>
  //   );
  // }

  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              switch (route.name) {
                case 'HomeScreen':
                  return (
                    <Image
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                      source={ic_home}
                    />
                  );

                case 'SearchScreen':
                  return (
                    <Image
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                      source={ic_search}
                    />
                  );

                case 'AddPostScreen':
                  return (
                    <Image
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                      source={ic_add}
                    />
                  );

                case 'ProfileScreen':
                  return (
                    <Image
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                      source={ic_account}
                    />
                  );

                default:
                  return (
                    <Image
                      style={{width: 25, height: 25}}
                      resizeMode="contain"
                      source={require('./assets/ic_home.png')}
                    />
                  );
              }
            },
            tabBarActiveBackgroundColor: 'lightblue',
            tabBarActiveTintColor: 'transparent',
            tabBarInactiveTintColor: 'transparent',
            tabBarShowLabel: false,

            tabBarHideOnKeyboard: true,
          })}>
          <Tab.Screen
            name="HomeScreen"
            component={HomeScreen}
            initialParams={{userId: '618a1d2f194fbab325ff5427'}}
            options={{
              title: 'Prezent',
              headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
              },
              headerTitleAlign: 'center',
            }}
            options={{header: () => null}}
          />
          <Tab.Screen
            name="SearchScreen"
            component={SearchScreen}
            initialParams={{client: client, userId: '618a1d2f194fbab325ff5427'}}
            options={{header: () => null}}
          />
          <Tab.Screen
            name="AddPostScreen"
            component={AddPostScreen}
            initialParams={{client: client, userId: '618a1d2f194fbab325ff5427'}}
            options={{header: () => null}}
          />
          <Tab.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            initialParams={{userId: '618a1d2f194fbab325ff5427'}}
            options={{header: () => null}}
          />
        </Tab.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
