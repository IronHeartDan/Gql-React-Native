import {configureStore} from '@reduxjs/toolkit';
import GqlClient from '../slicers/GqlClient';
import UserSlice from '../slicers/UserSlice';

export default configureStore({
  reducer: {
    client: GqlClient,
    user: UserSlice,
  },
});
