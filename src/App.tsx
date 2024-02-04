/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import 'react-native-gesture-handler';
import NavigationStack from './navigation';
import EventProvider from './event/EventProvider';

function App(): React.JSX.Element {

  return (
    <EventProvider>
      <NavigationStack />
    </EventProvider>
  );
}

export default App;
