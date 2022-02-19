import auth from '@react-native-firebase/auth';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {removeUser, selectUser, setUser} from '../redux/slicers/UserSlice';
import Authentication from './Authentication';

const MainScreen = () => {
  const user = useSelector(selectUser);
  const Tab = createBottomTabNavigator();
  const dispatch = useDispatch();

  useEffect(() => {
    let currentUser = auth().currentUser;
    console.log(`Current User ${currentUser}`);
    if (currentUser) {
      dispatch(setUser(currentUser));
    }
    auth().onAuthStateChanged(currentUser => {
      console.log(`User Checking>>> ${currentUser}`);
      if (currentUser) {
        dispatch(setUser(currentUser));
      } else {
        dispatch(removeUser());
      }
    });
  }, []);

  if (!user) {
    return (
      <NavigationContainer>
        <Authentication />
      </NavigationContainer>
    );
  }

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
};

export default MainScreen;
