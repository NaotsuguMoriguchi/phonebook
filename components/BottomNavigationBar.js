import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import materialTheme from '../constants/Theme';
import CallLogScreen from '../screens/Calllogs';
import ContactScreen from '../screens/Contact';


const BottomNavigationBar = ({ navigation }) =>
{
  const callLogRoute = () => <CallLogScreen navigation={navigation}></CallLogScreen>;

  const contactRoute = () => <ContactScreen navigation={navigation}></ContactScreen>;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'callLog', title: 'Call Logs', icon: 'clock', color: materialTheme.COLORS.INFO },
    { key: 'contact', title: 'Contact', icon: 'contacts', color: materialTheme.COLORS.INFO },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    callLog: callLogRoute,
    contact: contactRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes, }}
      onIndexChange={setIndex}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationBar;