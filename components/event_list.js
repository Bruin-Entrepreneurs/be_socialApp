import React from 'react';

import styles from './styles/event_list_styles'
import EventItem from './event_item';
import {
    ListView, 
    View,
} from 'react-native';

class EventList extends React.Component {
    constructor(){
        super();
    }

    render() {
        const eventsArray = this.props.events;

        return (
            <View style={styles.list}>
            {eventsArray.map((event, i) =>
                <EventItem name={event} key={i} />
            )}
            </View>
        );
    }

}


export default EventList;