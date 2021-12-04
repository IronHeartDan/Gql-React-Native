import React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useQuery, gql} from '@apollo/client';
import ProfileScreenHeader from './ProfileScreenHeader';

const ProfileScreenPosts = ({route, navigation}) => {
  const {userId, connection, client} = route.params;
  const userPostsQuery = gql`
    query{
      userPosts(userId: "${userId}") {
        userName
        profilepicture
        data
        type
        hashTags
        caption
        likeCount
        commentCount
      }
    }
      `;

  const {loading, error, data, refetch} = useQuery(userPostsQuery);

  if (loading) return <Text>Lodaing..</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <FlatList
        ListHeaderComponent={
          <ProfileScreenHeader
            userId={userId}
            navigation={navigation}
            client={client}
            connection={connection}
          />
        }
        style={{flex: 1, width: '100%'}}
        data={data.userPosts}
        renderItem={item => (
          <View style={styles.post}>
            <View style={styles.postInfo}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Profile', {
                    userId: item.item.userId,
                    title: item.item.userName,
                  })
                }>
                <Image
                  style={{width: 35, height: 35}}
                  source={require('../assets/defaultUserPic.png')}
                />
              </TouchableOpacity>
              <Text style={{marginStart: 10}}>{item.item.userName}</Text>
            </View>
            <View style={{width: '100%', maxHeight: 250}}>
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../assets/image_1.jpg')}
                resizeMode="cover"
              />
            </View>
            <View style={{padding: 10}}>
              <Text>{item.item.data}</Text>
            </View>
          </View>
        )}
        refreshing={false}
        onRefresh={() => refetch()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  post: {
    width: '100%',
  },
  postInfo: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
  },
});

export default ProfileScreenPosts;
