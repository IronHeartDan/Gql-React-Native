/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {ApolloProvider} from '@apollo/client';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {Image} from 'react-native';
import {Provider} from 'react-redux';
import Store from './redux/store/Store';
import AddPostScreen from './screens/AddPostScreen';
import Authentication from './screens/Authentication';
import HomeScreen from './screens/HomeScreen';
import MainScreen from './screens/MainScreen';
import ProfileScreen from './screens/ProfileScreen';
import SearchScreen from './screens/SearchScreen';
const ic_home = require('./assets/ic_home.png');
const ic_search = require('./assets/ic_search.png');
const ic_add = require('./assets/ic_add.png');
const ic_account = require('./assets/ic_account.png');

const App = () => {
  return (
    <Provider store={Store}>
      <MainScreen />
    </Provider>
  );

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
              initialParams={{userId: '61b5a9496d15e3c28ddeb923'}}
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
                userId: '61b5a9496d15e3c28ddeb923',
              }}
              options={{header: () => null}}
            />
            <Tab.Screen
              name="AddPostScreen"
              component={AddPostScreen}
              initialParams={{
                client: client,
                userId: '61b5a9496d15e3c28ddeb923',
              }}
              options={{header: () => null}}
            />
            <Tab.Screen
              name="ProfileScreen"
              component={ProfileScreen}
              initialParams={{userId: '61b5a9496d15e3c28ddeb923'}}
              options={{header: () => null}}
            />
          </Tab.Navigator>
        </ApolloProvider>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
