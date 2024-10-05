/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import MainStack from './src/navigation/MainStack';
import {persistor, store} from './src/redux/store';
import Constant from './src/constants/Constant';
import Toast from 'react-native-toast-message';

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GestureHandlerRootView style={{flex: 1}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={Constant.colors['light-pink']}
          />
          <MainStack />
          <Toast />
        </GestureHandlerRootView>
      </PersistGate>
    </Provider>
  );
}

export default App;
