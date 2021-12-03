import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreenPosts from './ProfileScreenPosts';
import FollowingScreen from './FollowingScreen';
import FollowerScreen from './FollowerScreen';

const ProfileScreen = ({route, navigation}) => {
  const {userId} = route.params;
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileScreenMain"
        initialParams={{userId: userId}}
        options={{header: () => null}}
        component={ProfileScreenPosts}
      />
      <Stack.Screen
        name="FollowingScreen"
        initialParams={{userId: userId}}
        options={{title: 'Followings'}}
        component={FollowingScreen}
      />
      <Stack.Screen
        name="FollowerScreen"
        initialParams={{userId: userId}}
        options={{title: 'Followers'}}
        component={FollowerScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileScreen;
