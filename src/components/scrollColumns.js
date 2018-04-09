import React from 'react';
import {
	Text,
	TouchableOpacity,
	View,
	ScrollView,
} from 'react-native';

import {
	Avatar,
} from 'react-native-elements';

import styles from '../screens/styles/InviteScreenStyle'



const ScrollColumns = ({ leftUsers, onPress, searchText }) => {

	
	leftUsers = leftUsers.filter(user => 
		user.username.toLowerCase().includes(searchText.toLowerCase()))

	return (
		<ScrollView contentContainerStyle={{ marginBottom: 20 }} horizontal={false} alwaysBounceHorizontal={false}>
		{
				leftUsers
				.map( 
						(user, i) => {
							return (
								<TouchableOpacity key={i} onPress={user => onPress(user)}>
								<View style={{ flex: 1, flexDirection: 'row' }}>
									<Avatar medium rounded
									containerStyle={{ marginTop: 5 }}
									overlayContainerStyle={{ backgroundColor: 'transparent' }}
									source={{ uri: user.profile_pic_url }}
									/>
									<Text style={styles.nameSubText}>
										{user.username}
									</Text>
								</View>
								</TouchableOpacity>
							)
						}
				)
			}
		</ScrollView>
	)
}

export default ScrollColumns;

