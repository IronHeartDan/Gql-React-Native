import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Alert,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Button,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const AddPostScreen = () => {
  const Stack = createNativeStackNavigator();

  const selectImage = ({navigation}) => {
    const [storagePermission, setStoragePermission] = useState(false);
    const [media, setMedia] = useState([]);
    const [after, setAfter] = useState(0);
    const checkPermission = async () => {
      let status = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );

      if (status) {
        return status;
      }

      try {
        let res = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Needed',
            message: 'Storage Permission Is Required For Selecting Image',
            buttonPositive: 'OK',
          },
        );
        console.log(res);
        if (res == 'granted') {
          return true;
        } else if (res == 'denied') {
          return false;
        } else {
          console.log(res);
          return false;
        }
      } catch (error) {
        console.warn(error);
      }
    };

    const fetchMedia = async () => {
      let data = await CameraRoll.getPhotos({
        first: 50,
        assetType: 'Photos',
      });
      setMedia(data.edges.map(edge => edge.node));
      if (data.page_info.has_next_page) {
        console.log('setting');
        setAfter(data.page_info.end_cursor);
        console.log(after);
      }
    };

    const fetchMoreMedia = async after => {
      let data = await CameraRoll.getPhotos({
        first: 50,
        after: after,
        assetType: 'Photos',
      });
      // setMedia(
      //   ...media,
      //   data.edges.map(edge => edge.node),
      // );
    };

    useEffect(() => {
      if (checkPermission()) {
        setStoragePermission(true);
        fetchMedia();
      } else {
        Alert.alert(
          'Storaage Permission Denied',
          'Storage Permission Is Needed',
        );
      }
    }, []);

    if (!storagePermission) {
      return (
        <View style={{alignContent: 'center', justifyContent: 'center'}}>
          <Text>Storage Permission Denied</Text>
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
        }}>
        <FlatList
          data={media}
          renderItem={item => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('AddDetails', {uri: item.item.image.uri})
              }>
              <Image
                style={{
                  minWidth: '33.333%',
                  minHeight: 100,
                }}
                resizeMode="cover"
                source={{uri: item.item.image.uri}}
              />
            </TouchableOpacity>
          )}
          numColumns={3}
          onEndReached={() => fetchMoreMedia(after)}
        />
      </View>
    );
  };

  const addDetails = ({route}) => {
    const {uri} = route.params;
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Image
            style={{width: '100%', height: '100%'}}
            resizeMode="contain"
            source={{uri: uri}}
          />
        </View>
        <View
          style={{
            height: 1,
            width: '100%',
            backgroundColor: '#C8C8C8',
          }}
        />
        <View style={{flex: 1}}>
          <TextInput
            multiline
            numberOfLines={10}
            placeholder="useless placeholder"
          />
          <Button title="Upload" />
        </View>
      </View>
    );
  };

  return (
    <Stack.Navigator screenOptions={{header: () => null}}>
      <Stack.Screen name="SelectImage" component={selectImage} />
      <Stack.Screen name="AddDetails" component={addDetails} />
    </Stack.Navigator>
  );
};

export default AddPostScreen;
