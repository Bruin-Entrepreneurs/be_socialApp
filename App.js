import { AsyncStorage } from 'react-native';
import Storage from 'react-native-storage';
import { StackNavigator } from 'react-navigation';

import DescriptionScreen from './src/screens/DescriptionScreen';
import EventsScreen from './src/screens/EventsScreen';
import EventDetailScreen from './src/screens/EventDetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import InviteScreen from './src/screens/InviteScreen';
import TimeSelectScreen from './src/screens/TimeSelectScreen';
import UserProfile from './src/screens/ProfileScreen';

const App = StackNavigator({
	Home: { screen: HomeScreen },
	Description: { screen: DescriptionScreen },
	Invite: { screen: InviteScreen },
	UserProfile: { screen: UserProfile },
	Events: { screen: EventsScreen },
	EventDetail: { screen: EventDetailScreen },
	TimeSelect: { screen: TimeSelectScreen },
})

export default App; 
