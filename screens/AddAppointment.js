import React from 'react';

import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Picker, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import DateTimePicker from "react-native-modal-datetime-picker";

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let parameters = {
    id: '',
    patient_id: '',
    nutritionist_id: '',
    date: '',
    time: '',
    patient_data: ''
};

export default class AddAppointent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false
        };
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
                            is24Hour={true}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text>{"\n"}{"\n"}</Text>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese descripción"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(value) => parameters.description = value}
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
                            onPress={() => console.log("Se ha registrado una nueva cita")}>
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