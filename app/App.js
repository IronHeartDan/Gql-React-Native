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
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';
import {Button, Dimensions, Image, Text, TextInput, View} from 'react-native';
import AddPostScreen from './screens/AddPostScreen';
const ic_home = require('./assets/ic_home.png');
const ic_search = require('./assets/ic_search.png');
const ic_add = require('./assets/ic_add.png');
const ic_account = require('./assets/ic_account.png');

import auth from '@react-native-firebase/auth';
import Authentication from './screens/Authentication';
import {Provider} from 'react-redux';
import Store from './redux/store/Store';

const client = new ApolloClient({
  // headers: {
  //   apiKey: 'RxRbVa46XSDA8neqdJT5mTCIWNPTJ9E6VJjtY3LVf9QiN8hy1UedF5BVgzpxOysD',
  // },
  // uri: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-hibwe/graphql',
  uri: 'http://192.168.0.106:4000/graphql',
  cache: new InMemoryCache(),
});

const Tab = createBottomTabNavigator();

const App = () => {
  var {height, width} = Dimensions.get('window');
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (auth().currentUser) {
      setUser(auth().currentUser);
    }
    auth().onAuthStateChanged(user => {
      console.log(`User Checking>>> ${user}`);
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });
  }, []);

  if (!user) {
    return (
      <Provider store={Store}>
        <NavigationContainer>
          <Authentication />
        </NavigationContainer>
      </Provider>
    );
  }

  return (
    <Provider store={Store}>
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
              initialParams={{
                client: client,
                userId: '618a1d2f194fbab325ff5427',
              }}
              options={{header: () => null}}
            />
            <Tab.Screen
              name="AddPostScreen"
              component={AddPostScreen}
              initialParams={{
                client: client,
                userId: '618a1d2f194fbab325ff5427',
              }}
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
    </Provider>
  );
};

export default App;
