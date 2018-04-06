import { StackNavigator } from 'react-navigation';

import CreationScreen from './src/screens/CreationScreen';
import EventsScreen from './src/screens/EventsScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import InviteScreen from './src/screens/InviteScreen';
import UserProfile from './src/screens/UserProfile';

const App = StackNavigator({
	Home: { screen: HomeScreen}, 
	Profile: { screen: CreationScreen },
	Invite: { screen: InviteScreen }, 
	UserProfile: { screen: UserProfile },
	EventsScreen: { screen: EventsScreen },
	EventDetailScreen: { screen: EventDetailScreen },
});

export default App; 
