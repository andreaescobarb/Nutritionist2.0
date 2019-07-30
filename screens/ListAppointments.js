import React from 'react';
import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Button as Btn, Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { AppRegistry, View, Image, TouchableOpacity } from 'react-native';
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
import Tags from "react-native-tags";
import { Card, Button } from 'react-native-elements';
import axios from 'axios';

/*let parameters = {
    id,
    ID,
    Patient_ID,
    Nutritionist_ID,
    Date,
    Time,
    PatientData
};
*/
export default class ListAppointments extends React.Component {
    state = {
        appointments: [
            {
                "id": "1",
                "ID": "1",
                "Patient_ID": "1",
                "Nutritionist_ID": "1",
                "Date": "28/07/2019",
                "Time": "8:00 AM",
                "PatientData": "Overweight",
                "createdAt": "2019-07-24T03:40:41.911Z",
                "updatedAt": "2019-07-24T03:40:41.911Z"
            },
            {
                "id": "2",
                "ID": "2",
                "Patient_ID": "2",
                "Nutritionist_ID": "1",
                "Date": "29/07/2019",
                "Time": "9:00 AM",
                "PatientData": "Undernourishment",
                "createdAt": "2019-07-24T03:40:41.911Z",
                "updatedAt": "2019-07-24T03:40:41.911Z"
            },
            {
                "id": "3",
                "ID": "3",
                "Patient_ID": "1",
                "Nutritionist_ID": "1",
                "Date": "30/07/2019",
                "Time": "8:00 AM",
                "PatientData": "Overweight",
                "createdAt": "2019-07-24T03:40:41.911Z",
                "updatedAt": "2019-07-24T03:40:41.911Z"
            }
        ],
        tagMap: {}
    };

    /*renderForm = () => {
        const { navigation } = this.props;
        return (
            <Block flex style={styles.group}>
                {this.renderFoods(this.state.foods)}
            </Block> 
        )
    }

    handleDelete = (foodId) => {
            const currentFoods = this.state.foods;
        
            // Remove deleted item from state.
            this.setState({
              foods: currentFoods.filter(food => food.id !== foodId),
            });

        console.log(foodId);
        axios.delete('https://nutrionist-server.herokuapp.com/foods', {
            data: { id: foodId }
           }).then(response => {
            if (response.status === 'error') {
                this.setState({
                  foods: currentFoods,
                });
              } else {
              }
          })
    };

    handleEdit = (navigation, food) => {
        //navigation.navigate('EditFood')
        navigation.navigate('EditFood', {foodId: food})
    };
*/
    renderAppointments = (appointments) => {
        const { navigation } = this.props;
        return appointments.map((appointment) => {
            if (appointment.Patient_ID == 1) {
                return (
                    <Card title={appointment.date}>
                        <Text style={{ marginBottom: 5 }}>
                            {appointment.Date + " " + appointment.Time}
                        </Text>
                        <Button
                            onPress={() => navigation.navigate('AddAppointment')}
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Editar' />
                        <Text>
                            {"\n"}
                        </Text>
                        <Button
                            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                            title='Eliminar' />
                    </Card>)
            }
        })
    }

    render() {
        const { navigation } = this.props;
        return (
            <Block>
                <ScrollView>
                    <Button
                        onPress={() => navigation.navigate('AddAppointment')}
                        buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
                        title='Agregar cita' />
                    {this.renderAppointments(this.state.appointments)}
                </ScrollView>
            </Block>
        );
    }

    /*componentDidMount() {
        fetch('http://localhost:1337/appointments', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            },
        }).then((response) => response.json())
            .then((responseJson) => {

                let tagMap = {};

                if (!responseJson) {
                    responseJson = [];
                }

                responseJson.forEach(function (item) {
                    tagMap[item.id] = item.tags.map(function (tag) { return tag.date + " " });
                });


                this.setState({ appointments: responseJson });
                this.setState({ tagMap: tagMap });
            })
            .catch((error) => {
                console.error(error);
            });
    }*/
}


const styles = StyleSheet.create({
    components: {

    },
    title: {
        paddingVertical: theme.SIZES.BASE,
        paddingHorizontal: theme.SIZES.BASE * 2,
    },
    group: {
        paddingTop: 20
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

})