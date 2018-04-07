import React from 'react'
import {
    Image,
    Picker,
    Text,
    View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'

import storage from '../globals/storage'
import Button from '../components/Button'
import styles from './styles/CreationScreenStyle'
import { BASE_URL_PROD } from '../globals/constants'

const moment = require('moment');
const idLocale = require('moment/locale/id');
moment.locale('id', idLocale);

export default class TimeSelectScreen extends React.Component {
    static navigationOptions = {
        title: 'Step 1: Time',
    }

    constructor(props) {
        super(props);
        this.state = {
            chosenDate: new Date(),
        }
    }

    componentDidMount() {
        const auth = storage.load({
            key: 'auth',
        }).then(
            (auth) => this.setState({ auth: auth })
        )
    }

    render() {
        const { navigate } = this.props.navigation

        return (
            <View style={styles.eventContainer}>
                <Text style={styles.creationTitleText}>Select Time</Text>
                <Text style={styles.creationSubText}>Time</Text>
                <Button full title="date" onPress={() => { }} />
                <Button
                    title="Next"
                    onPress={
                        () => navigate('Description', { startTime: this.state.chosenDate, })
                    }
                />
            </View>
        )
    }
}
