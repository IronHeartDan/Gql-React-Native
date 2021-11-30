import React, {useState} from 'react';
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

const HomeScreen = ({navigation}) => {
  const [user, setUser] = useState('618a1d2f194fbab325ff5427');
  const [userInput, setUserInput] = useState(user);
  const postsQuery = gql`
    query{
      homePosts(userId: "${user}") {
        userId
        userName
        profilepicture
        data
        type
        caption
        hashTags
        likeCount
        commentCount
      }
    }
  `;

  const {loading, error, data, refetch} = useQuery(postsQuery);

  if (loading) return <Text>Lodaing..</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView>
      <FlatList
        data={data.homePosts}
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

export default HomeScreen;
