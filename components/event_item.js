import React from 'react';

import styles from './styles/event_item_style';
import {
    Text, 
    View, 
    TouchableHighlight,
} from 'react-native';

class EventItem extends React.Component {
    constructor(){
        super();
    }
    render() {
        const name = this.props.name;

        return (
            <View style={styles.eventitem}>
                <Text style={[styles.name, styles.navy]}>{name}</Text>
            </View>
        );
    }
}

module.exports = EventItem;