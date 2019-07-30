import React from 'react';
import axios from 'axios';

import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Picker, View, Alert, AsyncStorage } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import DateTimePicker from "react-native-modal-datetime-picker";

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let parameters = {
    id: '12',
    ID: '12',
    patient_id: '12',
    nutritionist_id: '12',
    date: '12',
    time: '12',
    patientdata: '12'
};

let appointments = async () => {
    axios.post('http://172.16.27.183:1337/appointments', parameters).then(async function (response) {
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
            const value = await AsyncStorage.setItem('appointments', JSON.stringify(appointments));
        }
    }).catch(function (error) {
        console.log(error);
    });
};

export default class AddAppointment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            appointments: [],
            isDateTimePickerVisible: false
        }
    }
    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    };

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    };

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    renderForm = () => {
        const { navigation } = this.props;
        return (
            <KeyboardAvoidingView>
                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Nutricionista</Text>
                        <Picker
                            selectedValue={parameters.nutritionist_id}
                            onValueChange={(itemValue, itemIndex) => parameters.nutritionist_id = itemValue}>
                            <Picker.Item label="Lucia Escobar" value="1" />
                            <Picker.Item label="Nutricionista 2" value="2" />
                            <Picker.Item label="Nutricionista 3" value="3" />
                        </Picker>
                    </Block>
                    <Block center>
                        <Text>{"\n"}</Text>
                        <Button onPress={this.showDateTimePicker}>Escoger fecha y hora</Button>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this.handleDatePicked}
                            onCancel={this.hideDateTimePicker}
                            mode={'datetime'}
                            is24Hour={false}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text>{"\n"}{"\n"}</Text>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese descripción"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(value) => parameters.patient_data = value}
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
                            onPress={() => appointments()}>
                            Hacer cita
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