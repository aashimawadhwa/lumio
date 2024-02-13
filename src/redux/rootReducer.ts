import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import logoutReducer from 'src/redux/slices/logout'



// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const logoutConfig = {
  key: 'logout',
  storage,
  keyPrefix: 'redux-',
  whitelist: ['value'],
};


const rootReducer = combineReducers({
  logout: persistReducer(logoutConfig, logoutReducer),

});

export { rootPersistConfig, rootReducer };
