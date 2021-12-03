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
  TouchableHighlight,
} from 'react-native';

import {useQuery, gql} from '@apollo/client';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';

const SearchScreen = ({route}) => {
  const Stack = createNativeStackNavigator();
  const client = route.params.client;
  const [users, setUsers] = useState([]);
  const searchUsers = async userName => {
    setUsers([]);
    if (userName) {
      let data = await client.query({
        query: gql`
    query SearchUser {
      searchUser(userName: "${userName}") {
      _id
      userName
      }
    }
    `,
      });
      setUsers(data.data.searchUser);
    }
  };

  const Search = ({navigation}) => {
    return (
      <View style={{flex: 1}}>
        <TextInput
          style={{padding: 20}}
          placeholder="Search"
          onChangeText={e => searchUsers(e)}
        />
        <FlatList
          style={{flex: 1}}
          data={users}
          renderItem={item => (
            <View
              style={{
                width: '100%',
                flexDirection: 'row',
                padding: 10,
                alignItems: 'center',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.push('Profile', {
                    userId: item.item._id,
                    title: item.item.userName,
                  });
                }}>
                <Image
                  style={{width: 50, height: 50}}
                  source={require('../assets/defaultUserPic.png')}
                />
              </TouchableOpacity>
              <Text style={{padding: 10}}>{item.item.userName}</Text>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};

export default SearchScreen;
