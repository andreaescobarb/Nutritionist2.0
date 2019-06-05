import React from 'react';
import { StyleSheet, Switch, FlatList, Platform, TouchableOpacity, ScrollView, View, Image, Button } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import WeightPic from '../assets/images/weight.png';
import axios from 'axios';

import materialTheme from '../constants/Theme';
import { Slider } from 'react-native-gesture-handler';

var peso = "";
export {peso};

export default class Weight extends React.Component {
  onTextPress(event, text) {
    console.log(text);
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
      if (prevState.quantity - 1 >= 0) {
        return { quantity: prevState.quantity - 1 };
      }
    });
  }

  incrementCount = () => {
    this.setState((prevState, props) => ({
      quantity: prevState.quantity + 1
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
    return (
      <ScrollView style = {{ backgroundColor: '#ffdab9' }}>
        <Block center>
          <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
          <Text size={30} onPress={(peso) => this.onTextPress(peso, (this.state.quantity))}>{this.state.quantity} Lbs</Text>
          <Text>{"\n"}{"\n"}</Text>
          <Image
            source={(WeightPic)}
            style={{ width: 250, height: 160 }}
          />
        </Block>
        <Block center>
          <Text>{"\n"}{"\n"}{"\n"}</Text>
          <View style={styles.container}>
            <View style={styles.button}>
              <Button
                onPress = {() => {() => entries(navigation); this.decrementCount()}}
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