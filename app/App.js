/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import SearchScreen from './screens/SearchScreen';

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
  return (
    <NavigationContainer>
      <ApolloProvider client={client}>
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              return (
                <MaterialCommunityIcons name="home" color={color} size={size} />
              );
            },
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
          })}>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: 'Prezent',
              headerStyle: {
                backgroundColor: 'transparent',
                elevation: 0,
              },
              headerTitleAlign: 'center',
            }}
          />
          <Tab.Screen
            name="Search"
            component={SearchScreen}
            options={{header: () => null}}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{header: () => null}}
          />
        </Tab.Navigator>
      </ApolloProvider>
    </NavigationContainer>
  );
};

export default App;
