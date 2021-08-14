import * as React from 'react';
import { BottomNavigation } from 'react-native-paper';
import materialTheme from '../../constants/Theme';
import CallLogScreen from '../pages/Calllogs';
import ContactScreen from '../pages/Contact';


const BottomNavigationBar = ({ navigation }) =>
{
  const callLogRoute = () => <CallLogScreen navigation={navigation}></CallLogScreen>;

  const contactRoute = () => <ContactScreen navigation={navigation}></ContactScreen>;
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'callLog', title: 'Call Logs', icon: 'album', color: materialTheme.COLORS.ERROR },
    { key: 'contact', title: 'Contact', icon: 'contacts', color: materialTheme.COLORS.ERROR },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    callLog: callLogRoute,
    contact: contactRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      barStyle={{ backgroundColor: materialTheme.COLORS.PRIMARY }}
      renderScene={renderScene}
    />
  );
};

export default BottomNavigationBar;