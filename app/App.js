/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';
import React from 'react';
import {Text} from 'react-native';
import ProfileScreen from './screens/ProfileScreen';

const client = new ApolloClient({
  // headers: {
  //   apiKey: 'RxRbVa46XSDA8neqdJT5mTCIWNPTJ9E6VJjtY3LVf9QiN8hy1UedF5BVgzpxOysD',
  // },
  // uri: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-hibwe/graphql',
  uri: 'http://172.20.10.5:4000/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <ProfileScreen client={client} />
    </ApolloProvider>
  );
};

export default App;
