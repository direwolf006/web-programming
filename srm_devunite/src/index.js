import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Typography from '@material-ui/core/Typography'
import { persistor, store } from './redux_store/ConfigureStore';
import App from './App';

ReactDOM.render(
  <Provider store={store}>
      <PersistGate loading={<Typography>Loading . . . .</Typography>} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);


