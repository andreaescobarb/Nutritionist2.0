import React from 'react';

import { StyleSheet, Alert, Dimensions, ScrollView, KeyboardAvoidingView , AsyncStorage} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';



let parameters = {
    name: '',
    description: ''
};

addFood = () => {
  axios.post('https://nutrionist-server.herokuapp.com/foods', {
    name: parameters.name,
    description: parameters.description
  })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
}

export default class AddFood extends React.Component {
    renderForm = () => {
        const { navigation } = this.props;
        return (
            <Block flex style={styles.group}>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text>Nombre de Comida</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar nombre de comida"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
                        onChangeText={(value) => parameters.name =value}   
                    />
                </Block>

                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Text  style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
                </Block>
                <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
                    <Input right placeholder="Ingresar descripción de comida"
                        placeholderTextColor={materialTheme.COLORS.DEFAULT}
                        onChangeText={(value) => parameters.description =value}                        s
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
                            onPress={this.addFood}
                            shadowless style={[styles.button, styles.shadow]}>
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
})