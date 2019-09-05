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

async function getUser() {
  const value = await AsyncStorage.getItem('user');
  const loggedUser = JSON.parse(value);
  console.log("user" + loggedUser.id)
  return loggedUser.id
}
export default class ListAppointmentsUser extends React.Component {
  state = {
    listappointments: [],
    appointmentMap: {}
  };

  renderForm = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        {this.renderAppointments(this.state.listappointments)}
      </Block>
    );
  };

  handleDelete = (appointmentId) => {

    // state, before delete anything
    const currentAppointments = this.state.listappointments;

    // Remove deleted item from state.
    this.setState({
      listappointments: currentAppointments.filter(appointment => appointment.id !== appointmentId),
    });

    console.log(appointmentId);
    axios.delete('http://192.168.1.5:1337/appointments', {
      data: { id: appointmentId }
    }).then(response => {
      if (response.status === 'error') {
        this.setState({
          appointments: currentappointments,
        });
      } else {
      }
    })
  };

  handleEdit = (navigation, appointment) => {
    navigation.navigate('EditAppointment', { appointmentId: appointment })
  };

  renderAppointments = listappointments => {
    const { navigation } = this.props;
    return listappointments.map(listappointment => {
      return (
        <Card title={listappointment.date}>
          <Text style={{ marginBottom: 5 }}>Hora: {listappointment.time}</Text>
          <Text style={{ marginBottom: 5 }}>Paciente: {listappointment.patientName}</Text>
          <Text style={{ marginBottom: 5 }}>Información: {listappointment.patientData}</Text>
          <Button style={styles.button} onPress={() => this.handleEdit(navigation, listappointment.id)}> Editar</Button>
          <Button style={styles.button} onPress={() => this.handleDelete(listappointment.id)}> Eliminar</Button>

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

  componentDidMount() {
    const id = getUser();
    console.log("http://192.168.1.5:1337/appointments?patientId=" +id);
    fetch("http://192.168.1.5:1337/appointments?patientId=" +id, {
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
        /*responseJson.forEach(function(item) {
          tagMap[item.id] = item.tags.map(function(tag) {
            return tag.name + " "});
        });*/
        this.setState({ appointment: responseJson });
        //this.setState({ tagMap: tagMap });
        responseJson.forEach(function (item) {
          //tagMap[item.id] = item.tag.map(function(tag) {return tag.name + " "});
        });
        this.setState({ listappointments: responseJson });
        //this.setState({ tagMap: tagMap });
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
