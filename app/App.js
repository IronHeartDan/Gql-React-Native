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
import {Text} from 'react-native';

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
              return <Text>{route.name}</Text>;
            },
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'transparent',
            tabBarShowLabel: false,
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
            initialParams={{client: client}}
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
