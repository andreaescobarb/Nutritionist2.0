import React from 'react';
import axios from 'axios';

import { StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
//import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
import { entries } from './Components';

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

//let identification = '';
let day = new Date().getDate(); //Current Date
let month = new Date().getMonth() + 1; //Current Month
let year = new Date().getFullYear(); //Current Year

let parameters = {
    userId: '',
    date: day + '/' + month + '/' + year,
    water: '',
    steps: '',
    weight: '',
    hours_of_sleep: ''
};

let AddEntries = async () => {
    const user = await getUser();
    parameters.userId = user.id;
    console.log(parameters);
    axios.post('http://192.168.43.33:1337/entries', parameters).then(async function (response) {
        let data = response.data;
        if (!data.created) {
            Alert.alert(
                'Ocurrio un error al guardar el diario'
            )
        } else {
            Alert.alert(
                'Diario guardado exitosamente'
            )
            const value = await AsyncStorage.setItem('entries', JSON.stringify(entries));
        }
    }).catch(function (error) {
        console.log(error);
    });
};

let LoadEntries = async () => {
<<<<<<< HEAD
    axios.get(`http://192.168.43.33:1337/entries`).then(response => {
=======
    axios.get(`https://192.168.100.15/entries`).then(response => {
>>>>>>> 86aaf41df95e94f7044ce98f80228766c3bf73b2
        let data = response.data;
        this.setState({ entries });
    }).catch(function (error) {
        console.log(error);
    });
};

export default class Diario extends React.Component {
    renderForm = () => {
        const { navigation } = this.props;
        return (
            <KeyboardAvoidingView>
                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Horas de Sueño</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder={"Horas de Sueño"}
                            color={materialTheme.COLORS.ICON}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(value) => parameters.hours_of_sleep = value}
                        //                        onChangeText={(text) => this.validate(text,"name")}   
                        //style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.nameValdate ? styles.error : null]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Peso</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Peso"
                            color={materialTheme.COLORS.ICON}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(value) => parameters.weight = value}
                        //                        onChangeText={(text) => this.validate(text,"lastname")}   
                        //style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.lastnameValdate ? styles.error : null]}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Pasos</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Pasos"
                            color={materialTheme.COLORS.ICON}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(value) => parameters.steps = value}
                        //                        onChangeText={(text) => this.validate(text,"username")}   
                        //style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.usernameValdate ? styles.error : null]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Agua</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Agua"
                            color={materialTheme.COLORS.ICON}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(value) => parameters.water = value}
                        //                        onChangeText={(text) => this.validate(text,"password")}   
                        //style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.passwordValdate ? styles.error : null]}
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
                        <Button
                            shadowless style={[styles.button, styles.shadow]}
                            onPress={() => AddEntries()}>
                            Guardar Datos
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
                    <Text>{'\n'}</Text>
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
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }

})