import React from 'react';
import axios from 'axios';
import { StyleSheet, Switch, Platform, TouchableOpacity, ScrollView, Image, View, Dimensions, Alert } from "react-native";
import { Block, Text, theme, Icon, Input, Button } from "galio-framework";
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');


let parameters = {
    calories: '',
    carbs: '',
    protein: '',
    fats: '',
    sugars: '',
    sodium: '',
    satFat: '',
    fibre: '',
    foodId: '',
    foodname: ''
};

let addFacts = async ()  =>{
    findFood();
    axios.post('http://192.168.1.5:1337/nutritionfacts', 
    {
        params:{ 
            calories: parameters.calories,
            carbs: parameters.carbs,
            protein: parameters.protein,
            fats: parameters.fats,
            sugars: parameters.sugars,
            sodium: parameters.sodium,
            transfat: parameters.satFat,
            fiber: parameters.fibre,
            foodId: parameters.foodId 
        }
    }
    ).then(async function(response) {
        let data = response.data;
            Alert.alert(
                'Nuevos datos creados...'
            )
    
    }).catch(function(error) {
        console.log(error);
    });
};

let findFood = async function(navigation) {
    axios.get('http://192.168.1.5:1337/foods', {
        params:{ 
            name: parameters.foodname 
        }
    }, { 
        headers: {
            'Accept': 'application/json'
        }
    }).then(async function(response) {
        let food = response.data[0];
        if (!food) {
            Alert.alert(
                'Comida no encontrada, ingrese una comida válida.'
            )
        } else {
            const value = await AsyncStorage.setItem('food', JSON.stringify(food));
            foodId = value.id;
        }
    }).catch(function(error) {
        console.log(error);
    });
};

export default class DatosNutricionales extends React.Component {
    renderForm = () => {
        const { navigation } = this.props;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text>Datos Nutricionales</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar calorías de alimento"
                        keyboardType="numeric"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        onChangeText={(value) => parameters.calories = value}
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
                        onChangeText={(value) => parameters.carbs = value} s
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
                        onChangeText={(value) => parameters.protein = value} s
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
                        onChangeText={(value) => parameters.fats = value} s
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
                        onChangeText={(value) => parameters.sugars = value} s
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
                        onChangeText={(value) => parameters.sodium = value} s
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
                        onChangeText={(value) => parameters.satFat = value} s
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
                        onChangeText={(value) => parameters.fibre = value} s
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                    />
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar la comida"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        onChangeText={(value) => parameters.foodname = value} s
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
                        <Button
                            shadowless style={[styles.button, styles.shadow]}
                            onPress={() =>addFacts(navigation)}>
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