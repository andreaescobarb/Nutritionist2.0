import React from 'react';
import axios from 'axios';
import { StyleSheet, Switch, Platform, TouchableOpacity, ScrollView, Image, View, Dimensions, Alert } from "react-native";
import { Block, Text, theme, Icon, Input, Button } from "galio-framework";
import materialTheme from '../constants/Theme';

const { width } = Dimensions.get('screen');


let parameters = {
  name: '',
  description: ''
};

let AddTags = async () => {
  axios.post('http://192.168.100.15:1337/tags', parameters).then(async function (response) {
    let data = response.data;
    if (!data.created) {
      Alert.alert(
        'Error al crear tag'
      )
    } else {
      Alert.alert(
        'Tag creado exitosamente'
      )
      const value = await AsyncStorage.setItem('tag', JSON.stringify(tags));
      //nnavigation.navigation('Login')
    }
  }).catch(function (error) {
    console.log(error);
  });
};


export default class Tags extends React.Component {
  renderForm = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text>Tags</Text>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input right placeholder="Ingresar nombre de tag"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            color={materialTheme.COLORS.ICON}
            style={{ boderRadius: 3, borderColor: materialTheme.COLORS.INPUT }}
            onChangeText={(value) => parameters.name = value}
          />
        </Block>

        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Text style={{ marginBottom: theme.SIZES.BASE / 2 }}>Descripción</Text>
        </Block>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Input right placeholder="Ingresar descripción del tag"
            placeholderTextColor={materialTheme.COLORS.DEFAULT}
            color={materialTheme.COLORS.ICON}
            onChangeText={(value) => parameters.description = value} s
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
              onPress={() => AddTags(Alert)}>
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