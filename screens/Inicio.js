import React from 'react';
import axios from 'axios';
import { View, ImageBackground, Alert, StyleSheet, Image, StatusBar, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Tags from "react-native-tags";
const { height, width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
import ProgressBarAnimated from 'react-native-progress-bar-animated';

let parameters = {
    name: '',
    username: '',
    password: '',
    lastname: '',
    gender: '',
    age: '0',
    weight: '',
    height: ''
};


async function getUser() {
    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    parameters.id = loggedUser.id;

    //console.log(loggedUser.id);
    try {
        const response = await axios.get('http://192.168.100.15:1337/users', {
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

export default class Inicio extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nameValdate: true,
            lastname: '',
            lastnameValdate: true,
            gender: '',
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

        <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
            <Block flex center>
            <ImageBackground
                source={require('../assets/images/avocado.png')}
                style={{ height: height, width: width }}
                imageStyle= {{opacity:0.5}}>
                
                <Block><Text h2 style={{fontWeight: 'bold', color:'purple'}}>Bienvenido, {this.state.username} {"\n"}{"\n"}</Text></Block>
                <Block><Text h3 style={{fontWeight: 'bold'}}>
                    Datos Personales:{"\n"}{"\n"}
                    </Text></Block>
                <Text h4 style={{fontWeight: 'bold', color:'white'}}>
                    Nombre: {this.state.name} {this.state.lastname}{"\n"}{"\n"}

                    Edad: {this.state.age}{"\n"}{"\n"}

                    Genero: {this.state.gender}{"\n"}{"\n"}

                    Peso: {this.state.weight}{"\n"}{"\n"}

                    Altura: {this.state.height} {"\n"}{"\n"}
                </Text>
                
                
            </ImageBackground>
          </Block>
        </Block>
          


            

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

    render() {
        return (
            <Block flex center >
                <ScrollView
                    style={styles.components}
                    showsVerticalScrollIndicator={false}>
                    {this.renderForm()}
                    {this.renderTags(this.state.tags)}
                </ScrollView>
            </Block>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.TWITTER,
        height: responsiveHeight(90),
      },
      padded: {
        paddingHorizontal: 3,
        position: 'relative',
        bottom: 2,
      },
      button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
      },
      Text: {
        fontSize: responsiveFontSize(2)
      },
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