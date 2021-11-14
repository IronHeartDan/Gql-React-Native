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

const ProfileScreen = ({client}) => {
  const [user, setUser] = useState('darknoon');
  const [userInput, setUserInput] = useState(user);
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

  const followersQuery = gql`
    query {
      followers(userName: "${user}", skip: 0, limit: 4) {
        userName
      }
    }
  `;

  const {loading, error, data, refetch} = useQuery(followersQuery);

  if (loading) return <Text>Lodaing..</Text>;
  if (error) return <Text>{error.message}</Text>;

  return (
    <SafeAreaView style={{flex: 1, alignItems: 'center'}}>
      <StatusBar translucent={true} backgroundColor="lightblue" />
      <View style={styles.info}>
        <TouchableOpacity onPress={() => alert('Change User')}>
          <Image
            style={{width: 100, height: 100}}
            source={require('../assets/defaultUserPic.png')}
          />
        </TouchableOpacity>
        <TextInput
          value={userInput}
          placeholder="Enter UserName"
          style={{textAlign: 'center'}}
          onChangeText={value => setUserInput(value)}
        />
        {user !== userInput ? (
          <Button title="OK!" onPress={() => setUser(userInput)} />
        ) : null}
      </View>
      <Text style={{fontSize: 24, padding: 10}}>Followers</Text>
      <FlatList
        style={{flex: 1, width: '100%'}}
        data={data.followers}
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
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  info: {
    backgroundColor: 'lightblue',
    width: '100%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
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
