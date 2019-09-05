import React from 'react';
import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { AppRegistry, View, Image, TouchableOpacity, Alert } from 'react-native';
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
import Tags from "react-native-tags";
import { Card, Button, Icon } from 'react-native-elements';
import axios from 'axios';

let parameters = {
    id: ''
};

export default class ListEntries extends React.Component {
    state = {
        listEntries: [],
        tagMap: {}
    };

    renderForm = () => {
        const { navigation } = this.props;
        return (
            <Block flex style={styles.group}>
                {this.renderFoods(this.state.listEntries)}
            </Block>
        )
    }


    handleDelete = (entryId) => {
        const currentEntries = this.state.listEntries;

        // Remove deleted item from state.
        this.setState({
            listEntries: currentEntries.filter(entry => entry.id !== entryId),
        });

        console.log(entryId);
        axios.delete('http://192.168.100.15:1337/entries', {
            data: { id: entryId }
        }).then(response => {
            if (response.status === 'error') {
                this.setState({
                    entries: currentEntries,
                });
            } else {
            }
        })
    };





    renderEntries = listEntries => {
        const { navigation } = this.props;

        return listEntries.map((listentry) => {
            return (
                <Card title={listentry.date}>
                <Text style={{ marginBottom: 5 }}>Litros de Agua: {listentry.water}</Text>
                <Text style={{ marginBottom: 5 }}>Pasos: {listentry.steps}</Text>
                <Text style={{ marginBottom: 5 }}>Peso: {listentry.weight}</Text>
                <Text style={{ marginBottom: 5 }}>Horas de Sueño: {listentry.hours_of_sleep}</Text>
                <Button style={styles.button} onPress={() => this.handleDelete(listentry.id)}> Eliminar</Button>

                </Card>
            )
        })
    }

    render() {
        return (
            <Block flex center >
                <ScrollView
                    style={styles.components}
                    showsVerticalScrollIndicator={false}>

                    {this.renderForm()}
                </ScrollView>
            </Block>
        );
    }

    componentDidMount() {
        fetch('http://192.168.100.15:1337/entries', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {


                if (!responseJson) {
                    responseJson = [];
                }

                this.setState({ entry: responseJson });

                this.setState({ listEntries: responseJson });
            })
            .catch((error) => {
                console.error(error);
            });
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
        paddingTop: 20
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
        backgroundColor: materialTheme.COLORS.PRIMARY
        // width: width - (theme.SIZES.BASE * 2),
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