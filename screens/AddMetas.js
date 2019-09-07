import React from 'react';
import axios from 'axios';

import { Image, View } from 'react-native';
import { ImagePicker, Permissions, Constants } from 'expo';
import { StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
import ModalDropdown from 'react-native-modal-dropdown';

let parameters = {
<<<<<<< HEAD
    id: '',
    goal: '',
    userId:''
=======
    type: "",
    goal: "",
    userId: ""
>>>>>>> 9965c42ae5e9b9758c7e566ff9f50e4b31ea348d
};

async function getUser() {
    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    //console.log(loggedUser.id);
    try {
        const response = await axios.get('http://InsertYourIpHere:1337/users', {
            params: {
                id: loggedUser.id
            }
        });
        const userData = response.data[0];
        return userData;
    } catch (error) {

    }
}

let addGoal = async (parameters) => {
    console.log(parameters)
    axios.post('http://InsertYourIpHere:1337/goals', parameters).then(async function (response) {
        let data = response.data;
        if (!data.created) {
            Alert.alert(
                'Error al crear la meta'
            )
        } else {
            Alert.alert('Se ha creado la meta')
        }
    }).catch(function (error) {
        console.log(error);
    });
};
<<<<<<< HEAD


async function getUser() {
    const value = await AsyncStorage.getItem('user');
    const loggedUser = JSON.parse(value);
    //console.log(loggedUser.id);
    try {
        const response = await axios.get('http://InsertYourIpHere:1337/users', {
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
=======
>>>>>>> 9965c42ae5e9b9758c7e566ff9f50e4b31ea348d

async function pre_add(goal) {
    const user = await getUser();
    parameters.userId = user.id;
    parameters.type = goal.tipo;
    parameters.goal = goal.valor;
    addGoal(parameters);
}

export default class AddMeta extends React.Component {
    constructor(props) {
        super(props);
<<<<<<< HEAD
        this.state={
            type:'',
            goal:'',
            userId:''
=======
        this.state = {
            tipo: '',
            valor: ''
>>>>>>> 9965c42ae5e9b9758c7e566ff9f50e4b31ea348d
        }
    }


<<<<<<< HEAD

    

    validate(text,type){
=======
    /*validate(text,type){
>>>>>>> 9965c42ae5e9b9758c7e566ff9f50e4b31ea348d
        namevalidation=/^[a-zA-Z]+$/
        descriptionvalidation=/^[a-zA-Z]+$/
        if(type=='name'){
            if(namevalidation.test(text)){
                this.setState({
                    nameValdate:true,
                })
                console.warn("text is correct")
            }else{
                this.setState({
                    nameValdate:false,
                })
                console.warn("invalid text")
            }
        }else  if(type=='description'){
            if(descriptionvalidation.test(text)){
                this.setState({
                    descriptionValdate:true,
                })
                console.warn("text is correct")
            }else{
                this.setState({
                    descriptionValdate:false,
                })
                console.warn("invalid text")
            }
        }
    }*/

    renderForm = () => {
        return (
            <KeyboardAvoidingView>
<<<<<<< HEAD
            <Block flex style ={styles.group}>
                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Nombre</Text>
                </Block>
                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Ingrese su Meta (0 para bajar de peso, 1 para tomar más agua, 2 para dormir más horas...)</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese su Meta" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.type =value}
//                        onChangeText={(text) => this.validate(text,"name")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.nameValdate?styles.error:null]}
                    />
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese el valor deseado" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.goal =value}
//                        onChangeText={(text) => this.validate(text,"name")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.nameValdate?styles.error:null]}
                    />
=======
                <Block flex style={styles.group}>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Tipo</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <ModalDropdown options={['Agua', 'Pasos', 'Peso', 'Horas de Sueño']}
                            onSelect={(index) => this.setState({ tipo: index })}
                            textStyle={{ fontSize: 17 }}
                            defaultValue={"Seleccione el tipo de meta"} />
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Text>{"\n\n"}</Text>
                        <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>Valor</Text>
                    </Block>
                    <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                        <Input right placeholder="Ingrese valor de la meta"
                            placeholderTextColor={materialTheme.COLORS.DEFAULT}
                            color={materialTheme.COLORS.ICON}
                            onChangeText={(value) => this.state.valor = value}
                            style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        />
                    </Block>
>>>>>>> 9965c42ae5e9b9758c7e566ff9f50e4b31ea348d
                </Block>
            </KeyboardAvoidingView>
        )
    }

    renderButton = () => {
        const { navigation } = this.props;
        return (
            //getUser(),
            <Block flex>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Block center>
                        <Text>{"\n"}</Text>
                        <Button
                            shadowless style={[styles.button, styles.shadow]}
                            onPress={() => pre_add(this.state)}
                        >
                            Crear Meta
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