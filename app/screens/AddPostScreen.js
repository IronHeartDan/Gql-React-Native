import CameraRoll from '@react-native-community/cameraroll';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  PermissionsAndroid,
  Alert,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  TextInput,
  Button,
  Dimensions,
  StyleSheet,
} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import storage from '@react-native-firebase/storage';

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
      checkPermission().then(permission => {
        if (permission) {
          setStoragePermission(true);
          fetchMedia();
        } else {
          Alert.alert(
            'Storaage Permission Denied',
            'Storage Permission Is Needed',
          );
        }
      });
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

  const addDetails = ({route, navigation}) => {
    const [uploading, setUploading] = useState(false);

    let upload = async uri => {
      let name = Date.now().toString();
      let ref = storage().ref(`/posts/${name}`);
      let task = ref.putFile(uri);
      task.on('state_changed', taskSnapshot => {
        // console.log(
        //   `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        // );
        setUploading(true);
      });

      task.then(() => {
        setUploading(false);
        navigation.goBack();
      });
    };

    var {height, width} = Dimensions.get('window');
    const {uri} = route.params;

    return (
      <>
        <Modal transparent={true} visible={uploading}>
          <View
            style={{
              margin: 20,
              backgroundColor: 'white',
              borderRadius: 20,
              padding: 35,
              alignItems: 'center',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
            }}>
            <Text>Uploading</Text>
          </View>
        </Modal>

        <View style={{minHeight: height - StatusBar.currentHeight}}>
          <View style={{flex: 1}}>
            <Image
              style={{width: '100%', height: '100%'}}
              resizeMode="cover"
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
              style={{
                flex: 1,
                textAlignVertical: 'top',
              }}
              placeholder="Type Here..."
            />
            <Button
              title="Upload"
              onPress={() => upload(uri)}
              disabled={uploading}
            />
          </View>
        </View>
      </>
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
