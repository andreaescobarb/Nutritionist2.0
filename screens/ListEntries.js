import React from "react";
import axios from 'axios';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { AppRegistry, AsyncStorage, View, Image, TouchableOpacity } from "react-native";
const { width } = Dimensions.get("screen");
import { materialTheme } from "../constants";
import Tags from "react-native-tags";
import { Card } from "react-native-elements";


export default class ListEntries extends React.Component {
  state = {
    listentries: [],
    emtryMap: {}
  };

  renderForm = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        {this.renderEntries(this.state.listentries)}
      </Block>
    );
  };
  renderEntries = listentries => {
    const { navigation } = this.props;
    return listentries.map(listentry => {
      return (
        <Card title={listentry.date}>
          <Text style={{ marginBottom: 5}}>Agua: {listentry.water} vasos</Text>
          <Text style={{ marginBottom: 5}}>Pasos Dados: {listentry.steps} pasos</Text>
          <Text style={{ marginBottom: 5}}>Peso: {listentry.weight} Libras</Text>
          <Text style={styles.button}>Horas de Sueño: {listentry.hours_of_sleep} horas</Text>
          
        </Card>
      );
    });
  };

  render() {
    return (
      <Block flex center>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}
        >
          {this.renderForm()}
        </ScrollView>
      </Block>
    );
  }

  handleEdit = (navigation, appointment) => {
    navigation.navigate('EditEntry', { appointmentId: appointment })
  };

  async componentDidMount() {
    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    console.log("user" + loggedUser.id);
    const id = loggedUser.id;
    console.log("http://192.168.1.5:1337/entries?userId=" + id);
    fetch("http://192.168.1.5:1337/entries?userId=" + id, {
      method: "GET",
      headers: {
        Accept: "application/json"
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        //let tagMap = {};
        if (!responseJson) {
          responseJson = [];
        }
        this.setState({ entry: responseJson });
        this.setState({ listentries: responseJson });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  components: {},
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2
  },
  group: {
    paddingTop: 20
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "#4A4A4A",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },

  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR
  },

  rows: {
    height: theme.SIZES.BASE * 2
  }
});
