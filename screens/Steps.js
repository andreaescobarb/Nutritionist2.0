import React from 'react';
import { StyleSheet, Switch, FlatList, Platform, TouchableOpacity, ScrollView, View, TextInput, Image } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";

import materialTheme from '../constants/Theme';
import steps from '../images/steps2.png';

export default class Steps extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 0
    }
    this.setSteps = this.setSteps.bind(this)
  }

  setSteps = () => {
    this.setState((prevState, props) => ({
      quantity: prevState.steps + 0.25
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
      <ScrollView style={{ backgroundColor: '#b0c4de' }}>
        <Block center>
          <Text>{"\n"}{"\n"}</Text>
          <TextInput
            fontSize={50}
            textAlign="center"
            placeholder={"Ingrese pasos..."}
            placeholderTextColor="black"
            keyboardType="numeric"></TextInput>
          <Text>{"\n"}{"\n"}{"\n"}</Text>  
          <Image
            source={(steps)}
            style={{ width: 255, height: 270 }}
          />
        </Block>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  steps: {
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
  }
});