import React from 'react'
import {
    Image,
    Picker,
    Text,
    View,
} from 'react-native'
import { StackNavigator } from 'react-navigation'
import  DateTimePicker  from 'react-native-modal-datetime-picker';

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
            chosenStartDate: new Date(),
            chosenEndDate: new Date(),
            isDateTimePickerVisible: false, 
            startTimeChosen: false,
            endTimeChosen: false
        }
    }

    componentDidMount() {
        const auth = storage.load({
            key: 'auth',
        }).then(
            (auth) => this.setState({ auth: auth })
        )
    }
    showStartDateTimePicker = () =>
        this.setState({ 
            isDateTimePickerVisible: true,
            startTimeChosen: true, 
        });

    showEndDateTimePicker = () => 
        this.setState({
            isDateTimePickerVisible: true,
            endTimeChosen: true,
        })
    
    hideDateTimePicker = () =>
        this.setState({ 
            isDateTimePickerVisible: false,
            startTimeChosen: false,
            endTimeChosen: false, 

        }); 

    handleTimePicked = (date) =>{
        if (this.state.startTimeChosen)
            this.setState({
                chosenStartDate: date,
            });
        if (this.state.endTimeChosen) 
            this.setState({
                chosenEndDate: date,
            });
        this.setState({
            isDateTimePickerVisible: false,
            startTimeChosen: false,
            endTimeChosen: false,
        }); 
    }
   

    render() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.eventContainer}>
                <Text style={styles.creationTitleText}>Select Time</Text>
                <Text style={styles.creationSubText}>Start Time: </Text>
                <Button full title="date" onPress={this.showStartDateTimePicker} />
                <DateTimePicker 
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleTimePicked}
                    onCancel={this.hideDateTimePicker}
                    mode='datetime'
                />
                <Text style={styles.creationSubText}> End Time </Text>
                <Button full title="date" onPress={this.showEndDateTimePicker} />

                <Button
                    title="Next"
                    onPress={
                        () => navigate('Description', { startTime: this.state.chosenStartDate,
                                                        endTime: this.state.chosenEndDate, })
                    }
                />
            </View>
        )
    }
}
