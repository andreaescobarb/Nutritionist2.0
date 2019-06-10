import React from 'react';
import { StyleSheet, Switch, Platform, TouchableOpacity, ScrollView, Image, View, Button } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";

import materialTheme from '../constants/Theme';
import SleepPic from '../assets/images/sleep4.png';

import { entries } from './Components';
import { horas_sueno } from './Components';

export default class Hours_Sleep extends React.Component {
  onTextPress(horas_sueno, text) {
    console.log(text);
    horas_sueno = text;
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
      if (prevState.quantity - 0.5 >= 0) {
        return { quantity: prevState.quantity - 0.5 };
      }
    });
  }

  incrementCount = () => {
    this.setState((prevState, props) => ({
      quantity: prevState.quantity + 0.5
    }));
  }
  /*
  incrementCount = () => {
    this.setState((prevState, props) => {
      save( prevState.quantity + 0.25 );
  
      return {quantity: prevState.quantity + 0.25};
    });
  }
  */
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
    const { navigation } = this.props;
    return (
      <ScrollView style={{ backgroundColor: '#dda0dd' }}>
        <Block center>
          <Text>{"\n"}{"\n"}{"\n"}{"\n"}{"\n"}</Text>
          <Image
            source={(SleepPic)}
            style={{ width: 250, height: 250 }}
          />
          <Text>{"\n"}</Text>
          <Text size={30}>Horas:</Text>
          <Text size={30} onPress={(horas_sueno) => this.onTextPress(horas_sueno, (this.state.quantity))}>{this.state.quantity}</Text>
        </Block>
        <Block center>
          <Text></Text>
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
                onPress={() => { () => entries(navigation); this.incrementCount() }}
                /*onPress={this.incrementCount}*/
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

export { horas_sueno };

const styles = StyleSheet.create({
  hours_sleep: {
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
  },
});