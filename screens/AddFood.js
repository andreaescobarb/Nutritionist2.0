import React from 'react';
import axios from 'axios';

import { Image, View } from 'react-native';
import { ImagePicker, Permissions, Constants} from 'expo';
import { StyleSheet, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage, Alert } from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';

let parameters = {
    name: '',
    description: '',
    image: '',
    nutritionalFacts: ''
};

let addFood = async ()  =>{
    axios.post('http://192.168.1.134:1337/foods', parameters).then(async function(response) {
        let data = response.data;
            Alert.alert(
                'Nueva comida creada...'
            )
            const value = await AsyncStorage.setItem('food',JSON.stringify(foods));
            navigation.navigation('login')
        
    }).catch(function(error) {
        console.log(error);
    });
};


export default class AddFood extends React.Component{
    constructor(props){
        super(props);
        this.state={
            name:'',
            nameValdate:true,
            description:'',
            descriptionValdate:true,
            image: '',
            nutritionalFacts : '',
            factsValdate:true,
        }
    }
    state = {
        imagePicked: null,
      };

    validate(text,type){
        namevalidation=/^[a-zA-Z]+$/
        descriptionvalidation=/^[a-zA-Z]+$/
        factsvalidation=/^[a-zA-Z]+$/
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
        }else  if(type=='nutritionalFacts'){
          if(factsvalidation.test(text)){
              this.setState({
                  factsValdate:true,
              })
              console.warn("text is correct")
          }else{
              this.setState({
                  factsValdate:false,
              })
              console.warn("invalid text")
          }
      }
    } 

    renderForm=()=>{
        const {navigation}= this.props;
        let { imagePicked } = this.state;
        return(
            <KeyboardAvoidingView>
            <Block flex style ={styles.group}>
                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Nombre</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese Nombre de Comida" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.name =value}
//                        onChangeText={(text) => this.validate(text,"name")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.nameValdate?styles.error:null]}
                    />
                </Block>

                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Descripción</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese Descripción de comida" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.description =value}
//                        onChangeText={(text) => this.validate(text,"description")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.descriptionValdate?styles.error:null]}
                    />
                </Block>
                <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Text h7 style ={{marginBottom: theme.SIZES.BASE/2}}>Datos Nutricionales</Text>
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese Datos Nutricionales de comida" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.nutritionalFacts =value}
//                        onChangeText={(text) => this.validate(text,"description")}   }
                    />
                </Block>
                <Block style={{paddingHorizontal: theme.SIZES.BASE}}>
                    <Input right placeholder="Ingrese URL de la imágen:" 
                        color={materialTheme.COLORS.ICON}
                        placeholderTextColor= {materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.image =value}
//                        onChangeText={(text) => this.validate(text,"description")}   
                        style={[{boderRadius: 3, borderColor: materialTheme.COLORS.INPUT},!this.state.factsValdate?styles.error:null]}
                    />
                </Block>
                {/*<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Button shadowless style={[styles.button, styles.shadow]} 
                    onPress={this._pickImage}>
                        Selecciona una imagen
                    </Button>
                    
                    {imagePicked &&
                    <Image source={{ uri: imagePicked }} style={{ width: 200, height: 200 }} />}
                </View>*/}
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
          this.setState({ imagePicked: result.uri});
          parameters.image = JSON.stringify(result.base64);
        }
      };

    renderButton = () =>{
        const { navigation } = this.props;
        return(
        <Block flex>
            <Block style ={{paddingHorizontal: theme.SIZES.BASE}}>
                <Block center>
                    <Button 
                    shadowless style={[styles.button, styles.shadow]} 
                    onPress={() =>addFood(navigation)}>
                        Crear Comida
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