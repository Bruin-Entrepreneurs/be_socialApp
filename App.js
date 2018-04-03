import { StackNavigator } from 'react-navigation';

import CreationScreen from './src/screens/CreationScreen';
import EventScreen from './src/screens/EventScreen';
import HomeScreen from './src/screens/HomeScreen';
import InviteScreen from './src/screens/InviteScreen';
import UserProfile from './src/screens/UserProfile';

const App = StackNavigator({
	Home: { screen: HomeScreen}, 
	Profile: { screen: CreationScreen },
	Invite: {screen: InviteScreen }, 
	UserProfile: { screen: UserProfile },  
	EventScreen: { screen: EventScreen },
});

export default App; 
