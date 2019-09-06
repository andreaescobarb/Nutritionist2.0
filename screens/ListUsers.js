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

export default class ListUsers extends React.Component {
    state = {
        listUsers: [],
        tagMap: {}
    };

    renderForm = () => {
        const { navigation } = this.props;
        return (
            <Block flex style={styles.group}>
                {this.renderUsers(this.state.listUsers)}
            </Block>
        )
    }


    handleDelete = (userId) => {
        const currentUsers = this.state.listUsers;

        // Remove deleted item from state.
        this.setState({
            listUsers: currentUsers.filter(user => user.id !== userId),
        });

        console.log(userId);
        axios.delete('http://InsertYourIpHere:1337/users', {
            data: { id: userId }
        }).then(response => {
            if (response.status === 'error') {
                this.setState({
                    users: currentUsers,
                });
            } else {
            }
        })
    };





    renderUsers = listUsers => {
        const { navigation } = this.props;

        return listUsers.map((listuser) => {
            return (
                <Card title={listuser.username}>
                <Text style={{ marginBottom: 5 }}>Nombre: {listuser.name}</Text>
                <Text style={{ marginBottom: 5 }}>Apellido: {listuser.lastname}</Text>
                <Text style={{ marginBottom: 5 }}>Edad: {listuser.age}</Text>
                <Text style={{ marginBottom: 5 }}>Género: {listuser.gender}</Text>
                <Text style={{ marginBottom: 5 }}>Rol: {listuser.role}</Text>
                <Button style={styles.button} onPress={() => this.handleDelete(listuser.id)}> Eliminar</Button>
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
        fetch('http://InsertYourIpHere:1337/users', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {


                if (!responseJson) {
                    responseJson = [];
                }

                this.setState({ user: responseJson });

                this.setState({ listUsers: responseJson });
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