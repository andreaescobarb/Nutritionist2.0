import React from 'react';
import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView, Picker, View } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { materialTheme } from '../constants';

let thumbMeasure = (width - 48 - 32) / 3;
let { width } = Dimensions.get('screen');

export default class Appointments extends React.Component {
    state = {};
    toggleSwitch = switchNumber => this.setState({ [switchNumber]: !this.state[switchNumber] });
    renderItem = ({ item }) => {
        const { navigate } = this.props.navigation;
    }
    render() {
        const { navigation } = this.props;
        return (
            <ScrollView style={styles.components} showsVerticalScrollIndicator={false}>
                <Block flex>
                    <Text>{"\n"}</Text>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block center>
                            <Text>{"\n"}{"\n"}{"\n"}</Text>
                        </Block>
                        <Block center>
                            <Button
                                onPress={() => navigation.navigate('AddAppointment')}
                                shadowless style={[styles.button, styles.shadow]}>
                                Crear cita
                            </Button>
                        </Block>
                        <Block center>
                            <Button
                                onPress={() => navigation.navigate('EditDelAppointment')}
                                shadowless color="info"
                                style={[styles.button, styles.shadow]}>
                                Editar o eliminar cita
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </ScrollView>
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