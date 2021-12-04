import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreenPosts from './ProfileScreenPosts';
import FollowingScreen from './FollowingScreen';
import FollowerScreen from './FollowerScreen';
import {gql} from '@apollo/client';

const ProfileScreen = ({route, navigation}) => {
  const {userId, connection, client} = route.params;
  const [isConnection, setIsConnection] = useState(false);
  const Stack = createNativeStackNavigator();

  const test = async () => {
    let data = await client.query({
      query: gql`
      query {
  isConnection(userId: "${connection.who}", who: "${userId}") {
    status
  }
}
`,
    });
    console.log(data.data.isConnection.status);
    if (data.data.isConnection.status) {
      setIsConnection(true);
    }
  };

  useEffect(() => {
    if (connection) {
      test();
    }
  }, []);

  const followUser = async () => {
    console.log('Called');
    console.log(userId);
    let data = await client.mutate({
      mutation: gql`
mutation {
  followUser(connection: {
    userId: "${who}",
  who: "${userId}",
  }) {
    status
  }
}
`,
    });
    console.log(data);
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreenMain"
        initialParams={{
          userId: connection ? connection.who : userId,
          connection: connection,
        }}
        options={{header: () => null}}
        component={ProfileScreenPosts}
      />
      <Stack.Screen
        name="FollowingScreen"
        initialParams={{userId: connection ? connection.who : userId}}
        options={{title: 'Followings'}}
        component={FollowingScreen}
      />
      <Stack.Screen
        name="FollowerScreen"
        initialParams={{userId: connection ? connection.who : userId}}
        options={{title: 'Followers'}}
        component={FollowerScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
