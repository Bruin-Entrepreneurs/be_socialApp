import React from 'react';

import styles from './eventliststyles'
import EventItem from './eventitem';
import {
    ListView, View,
} from 'react-native';

class EventList extends React.Component {
    constructor(){
        super();
    }
    componentWillMount() {
        this.dataSource = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2
        });
    }

    render() {
        var dataSource = this.dataSource.cloneWithRows(this.props.events);
        var eventsArray = this.props.events;

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