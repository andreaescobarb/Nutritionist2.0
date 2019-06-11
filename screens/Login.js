import React from 'react';
import axios from 'axios';



import { StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView , AsyncStorage} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';



let parameters = {
    username: '',
    password: ''
};

let login = async function(navigation) {
    axios.get('https://nutrionist-server.herokuapp.com/users', {
        params:{ 
            username: parameters.username,
            password: parameters.password 
        }
    }, { 
        headers: {
            'Accept': 'application/json'
        }
    }).then(async function(response) {
        let user = response.data[0];
        if (!user) {
            Alert.alert(
                'Usuario no encontrado, favor registrarse.'
            )
        } else {
            const value = await AsyncStorage.setItem('user', JSON.stringify(user));
            navigation.navigate('Perfiles')
        }
    }).catch(function(error) {
        console.log(error);
    });
};
export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.state={
            name:'',
            nameValdate:true,
            password:'',
            passwordValdate: true,
        }
    }
    validate(text,type){
        uservalidation=/^[a-zA-Z0-9@._-]+$/
        passwordvalidation=/^[a-zA-Z0-9]+$/
        if(type=='username'){
            if(uservalidation.test(text)){
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
        }else if(type=='password'){
            if(passwordvalidation.test(text)){
                this.setState({
                    passwordValdate:true,
                })
                console.warn("text is correct")
            }else{
                this.setState({
                    passwordValdate:false,
                })
                console.warn("invalid text")
            }
        }
    }
    renderForm = () => {
        const { navigation } = this.props;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text >Ingresar Username</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Username"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT },!this.state.nameValdate?styles.error:null]}
                        onChangeText={(value) => parameters.username =value}   
                        /*onChangeText={(text)=>this.validate(text,'username')}*/
/>
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text  style={{ marginBottom: theme.SIZES.BASE / 2 }}>Ingrese Contraseña</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Contraseña"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        color={materialTheme.COLORS.ICON}
                        password={true}
                        onChangeText={(value) => parameters.password =value}
                        /*onChangeText={(text)=>this.validate(text,'password')}*/                        
                        style={[{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT },!this.state.passwordValdate?styles.error:null]}
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
                            onPress={() => login(navigation)}>
                            Ingresar
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
    Text:{
        fontSize: responsiveFontSize(2)
      },
      error:{
          borderWidth:2,
          borderColor:'red'
      }
    })