import React from 'react';
import { StyleSheet, Dimensions, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Block, Text, Input, theme } from 'galio-framework';
import { responsiveHeight, responsiveWidth, responsiveFontSize } from 'react-native-responsive-dimensions';
import { AppRegistry, View, Image, TouchableOpacity, Alert } from 'react-native';
const { width } = Dimensions.get('screen');
import { materialTheme } from '../constants';
import Tags from "react-native-tags";
import { Card, Button, Icon } from 'react-native-elements';
import axios from 'axios';

let parameters = {
    id: ''
};

export default class Foods extends React.Component {
    state = {
        foods: [],
        tagMap: {}
    };

    renderForm = () => {
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
        axios.delete('http://InsertYourIpHere:1337/foods', {
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
        navigation.navigate('EditFood', { foodId: food })

    };

    handleNutritionalFacts = (navigation, food) => {
        //navigation.navigate('EditFood')
        navigation.navigate('DatosNutricionales', { foodId: food })

    };

    viewNutritionalFacts = (navigation, food) => {
        //navigation.navigate('EditFood')
        navigation.navigate('ViewDatosNutricionales', { foodId: food })

    };

    handleTagstoFoods = (navigation, food) => {
        navigation.navigate('TagstoFoods', { foodId: food })
    };

    renderFoods = (foods) => {
        const { navigation } = this.props;

        return foods.map((food) => {
            return (
                <Card
                    title={food.name}
                    image={{ uri: 'https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.foodandwine.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Fmedium_2x%2Fpublic%2Fbuying-healthy-foods-ft-blog0617.jpg' }}>
                    <Text style={{ marginBottom: 5 }}>
                        {food.description}
                    </Text>
                    <Tags readonly
                        initialTags={this.state.tagMap[food.id]}
                    />
                    <View style={{ flex: 1, flexDirection: "row" }}>
                        <Button icon={{ name: "pencil", type: "material-community", color: "white", size: 16 }} title="Editar Comida" containerStyle={{ width: "50%", marginRight: "2%" }} buttonStyle={[styles.button, styles.shadow]}
                            onPress={() => this.handleEdit(navigation, food.id)} />
                        <Button icon={{ name: "delete", type: "material-community", color: "white", size: 16 }} title="Eliminar Comida" containerStyle={{ width: "50%" }} buttonStyle={[styles.button, styles.shadow]}
                            onPress={() => this.handleDelete(food.id)} />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>

                        <Button icon={{ name: "tag", type: "material-community", color: "white", size: 16 }} title="Agregar Tags" containerStyle={{ width: "50%", marginRight: "2%" }} buttonStyle={[styles.button, styles.shadow]}
                            onPress={() => this.handleTagstoFoods(navigation, food.id)} />
                        <Button icon={{ name: "food-apple", type: "material-community", color: "white", size: 16 }} title="Datos Nutricionales" containerStyle={{ width: "50%" }} buttonStyle={[styles.button, styles.shadow]}
                            onPress={() => this.handleNutritionalFacts(navigation, food.id)} />
                    </View>
                    <View style={{ flex: 1, flexDirection: "row" }}>
                            <Button icon={{ name: "food-apple", type: "material-community", color: "white", size: 16 }} title="Datos Nutricionales" containerStyle={{ width: "50%" }} buttonStyle={[styles.button, styles.shadow]}
                            onPress={() => this.viewNutritionalFacts(navigation, food.id)} />
                    </View>

                </Card>
            )
        })
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

    componentDidMount() {
        fetch('http://InsertYourIpHere:1337/foods', {
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
                    tagMap[item.id] = item.tags.map(function (tag) { return tag.name + " " });
                });


                this.setState({ foods: responseJson });
                this.setState({ tagMap: tagMap });
            })
            .catch((error) => {
                console.error(error);
            });
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
        backgroundColor: materialTheme.COLORS.PRIMARY
        // width: width - (theme.SIZES.BASE * 2),
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