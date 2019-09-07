import React from 'react';
import axios from 'axios';
import { View, ImageBackground, Alert, StyleSheet, Image, StatusBar, Dimensions, ScrollView, Platform, KeyboardAvoidingView, AsyncStorage} from 'react-native';
import { Button, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';

import Tags from "react-native-tags";
const { height, width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
//import ProgressBarAnimated from 'react-native-progress-bar-animated';



export default class Progress extends React.Component {

    state = {
            name: '',
            listEntries: [],
            lastname: '',
            progress: 20,
            key: 0, 
            value: 0,
        };
    increase = (key, value) => {
        this.setState({
          [key]: this.state[key] + value,
        });
      }

    renderForm = () => {
        const { navigation } = this.props;

        return (

        <Block flex style={styles.container}>
        <StatusBar barStyle="light-content" />
            <Block flex center>
                {this.renderentries(this.state.listEntries)}
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
                </ScrollView>
            </Block>
        );
    }

    renderentries = (listEntries) =>{
        //const { navigation } = this.props;
        listEntries.map(listEntry =>{
            return(
                <Text >
                    {listEntry.water}
                </Text>
            );
        });
    };

    async componentDidMount() {
        const value = await AsyncStorage.getItem('user');
        const loggedUser = JSON.parse(value);
        console.log("user" + loggedUser.id);
        const id = loggedUser.id;
        console.log("http://192.168.100.15:1337/entries?userId=" +id);
        fetch("http://192.168.100.15:1337/entries?userId=" +id, {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        })
          .then(response => response.json())
          .then(responseJson => {
            //let tagMap = {};
            if (!responseJson) {
              responseJson = [];
              console.log(JSON.stringify(responseJson));
            }
            /*responseJson.forEach(function(item) {
              tagMap[item.id] = item.tags.map(function(tag) {
                return tag.name + " "});
            });*/
            this.setState({ entries: responseJson });
            //this.setState({ tagMap: tagMap });
            responseJson.forEach(function (item) {
              //tagMap[item.id] = item.tag.map(function(tag) {return tag.name + " "});
            });
            this.setState({ listEntries: responseJson });
            //this.setState({ tagMap: tagMap });
            var highestId = Math.max.apply(Math,this.state.listEntries.map(function(o){return o.water;}));

            console.log('hhkjhg:', highestId)
          })
          .catch(error => {
            console.error(error);
          });
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
    },
    buttonContainer: {
        marginTop: 15,
      },
      separator: {
        marginVertical: 30,
        borderWidth: 0.5,
        borderColor: '#DCDCDC',
      },
      label: {
        color: '#999',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 10,
      }
})
