import React from 'react';
import axios from 'axios';
import { StyleSheet, Switch, Platform, TouchableOpacity, ScrollView, Image, View, Dimensions, Alert, AsyncStorage } from "react-native";
import { Block, Text, theme, Icon, Input, Button } from "galio-framework";
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');

let parameters = {
    id: '',
    calories: '',
    carbs: '',
    proteins: '',
    fat: '',
    sugar: '',
    sodium: '',
    transfat: '',
    fiber: ''
}

async function getFood(foodId) {
    try {
        const response = await axios.get('http://InsertYourIpHere:1337/foods', {
            params: {
                id: foodId
            }
        });
        const foodData = response.data[0];
        //console.log(foodData);
        parameters.calories = foodData.calories;
        parameters.carbs = foodData.carbs;
        parameters.proteins = foodData.proteins;
        parameters.fat = foodData.fat;
        parameters.sugar = foodData.sugar;
        parameters.sodium = foodData.sodium;
        parameters.transfat = foodData.transfat;
        parameters.fiber = foodData.fiber;
    } catch (error) {

    }
}

function pre_edit(id, calories, carbs, proteins, fat, sugar, sodium, transFat, fiber) {
    parameters.calories = calories;
    parameters.carbs = carbs;
    parameters.proteins = proteins;
    parameters.fat = fat;
    parameters.sugar = sugar;
    parameters.sodium = sodium;
    parameters.transfat = transFat;
    parameters.fiber = fiber;
    console.log("Updated data: " + parameters)
    addFacts();
}

let addFacts = async () => {
    axios.patch('http://InsertYourIpHere:1337/foods', parameters).then((response) => {
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

export default class DatosNutricionales extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            description: '',
            image:'',
            calories:'',
            carbs:'',
            proteins:'',
            fat:'',
            sugar:'',
            sodium:'',
            transFat:'',
            fiber:'',
        };
    }

    componentDidMount = async () => {
        console.log("componentDidMount received id: " + parameters.id)
        const data = await getFood(parameters.id);
        console.log(data);
        this.setState(data);
        //console.log(this.state.name);
    }
    
    renderForm = () => {
        const { navigation } = this.props;
        const foodId = navigation.getParam('foodId', 'NO-ID');
        console.log("Id received from navigation: " + foodId);
        parameters.id = foodId;
        getFood(parameters.id);
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text>Datos Nutricionales</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text>Calorías</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar calorías de alimento"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        onChangeText={(value) => this.validate(parameters.calories = value, 'calories')}
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Carbohidratos</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de carbohidratos (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.carbs = value, 'carbs')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Proteína</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de proteína (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.proteins = value, 'proteins')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Grasa</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de grasa (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.fat = value, 'fat')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Azúcar</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de azúcar (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.sugar = value, 'sugar')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Sodio</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de sodio (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.sodium = value, 'sodium')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Grasa Saturada</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de grasa saturada (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.transfat = value, 'transfat')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Fibra</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar cantidad de fibra (gramos)"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => this.validate(parameters.fiber = value, 'fiber')}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>
            </Block>
        )

    }

    renderButton = () => {
        const { navigation } = this.props;
        return (
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block center>
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