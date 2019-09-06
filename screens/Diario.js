import React from 'react';
import axios from 'axios';

import { Alert, StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Picker } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Tags from "react-native-tags";
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let day = new Date().getDate(); //Current Date
let month = new Date().getMonth() + 1; //Current Month
let year = new Date().getFullYear(); //Current Year
let date = day + '/' + month + '/' + year;
let parameters = {
    date,
    hours_of_sleep: '',
    steps: '',
    userId: '',
    water: '',
    weight: ''
};


async function pre_edit(hours_of_sleep, steps, water, weight) {
    console.log("Updated data: " + hours_of_sleep);

    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    
    console.log("Updated data: " + loggedUser.id)
    parameters.hours_of_sleep = hours_of_sleep;
    parameters.steps = steps;
    parameters.water = water;
    parameters.weight = weight;
    parameters.userId = loggedUser.id;
    console.log("Updated data: " + parameters);
    addEntries();
}

let addEntries = async ()  =>{
    axios.post('http://192.168.100.15:1337/entries', parameters).then(async function(response) {
        let data = response.data;
            Alert.alert(
                'Datos del día almacenados'
            )        
    }).catch(function(error) {
        console.log(error);
    });
};

export default class Entries extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          date,
          hours_of_sleep: '',
          steps: '',
          userId: '',
          water: '',
          weight: ''
        };

    }

    
    renderForm = () => {
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView>
                <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h5 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fecha: {this.state.date}</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text  h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Horas de Sueño</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese cuantas horas durmió"
                            placeholderTextColor={materialTheme.COLORS.INPUT}
                            color={materialTheme.COLORS.ICON}
                            //onChangeText={(value) => this.validate(parameters.name = value, 'name')}
                            onChangeText={(text) => this.setState({ hours_of_sleep: text })}
                            //onChangeText={(text)=>this.validate(text,'name')}
                            style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }]}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Steps</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese la cantidad aproximada de pasos que dio"
                            placeholderTextColor={materialTheme.COLORS.INPUT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(text) => this.setState({ steps: text })}
                        //onChangeText={(text)=>this.validate(text,'lastname')}
                        // style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.lastnameValdate ? styles.error : null]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Agua</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese la cantidad de agua que bebió en Litros"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(text) => this.setState({ water: text })}
                            //onChangeText={(text)=>this.validate(text,'age')}
                            style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT },]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Peso</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese su peso de hoy, en Libras"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(text) => this.setState({ weight: text })}
                            style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        />
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )

    }

    renderButton = () => {
        return (
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block center>
                        <Button shadowless style={[styles.button, styles.shadow]}
                            onPress={() => pre_edit(this.state.hours_of_sleep, this.state.steps, this.state.water, this.state.weight)}>
                            Guardar
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
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }
})