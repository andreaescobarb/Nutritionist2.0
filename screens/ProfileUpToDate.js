import React from 'react';
import { StyleSheet, Switch, Platform, TouchableOpacity, ScrollView, Image, View, Button } from "react-native";
import { Block, Text, theme, Icon } from "galio-framework";
import materialTheme from '../constants/Theme';

export default class ProfileUpToDate extends React.Component{
    render(){
        return(
            <View>
                
            </View>
            
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