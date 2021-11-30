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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {useQuery, gql} from '@apollo/client';

const ProfileScreen = ({route, navigation}) => {
  const {userId} = route.params;
  //   const [data, setData] = useState([]);
  const [isRefreshing, setRefreshing] = useState(false);

  //   useEffect(() => {
  //     console.log('UseEffect');
  //     getFollowers();
  //   }, [user]);

  //   const getFollowers = () => {
  //     setRefreshing(true);
  //     client
  //       .query({
  //         query: gql`
  //         query {
  //           connections(query: {userName: {userName: "${user}"}}) {
  //             _id
  //             who {
  //               userName
  //               userEmail
  //               userPhone
  //             }
  //           }
  //         }
  //       `,
  //       })
  //       .then(result => {
  //         setData(result.data.connections);
  //         setRefreshing(false);
  //       })
  //       .catch(e => {
  //         console.log(e);
  //         setRefreshing(false);
  //       });
  //   };

  //   const followersQuery =     gql`
  //   query {
  //     connections(query: {who: {userName: "${user}"}}) {
  //       _id
  //       userName {
  //         userName
  //         userEmail
  //         userPhone
  //       }
  //     }
  //   }
  // `;

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
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <StatusBar translucent={true} />
      <View style={styles.info}>
        <TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text>Followings</Text>
            <Text>{data.profile.followingCount}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => alert('Change User')}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/defaultUserPic.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={{alignItems: 'center'}}>
            <Text>Followers</Text>
            <Text>{data.profile.followerCount}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  info: {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
    width: '100%',
    minHeight: '30%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  item: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 0,
    marginHorizontal: 5,
    alignItems: 'center',
  },
});

export default ProfileScreen;

{
  /* <FlatList
style={{flex: 1, width: '100%'}}
data={data.profile}
renderItem={item => (
  <View style={styles.item}>
    <Image
      style={{width: 50, height: 50}}
      source={require('../assets/defaultUserPic.png')}
    />
    <Text style={{marginStart: 10}}>{item.item.userName}</Text>
    <View style={{position: 'absolute', right: 0, marginRight: 10}}>
      <Button title="Remove" />
    </View>
  </View>
)}
refreshing={false}
onRefresh={() => refetch()}
/> */
}