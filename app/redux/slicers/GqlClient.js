import {ApolloClient, InMemoryCache} from '@apollo/client';
import {createSlice} from '@reduxjs/toolkit';

export const clientSlice = createSlice({
  name: 'client',
  initialState: {
    client: new ApolloClient({
      // headers: {
      //   apiKey: 'RxRbVa46XSDA8neqdJT5mTCIWNPTJ9E6VJjtY3LVf9QiN8hy1UedF5BVgzpxOysD',
      // },
      // uri: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/app/application-0-hibwe/graphql',
      // uri: 'https://gql-prezent.herokuapp.com/graphql',
      uri: 'http://192.168.0.106:4000/graphql',
      // uri: 'http://172.20.10.5:4000/graphql',
      cache: new InMemoryCache(),
    }),
  },
});

export const selectClient = state => state.client.client;
export default clientSlice.reducer;
