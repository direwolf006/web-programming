import { createStore ,applyMiddleware,compose} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from './reducers/index'; 

const persistConfig = {
 key: 'root',
 storage: storage,
 blacklist: [],
 stateReconciler: autoMergeLevel2 
};

const pReducer = persistReducer(persistConfig, rootReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(pReducer,composeEnhancers(applyMiddleware(reduxThunk)));
export const persistor = persistStore(store);