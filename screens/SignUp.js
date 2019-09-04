import React from 'react';
import axios from 'axios';

import { StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Alert} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let parameters = {
    name: '',
    username: '',
    password: '',
    lastname: ''
};


let signUp = async ()  =>{
    axios.get('http://InsertYourIpHere:1337/users', {
        params:{ 
            username: parameters.username
        }
    },  { 
        headers: {
            'Accept': 'application/json'
        }
    }).then(async function(response) {
        let user = response.data[0];
        if (!user) {
            axios.post('http://InsertYourIpHere:1337/users', parameters).then(async function(response) {
                let data = response.data;
                if (!data.created) {
                    Alert.alert(
                        'Error al crear usuario'
                    )
                } else {
                    Alert.alert(
                        'Usuario creado exitosamente'
                    )
                    navigation.navigation('Onboarding')
                }
                }).catch(function(error) {
                    console.log(error);
                });
        } else {
            Alert.alert(
                'El usuario ya existe'
                )
        }
    }).catch(function(error) {
        console.log(error);
    });
};


export default class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            nameValdate:true,
            lastname:'',
            lastnameValdate:true,
            username:'',
            usernameValdate:true,
            password:'',
            passwordValdate:true,
        }
    }
    validate(text,type){
        namevalidation=/^[a-zA-Z]+$/
        lastnamevalidation=/^[a-zA-Z]+$/
        usernamevalidation=/^[a-zA-Z0-9@._-]+$/
        passwordvalidation=/^[a-zA-Z0-9]+$/
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
        }else  if(type=='lastname'){
            if(lastnamevalidation.test(text)){
                this.setState({
                    lastnameValdate:true,
                })
                console.warn("text is correct")
            }else{
                this.setState({
                    lastnameValdate:false,
                })
                console.warn("invalid text")
            }
        }else  if(type=='username'){
            if(usernamevalidation.test(text)){
                this.setState({
                    usernameValdate:true,
                })
                console.warn("text is correct")
            }else{
                this.setState({
                    usernameValdate:false,
                })
                console.warn("invalid text")
            }
        }else  if(type=='password'){
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
    renderForm=()=>{
        const {navigation}= this.props;
        return(
            <KeyboardAvoidingView>
                <Block flex style ={styles.group}>
                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Nombre</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese Nombre" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.name =value}
//                        onChangeText={(text) => this.validate(text,"name")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.nameValdate?styles.error:null]}
                    />
                </Block>

                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Apellido</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese Apellido" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.lastname =value}
//                        onChangeText={(text) => this.validate(text,"lastname")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.lastnameValdate?styles.error:null]}
                    />
                </Block>
                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Correo</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Correo" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.username =value}   
//                        onChangeText={(text) => this.validate(text,"username")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.usernameValdate?styles.error:null]}
                    />
                </Block>

                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Contraseña</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Contraseña" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.password =value}   
//                        onChangeText={(text) => this.validate(text,"password")}   
                        password={true}
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.passwordValdate?styles.error:null]}
                    />
                </Block>
            </Block>
         </KeyboardAvoidingView>
   
        )
        
    }

    renderButton = () =>{
        const { navigation } = this.props;
        return(
        <Block flex>
            <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                <Block center>
                    <Button 
                    shadowless style={[styles.button, styles.shadow]} 
                    onPress={() =>signUp(Alert)}>
                        Crear Cuenta
                    </Button>
                </Block>
            </Block>
        </Block>
       )
    }

    render(){
        return(
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
    components:{

    },
    title:{
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE *2,
    },
    group:{
        paddingTop: theme.SIZES.BASE * 3.75,
        color: 'black'
    },
    shadow:{
        shadowColor:'black',
        shadowOffset:{width:0,height:2},
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
      error:{
        borderWidth:2,
        borderColor:'red'
    }

})