import React from "react";
import { AsyncStorage, Text, View, ScrollView } from "react-native";
import { HeaderBackButton } from "react-navigation";
import { Avatar } from "react-native-elements";

import storage from "../globals/storage";
import { BASE_URL_PROD } from "../globals/constants";
import Button from "../components/Button";
import EventView from "../components/EventView";
import styles from "./styles/EventDetailScreen";

export default class EventDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    headerLeft: (
      <HeaderBackButton
        onPress={() => {
          const { navigate } = navigation;
          navigate("Events");
        }}
        title="Events"
      />
    ),
    title: "Event Detail"
  });

  constructor(props) {
    super(props);
    this.state = {
      event: false,
      superInvited: false,
      accepted: [],
      declined: [],
      responded: false,
      err: false
    };

    this._getEventAsync = this._getEventAsync.bind(this);
  }

  componentDidMount() {
    const user = storage
      .load({
        key: "user"
      })
      .then(user => this.setState({ user: user }));

    const auth = storage
      .load({
        key: "auth"
      })
      .then(auth =>
        this.setState(prevState => {
          return Object.assign({}, prevState, {
            auth: auth
          });
        }, this._getEventAsync)
      );
  }

  render() {
    const { navigate } = this.props.navigation;
    const eventType = this.state.event.event_type;

    return (
      <View style={styles.container}>
        {this.state.event ? (
          <View style={{ flex: 1 }}>
            <EventView
              superlike={this.state.superInvited}
              title={eventType.name}
              desc={this.state.event.description}
              start_time={this.state.event.start_time}
              end_time={this.state.event.end_time}
            />
            {!this.state.responded && (
              <View style={styles.buttonContainer}>
                <Button half title="Accept" onPress={this._handleAccept} />
                <Button half title="Decline" onPress={this._handleDecline} />
              </View>
            )}
          </View>
        ) : (
          <Text> Loading Event </Text>
        )}
        {this.state.err && <Text>Error: {this.state.err}</Text>}

        <View
          style={{
            height: 150,
            flex: 1,
            flexDirection: "row",
            paddingLeft: 10
          }}
        >
          {!this.state.accepted ? (
            <Text> Loading </Text>
          ) : (
            <View>
              <Text style={styles.acceptDeclineText}> Accepted </Text>
              <ScrollView
                contentContainerStyle={{ marginBottom: 20 }}
                horizontal={false}
                alwaysBounceHorizontal={false}
              >
                {this.state.accepted.map(user => (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <Avatar
                      medium
                      rounded
                      containerStyle={{ marginTop: 5 }}
                      overlayContainerStyle={{ backgroundColor: "transparent" }}
                      source={{ uri: user.profile_pic_url }}
                    />
                    <Text style={styles.nameSubText}>{user.username}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
          )}

          <View>
            <Text style={styles.acceptDeclineText}> Declined </Text>
            <ScrollView
              contentContainerStyle={{ marginBottom: 20 }}
              horizontal={false}
              alwaysBounceHorizontal={false}
            >
              {this.state.declined.map(user => (
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <Avatar
                    medium
                    rounded
                    containerStyle={{ marginTop: 5 }}
                    overlayContainerStyle={{ backgroundColor: "transparent" }}
                    source={{ uri: !user ? "" : user.profile_pic_url }}
                  />
                  <Text style={styles.nameSubText}>{user.username}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
    );
  }

  _getEventAsync = async () => {
    const eventId = this.props.navigation.state.params.id;
    const eventResponse = await fetch(BASE_URL_PROD + "/event/" + eventId, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.state.auth.access_token
      }
    });

    const eventJson = await eventResponse.json();
    console.log(eventJson);

    if (eventResponse.ok) {
      this.setState(prevState => {
        return Object.assign({}, prevState, {
          event: eventJson,
          accepted: eventJson.accepted,
          declined: eventJson.declined,
          responded:
            eventJson.accepted.includes(Number(prevState.user.id)) ||
            eventJson.declined.includes(Number(prevState.user.id)),
          superInvited: eventJson.super_invited.includes(
            Number(prevState.user.id)
          )
        });
      });
    } else {
      this.setState(prevState => {
        return Object.assign({}, prevState, {
          err: eventResponse.statusCode
        });
      });
    }
  };

  _handleAccept = async () => {
    const eventId = this.props.navigation.state.params.id;
    const acceptResponse = await fetch(
      BASE_URL_PROD + "/event/" + eventId + "/accept/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.auth.access_token
        }
      }
    );

    console.log(acceptResponse);

    if (acceptResponse.ok) {
      this.setState({ responded: true });
    } else {
      console.log(acceptResponse);
    }
  };

  _handleDecline = async () => {
    const eventId = this.props.navigation.state.params.id;
    const declineResponse = await fetch(
      BASE_URL_PROD + "/event/" + eventId + "/decline/",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.state.auth.access_token
        }
      }
    );

    if (declineResponse.ok) {
      this.setState({ responded: true });
    } else {
      console.log(declineResponse);
    }
  };
}
