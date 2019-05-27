import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground
} from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';

import { materialTheme } from '../constants/';
import { Icon, Switch } from '../components/';
import fruits from '../images/fruits.jpg';

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
var day = new Date().getDate(); //Current Date
var month = new Date().getMonth() + 1; //Current Month
var year = new Date().getFullYear(); //Current Year

export default class Components extends React.Component {
  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
  }
/*
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
  }*/

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={fruits} style={{ width: '100%', height: '100%' }}>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}
        >
          {/*{this.renderButtons()}*/}
          <Block flex>
            {/*<Text bold size={16} style={styles.title}>Buttons</Text>*/}
            <Text>{"\n"}</Text>
            <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
              <Block center>
                <Text size={24}>{day} - {month} - {year}</Text>
                <Text>{"\n"}{"\n"}{"\n"}</Text>
              </Block>
              <Block center>
                <Button
                  onPress={() => navigation.navigate('Hours_Sleep')}
                  shadowless style={[styles.button, styles.shadow]}>
                  Horas de Sueño
            </Button>
              </Block>
              <Block center>
                <Button
                  onPress={() => navigation.navigate('Weight')}
                  shadowless color="info"
                  style={[styles.button, styles.shadow]}>
                  Peso
            </Button>
              </Block>
              <Block center>
                <Button
                  onPress={() => navigation.navigate('Steps')}
                  shadowless color="success"
                  style={[styles.button, styles.shadow]}>
                  Pasos
            </Button>
              </Block>
              <Block center>
                <Button
                  onPress={() => navigation.navigate('Water')}
                  shadowless color="warning"
                  style={[styles.button, styles.shadow]}>
                  Agua
                </Button>
              </Block>
            </Block>
          </Block>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  components: {
  },
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
  },
  shadow: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2,
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - (theme.SIZES.BASE * 2),
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: '#4A4A4A',
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29,
  },
  optionsButton: {
    width: 'auto',
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10,
  },
  input: {
    borderBottomWidth: 1,
  },
  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY,
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO,
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS,
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING,
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR,
  },
  imageBlock: {
    overflow: 'hidden',
    borderRadius: 4,
  },
  rows: {
    height: theme.SIZES.BASE * 2,
  },
  social: {
    width: theme.SIZES.BASE * 3.5,
    height: theme.SIZES.BASE * 3.5,
    borderRadius: theme.SIZES.BASE * 1.75,
    justifyContent: 'center',
  },
  category: {
    backgroundColor: theme.COLORS.WHITE,
    marginVertical: theme.SIZES.BASE / 2,
    borderWidth: 0,
  },
  categoryTitle: {
    height: '100%',
    paddingHorizontal: theme.SIZES.BASE,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  albumThumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: 'center',
    width: thumbMeasure,
    height: thumbMeasure
  },
});