import React from 'react';
import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import {useQuery, gql} from '@apollo/client';

const FollowingScreen = ({route, navigation}) => {
  const {userId} = route.params;

  const userPostsQuery = gql`
query {
  followings(userId: "${userId}") {
  userEmail
  userName  
  }
}
    `;

  const {loading, error, data, refetch} = useQuery(userPostsQuery);

  if (loading) return <Text>Lodaing..</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <FlatList
      data={data.followings}
      renderItem={item => (
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            padding: 10,
            alignItems: 'center',
          }}>
          <TouchableOpacity>
            <Image
              style={{width: 50, height: 50}}
              source={require('../assets/defaultUserPic.png')}
            />
          </TouchableOpacity>
          <Text style={{padding: 10}}>{item.item.userName}</Text>
        </View>
      )}
    />
  );
};

export default FollowingScreen;
