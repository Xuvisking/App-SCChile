import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';

//screen
import panicbuttonRoute from './Panicbutton';
import escoltaRoute from './Escolta';
import contactRoute from './Contact';

const Mainmenu = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'panicbutton', title: 'Botón', icon: 'alert' },
    { key: 'escolta', title: 'Escolta', icon: 'car-side' },
    { key: 'contact', title: 'Contactos', icon: 'contacts' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    panicbutton: panicbuttonRoute,
    escolta: escoltaRoute,
    contact: contactRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#003399' }}
    />
  );
};
export default Mainmenu;