import React from 'react';
import axios from 'axios';

import { Image, View } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import { StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let parameters = {
    id: '',
    name: '',
    description: '',
    image: ''
};

async function getFood(foodId) {
    try {
        const response = await axios.get('http://192.168.1.5:1337/foods', {
            params: {
                id: foodId
            }
        });
        const foodData = response.data[0];
        //console.log(foodData);
        return foodData;
    } catch (error) {

    }
}

function pre_edit(name, description) {
    parameters.name = name;
    parameters.description = description;
    console.log("Updated data: " + parameters)
    editFood();
}

let editFood = async () => {
    axios.patch('http://192.168.1.5:1337/foods', parameters).then((response) => {
        let data = response.data;
        //console.log(data)
        if (!data.updated) {
            Alert.alert(
                'Ocurrio un error al editar comida'
            )
        } else {
            Alert.alert(
                'Comida editada exitosamente'
            )
        }
    }).catch(function (error) {
        console.log(error);
    });
};

export default class EditFood extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            imagePicked: null,
        };
    }

    componentDidMount = async () => {
        console.log("componentDidMount received id: " + parameters.id)
        const data = await getFood(parameters.id);
        console.log(data);
        this.setState(data);
        //console.log(this.state.name);
    }

    validate(text, type) {
        namevalidation = /^[a-zA-Z]+$/
        descriptionvalidation = /^[a-zA-Z]+$/
        if (type == 'name') {
            if (namevalidation.test(text)) {
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
        } else if (type == 'description') {
            if (descriptionvalidation.test(text)) {
                this.setState({
                    descriptionValdate: true,
                })
                console.warn("text is correct")
            } else {
                this.setState({
                    descriptionValdate: false,
                })
                console.warn("invalid text")
            }
        }
    }

    renderForm = () => {
        const { navigation } = this.props;
        const foodId = navigation.getParam('foodId', 'NO-ID');
        console.log("Id received from navigation: " + foodId);
        parameters.id = foodId;
        let { imagePicked } = this.state;
        return (
            <KeyboardAvoidingView>
                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Nombre</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input value={this.state.name} right placeholder="Ingrese Nombre de Comida"
                            color={materialTheme.COLORS.ICON}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(text) => this.setState({ name: text })}
                            //                        onChangeText={(text) => this.validate(text,"name")}   
                            style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }]}
                        />
                    </Block>

                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input value={this.state.description} right placeholder="Ingrese Descripción de comida"
                            color={materialTheme.COLORS.ICON}
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            onChangeText={(text) => this.setState({ description: text })}
                            //                        onChangeText={(text) => this.validate(text,"description")}   
                            style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }]}
                        />
                    </Block>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button shadowless style={[styles.button, styles.shadow]}
                            onPress={this._pickImage}>
                            Selecciona una imagen
                    </Button>

                        {imagePicked &&
                            <Image source={{ uri: imagePicked }} style={{ width: 200, height: 200 }} />}
                    </View>
                </Block>
            </KeyboardAvoidingView>
        )
    }
    componentDidMount() {
        this.getPermissionAsync();
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    _pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            base64: true,
            allowsEditing: true,
            aspect: [4, 3],
        });

        console.log(result);

        if (!result.cancelled) {
            this.setState({ imagePicked: result.uri });
            parameters.image = result.uri;
        }
    };

    renderButton = () => {
        const { navigation } = this.props;
        return (
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block center>
                        <Button
                            shadowless style={[styles.button, styles.shadow]}
                            onPress={() => pre_edit(this.state.name, this.state.description)}>
                            Editar Comida
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
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }

})