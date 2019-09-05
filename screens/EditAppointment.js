import React from 'react';
import axios from 'axios';

import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Picker, View, Alert, AsyncStorage } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import DateTimePicker from "react-native-modal-datetime-picker";
import ModalDropdown from 'react-native-modal-dropdown';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let test = [];
let isDisabled = true;
let day = new Date().getDate(); //Current Date
let month = new Date().getMonth(); //Current Month
let year = new Date().getFullYear(); //Current Year
let mindate = new Date(year, month, day);
let maxdate = new Date(year, month, day + 14);
let btncont = "Escoger nueva fecha";

let parameters = {
    id: '',
    date: '',
    time: '',
    patientId: null,
    patientName: '',
    patientData: ''
};

async function getUser() {
    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    //console.log(loggedUser.id);
    try {
        const response = await axios.get('http://192.168.43.33:1337/users', {
            params: {
                id: loggedUser.id
            }
        });
        const userData = response.data[0];
        // console.log(userData.name);

        return userData;
    } catch (error) {

    }
}

async function getAvailableHours() {
    try {
        const response = await axios.get('http://192.168.43.33:1337/appointments', {
            params: {
                date: parameters.date
            }
        });
        const naHours = [];
        for (var i = 0; i < response.data.length; i++) {
            naHours.push(response.data[i].time);
        }
        console.log("N/A Hours=====>" + JSON.stringify(naHours) + "<=====N/A Hours");
        let hours = ["8:00 am", "9:00 am", "10:00 am", "11:00 am",
            "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm"];
        let avHours = hours.filter(x => !naHours.includes(x));
        console.log("Available Hours=====>" + JSON.stringify(avHours) + "<=====Available Hours");
        test = avHours;
        //return avHours;
    } catch (error) {
        console.log(error);
    }
}

let appointments = async () => {
    const user = await getUser();
    parameters.patientId = user.id;
    parameters.patientName = user.name + " " + user.lastname;
    axios.post('http://192.168.43.33:1337/appointments', parameters).then(async function (response) {
        console.log(parameters)
        let data = response.data;
        if (!data.created) {
            Alert.alert(
                'Error al crear la cita'
            )
        } else {
            Alert.alert(
                'Se ha creado la cita'
            )
            btncont = "Escoger fecha";
            isDisabled = true;
            const value = await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
        }
    }).catch(function (error) {
        console.log(error);
    });
};

async function getAppointment(appointmentId) {
    try {
        const response = await axios.get('http://192.168.43.33:1337/appointments', {
            params: {
                id: appointmentId
            }
        });
        const appointmentData = response.data[0];
        //console.log(foodData);
        return appointmentData;
    } catch (error) {
        console.log(error);
    }
}

function pre_edit(description) {
    parameters.patientData = description;
    console.log("Updated data: " + JSON.stringify(parameters))
    editAppointment();
}

let editAppointment = async () => {
    axios.patch('http://192.168.43.33:1337/appointments', parameters).then((response) => {
        let data = response.data;
        //console.log(data)
        if (!data.updated) {
            Alert.alert(
                'Ocurrio un error al editar cita'
            )
        } else {
            Alert.alert(
                'Cita editada exitosamente'
            )
        }
    }).catch(function (error) {
        console.log(error);
    });
};

export default class EditAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            isDateTimePickerVisible: false,
            available_hours: [],
            description: ''
        }
    }

    componentDidMount = async () => {
        console.log("componentDidMount received id: " + parameters.id)
        const data = await getAppointment(parameters.id);
        console.log("Appointment data to be stated: " + JSON.stringify(data));
        this.setState({ description: data.patientData });
        parameters = data;
        //this.setState = ({ datebtn: data.date });
        //this.setState(data);
        //console.log(this.state.name);
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        formattedDate = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
        parameters.date = formattedDate;
        btncont = formattedDate;
        getAvailableHours();
        this.setState({ available_hours: test })
        console.log("state: " + JSON.stringify(this.state.available_hours));
        isDisabled = false;
        /*
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        console.log(strTime)
        parameters.time = strTime;
        console.log(formattedDate)
        console.log("A date has been picked: ", date);
        */
        this.hideDateTimePicker();
    };

    pickerChange(index) {
        hours.map((v, i) => {
            if (index === i) {
                parameters.time = hours[index].label;
            }
        })
        console.log(parameters.time)
    }

    renderForm = () => {
        const { navigation } = this.props;
        const appointmentId = navigation.getParam('appointmentId', 'NO-ID');
        console.log("Id received from navigation: " + appointmentId);
        parameters.id = appointmentId;
        return (
            <KeyboardAvoidingView>
                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Nutricionista</Text>
                        <Picker
                            selectedValue={parameters.nutritionist_id}
                            onValueChange={(itemValue, itemIndex) => parameters.nutritionist_id = itemValue}>
                            <Picker.Item label="Lucia Escobar" value="1" />
                        </Picker>
                    </Block>
                    <Block center>
                        <Text>{"\n"}</Text>
                        <Button onPress={this.showDateTimePicker}>{btncont}</Button>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode={'date'}
                            is24Hour={true}
                            minimumDate={mindate}
                            maximumDate={maxdate}
                        />
                    </Block>

                    <Block center>
                        <Text>{"\n"}</Text>
                        <ModalDropdown options={this.state.available_hours} onSelect={(index) => parameters.time = test[index]}
                            textStyle={{ fontSize: 17 }} disabled={isDisabled} defaultValue={"Seleccione la nueva hora"} />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text>{"\n"}{"\n"}</Text>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input
                            value={this.state.description}
                            right placeholder="Ingrese descripción"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(text) => this.setState({ description: text })}
                            style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        />
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }

    renderButton = () => {
        const { navigation } = this.props;
        return (
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block center>
                        <Text>{"\n"}{"\n"}</Text>
                        <Button
                            shadowless style={[styles.button, styles.shadow]}
                            onPress={() => pre_edit(this.state.description)}>
                            Editar cita
                    </Button>
                    </Block>
                </Block>
            </Block>
        )
    }

    render() {
        return (
            <Block flex center >
                <ScrollView
                    style={styles.components}
                    showsVerticalScrollIndicator={false}>
                    {this.renderForm()}
                    {this.renderButton()}
                </ScrollView>
            </Block>
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
        color: 'black'
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
    rows: {
        height: theme.SIZES.BASE * 2,
    },
})