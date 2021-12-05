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
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProfileScreenPosts from './ProfileScreenPosts';
import ProfileScreen from './ProfileScreen';

const HomeScreen = ({route, navigation}) => {

  const {userId} = route.params;
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState('618a1d2f194fbab325ff5427');
  const [userInput, setUserInput] = useState(user);
  const [isLoading, setLoading] = useState(false);
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

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Image
          style={{width: '100%'}}
          source={require('../assets/loading.png')}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          alignContent: 'center',
          justifyContent: 'center',
          backgroundColor: 'white',
        }}>
        <Text>Server Down</Text>
        <Image
          style={{width: '100%'}}
          source={require('../assets/serverDown.png')}
          resizeMode="contain"
        />
      </SafeAreaView>
    );
  }

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const Home = ({navigation}) => {
    return (
      <SafeAreaView>
        <FlatList
          data={data.homePosts}
          ItemSeparatorComponent={ItemSeparatorView}
          renderItem={item => (
            <View style={styles.post}>
              <View style={styles.postInfo}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.push('Profile', {
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
          refreshing={loading ? true : false}
          onRefresh={() => refetch()}
        />
      </SafeAreaView>
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        initialParams={{userId: userId}}
        options={{header: () => null}}
        component={Home}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
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
