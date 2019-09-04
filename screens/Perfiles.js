import React from 'react';
import axios from 'axios';

import { Alert, StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Picker } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import Tags from "react-native-tags";
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';


let parameters = {
    name: '',
    username: '',
    password: '',
    lastname: '',
    gender: 'male',
    age: '0',
    weight: '',
    height: ''
};


async function getUser() {
    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    //console.log(loggedUser.id);
    try {
        const response = await axios.get('http://192.168.1.5:1337/users', {
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

export default class Perfil extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValdate: true,
            lastname: '',
            lastnameValdate: true,
            age: '',
            ageValdate: true,
            weight: '',
            weightValdate: true,
            tags: [],
            tagMap: {}
        };

    }

    componentDidMount = async () => {
        getUser().then((data) => {
            let tagMap = {};
            data.tags.forEach(function (item) {
                tagMap[item.id] = item.tags.map(function (tag) { return tag.name + " " });
            });
            console.log(data.tags);
            this.setState(data);
            this.setState({ tagMap: tagMap });
        }).catch(function (error) {
            console.log(error);
        });
    }

    validate = (value, type) => {
        namevalidation = /^[a-zA-Z]+$/
        lastnamevalidation = /^[a-zA-Z]+$/
        agevalidation = /^[0-9]+$/
        if (type == 'name') {
            if (namevalidation.test(value)) {
                this.setState({
                    nameValdate: true,
                })
                console.warn("text is correct")
            } else {
                this.setState({
                    nameValdate: false,
                })
                console.warn("invalid text")
            }
        } else if (type == 'lastname') {
            if (lastnamevalidation.test(value)) {
                this.setState({
                    lastnameValdate: true,
                })
                console.warn("text is correct")
            } else {
                this.setState({
                    lastnameValdate: false,
                })
                console.warn("invalid text")
            }
        } else if (type == 'age') {
            if (agevalidation.test(value)) {
                this.setState({
                    ageValdate: true,
                })
                console.warn("text is correct")
            } else {
                this.setState({
                    ageValdate: false,
                })
                console.warn("invalid text")
            }
        }
    }
    renderForm = () => {
        const { navigation } = this.props;

        return (
            <KeyboardAvoidingView>
                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Nombre</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input value={this.state.name} right placeholder="Nombre"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            //onChangeText={(value) => this.validate(parameters.name = value, 'name')}
                            onChangeText={(text) => this.setState({ name: text })}
                            //onChangeText={(text)=>this.validate(text,'name')}
                            style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.nameValdate ? styles.error : null]}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Apellido</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input value={this.state.lastname} right placeholder="Apellido"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(value) => parameters.lastname = value}
                        //onChangeText={(text)=>this.validate(text,'lastname')}
                        // style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.lastnameValdate ? styles.error : null]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Genero</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Picker
                            selectedValue={parameters.gender}
                            onValueChange={(itemValue, itemIndex) => parameters.gender = itemValue}>
                            <Picker.Item label="Femenino" value="male" />
                            <Picker.Item label="Masculino" value="female" />
                        </Picker>
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Edad</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Edad"
                            keyboardType="numeric"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(value) => parameters.age = value}
                            //onChangeText={(text)=>this.validate(text,'age')}
                            style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }, !this.state.ageValdate ? styles.error : null]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Peso</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Peso"
                            keyboardType="numeric"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(value) => parameters.weight = value}
                            style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Altura</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Altura"
                            keyboardType="numeric"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(value) => parameters.height = value}
                            //value= {parameters.height} 
                            style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Tags</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>

                    </Block>
                </Block>
            </KeyboardAvoidingView>

        )

    }

    renderTags = (tags) => {
        console.log(this.state);
        return tags.map((tag) => {
            return (
                <Block flex>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Block center>
                            <Tags readonly
                                initialTags={this.state.tagMap[tag.id]}
                            />
                        </Block>
                    </Block>
                </Block>
            )
        })
    }

    renderButton = () => {
        return (
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block center>
                        <Button shadowless style={[styles.button, styles.shadow]}>
                            Actualizar Perfil
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
                    {this.renderTags(this.state.tags)}
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