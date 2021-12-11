import {configureStore} from '@reduxjs/toolkit';
import GqlClient from '../slicers/GqlClient';

export default configureStore({
  reducer: {
    client: GqlClient,
  },
});
