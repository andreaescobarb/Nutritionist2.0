import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  AsyncStorage, Alert, KeyboardAvoidingView
} from 'react-native';
import { Button, Block, Text, theme } from 'galio-framework';

import { materialTheme } from '../constants/';
import { Icon, Switch } from '../components/';
import fruits from '../assets/images/fruits.jpg';

const { width } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
let day = new Date().getDate(); //Current Date
let month = new Date().getMonth() + 1; //Current Month
let year = new Date().getFullYear(); //Current Year
let date = day + '/' + month + '/' + year;
let agua = "";
let horas_sueno = "";
let peso = "";
let pasos = "";

export { agua };
export { peso };
export { pasos };
export { horas_sueno };

let parameters = {
  date,
  hours_sleep: horas_sueno,
  steps: pasos,
  weight: peso,
  water: agua,
};

export { entries };

let entries = async () => {
  axios.post('https://nutrionist-server.herokuapp.com/entries', parameters).then(async function (response) {
    console.log(entries)
    let data = response.data;
    if (!data.created) {
      Alert.alert(
        'Error al actualizar datos'
      )
    } else {
      Alert.alert(
        'Datos actualizados...'
      )
    }
  }).catch(function (error) {
    console.log(error);
  });
};

export default class Components extends React.Component {
  state = {};

  toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });

  renderItem = ({ item }) => {
    const { navigate } = this.props.navigation;
  }

  render() {
    const { navigation } = this.props;
    return (
      <ImageBackground source={fruits} style={{ width: '100%', height: '100%' }}>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}
        >
          <Block flex>
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
              <Block>
                <Text>{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}{'\n'}</Text>
              </Block>
              <Block>
                <Button
                  onPress = {() => entries()}
                  shadowless color="error"
                  style={[styles.button, styles.shadow]}>
                  <Text>Actualizar Datos</Text>
                  {console.log(agua)}
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