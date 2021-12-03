import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

import {useQuery, gql} from '@apollo/client';

const ProfileScreenHeader = ({userId, navigation}) => {
  const profileQuery = gql`
    query {
    profile(userId: "${userId}") {
      _id
      userEmail
      userName
      profilepicture
      bio
      postCount
      visibility
      followerCount
      followingCount
    }
  }
  `;

  const {loading, error, data, refetch} = useQuery(profileQuery);

  if (loading) return <Text>Lodaing..</Text>;
  if (error) return <Text>{error.message}</Text>;
  return (
    <View style={styles.info}>
      <View
        onPress={() =>
          navigation.navigate('FollowingScreen', {userId: userId})
        }>
        <View style={{alignItems: 'center'}}>
          <Text>Followings</Text>
          <Text>{data.profile.followingCount}</Text>
        </View>
      </View>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Image
          style={{width: 120, height: 120}}
          source={require('../assets/defaultUserPic.png')}
        />
        <Text style={{padding: 5}}>{data.profile.userName}</Text>
      </View>
      <View
        onPress={() => navigation.navigate('FollowerScreen', {userId: userId})}>
        <View style={{alignItems: 'center'}}>
          <Text>Followers</Text>
          <Text>{data.profile.followerCount}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    // backgroundColor: 'lightblue',
    width: '100%',
    // minHeight: '30%',
    padding: 25,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderBottomWidth: 1,
    borderBottomColor: 'silver',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default ProfileScreenHeader;
