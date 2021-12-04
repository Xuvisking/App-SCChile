import 'react-native-gesture-handler';
import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
// import { Block, GalioProvider } from 'galio-framework';
import AppLoading from 'expo-app-loading';

//redux
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import alarmaReducer from './AlarmaReducer';
import { connect } from 'react-redux';

//componentes
import Intro from './screens/Intro';
import Login from './screens/Login';
import PassChange from './screens/PassChange';
import Mainmenu from './screens/Mainmenu';
// import Inicio from './screens/Inicio';
// import Escolta from './screens/Escolta';
// import Contactos from './screens/Contactos';

import * as Font from 'expo-font';
import { Images, articles, Theme } from './constants';
import { Value } from 'react-native-reanimated';
import { addUsuario } from './AlarmaAction';

//constantes
const Drawer = createDrawerNavigator();
const store = createStore(alarmaReducer);

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  });
}

export default class App extends React.Component {

  state = {
    isLoadingComplete: false,
    fontLoaded: false
  };

  render() {
    if (!this.state.isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        //provider entrega acceso a store a todos los componentes
        <Provider store={store}>
          <PaperProvider theme={Theme}>
            <NavigationContainer>
              <Drawer.Navigator>
                    <Drawer.Screen name="Intro" component={Intro}/>
                    <Drawer.Screen name="Login" component={Login}/>
                    {/* <Drawer.Screen name="Inicio" component={Inicio} /> */}
                    <Drawer.Screen name="Mainmenu" component={Mainmenu} />
                    {/* <Drawer.Screen name="Escolta" component={Escolta}/>
                    <Drawer.Screen name="Contactos" component={Contactos}/> */}
                    <Drawer.Screen name="PassChange" component={PassChange}/>
              </Drawer.Navigator>
            </NavigationContainer>
          </PaperProvider>
        </Provider>
      );
    }
  }

_loadResourcesAsync = async () => {
  await Font.loadAsync({
    'montserrat-regular': require('./assets/font/Montserrat-Regular.ttf'),
    'montserrat-bold': require('./assets/font/Montserrat-Bold.ttf')
  });

  this.setState({ fontLoaded: true });
  return Promise.all([...cacheImages(assetImages)]);
};

_handleLoadingError = error => {
  // In this case, you might want to report the error to your error
  // reporting service, for example Sentry
  console.warn(error);
};

_handleFinishLoading = () => {
  if (this.state.fontLoaded) {
    this.setState({ isLoadingComplete: true });
  }
};

}