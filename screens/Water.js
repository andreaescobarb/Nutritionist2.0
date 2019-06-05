import React from 'react';
import {
  StyleSheet,
  Switch,
  Platform,
  TouchableOpacity,
  ScrollView,
  Image,
  View,
  Button,
  Dimensions,
  AsyncStorage
} from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";

import materialTheme from '../constants/Theme';
import WaterPic from '../assets/images/waterglass.png';

//import { StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView, AsyncStorage } from 'react-native';
import { entries } from './Components';

const { width } = Dimensions.get('screen');

let agua = "";
export { agua };

export default class Water extends React.Component {
  onTextPress(agua, text) {
    console.log(text);
    agua = text;
  }
  constructor(props) {
    super(props);
    this.state = {
      quantity: 0
    }
    this.incrementCount = this.incrementCount.bind(this)
  }

  decrementCount = () => {
    this.setState((prevState, props) => {
      if (prevState.quantity - 0.25 >= 0) {
        return { quantity: prevState.quantity - 0.25 };
      }
    });
  }

  incrementCount = () => {
    this.setState((prevState, props) => ({
      quantity: prevState.quantity + 0.25
    }));
  }

  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;

    switch (item.type) {
      case 'switch':
        return (
          <Block row middle space="between" style={styles.rows}>
            <Text size={14}>{item.title}</Text>
            <Switch
              onValueChange={() => this.toggleSwitch(item.id)}
              ios_backgroundColor={materialTheme.COLORS.SWITCH_OFF}
              thumbColor={Platform.OS === 'android' ? materialTheme.COLORS.SWITCH_OFF : null}
              trackColor={{ false: materialTheme.COLORS.SWITCH_OFF, true: materialTheme.COLORS.SWITCH_ON }}
              value={this.state[item.id]}
            />
          </Block>
        );
      case 'button':
        return (
          <Block style={styles.rows}>
            <TouchableOpacity onPress={() => navigate('Pro')}>
              <Block row middle space="between" style={{ paddingTop: 7 }}>
                <Text size={14}>{item.title}</Text>
                <Icon name="stre-right" family="Galio" style={{ paddingRight: 5 }} />
              </Block>
            </TouchableOpacity>
          </Block>);
      default:
        break;
    }
  }

  render() {
    //const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    return (
      <ScrollView style={{ backgroundColor: '#7fffd4' }}>
        <Block center>
          <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
          <Text size={30} onPress={(agua) => this.onTextPress(agua, (this.state.quantity))}>{this.state.quantity} L</Text>
          <Text>{"\n"}</Text>
          <Image
            source={(WaterPic)}
            style={{ width: 300, height: 300 }}
          />
        </Block>
        <Block center>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button
                onPress={this.decrementCount}
                title={'-'}
                backgroundColor={'#FB6567'}
                icon={{ name: 'face' }}
              >
                {this.state.decrementCount}
              </Button>
            </View>
            <Text>{"              "}</Text>
            <View style={styles.button}>
              <Button
                onPress = {() => {() => entries(navigation); this.incrementCount()}}
                title={'+'}
                backgroundColor={'#FB6567'}
                icon={{ name: 'face' }}
              >
                {this.state.quantity}
              </Button>
            </View>
          </View>
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  water: {
    paddingVertical: theme.SIZES.BASE / 3,
  },
  title: {
    paddingTop: theme.SIZES.BASE,
    paddingBottom: theme.SIZES.BASE / 2,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
    paddingHorizontal: theme.SIZES.BASE,
    marginBottom: theme.SIZES.BASE / 2,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  button: {
    width: '20%',
    height: 40
  }
});