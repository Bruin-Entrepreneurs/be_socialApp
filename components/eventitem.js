import React from 'react';

import styles from './eventitemstyle';
import {
    Text, View, TouchableHighlight
} from 'react-native';

class EventItem extends React.Component {
    constructor(){
        super();
    }
    render() {
        var name = this.props.name;

        return (
            <View style={styles.eventitem}>
                <Text style={[styles.name, styles.navy]}>{name}</Text>
            </View>
        );
    }
}

module.exports = EventItem;