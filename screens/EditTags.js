import React from "react";
import axios from "axios";

import { Image, View } from "react-native";
import { ImagePicker, Permissions, Constants } from "expo";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
  AsyncStorage
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";

const { width } = Dimensions.get("screen");
import { materialTheme } from "../constants";

let parameters = {
  name: "",
  description: ""
};

let addTag = async () => {
  axios
    .post("http://InsertYourIpHere:1337/tags", parameters)
    .then(async function(response) {
      let data = response.data;
      if (data.created) {
        Alert.alert("Error al crear etiqueta");
      } else {
        Alert.alert("Nueva etiqueta creada...");
        const value = await AsyncStorage.setItem("tags", JSON.stringify(tags));
        navigation.navigation("login");
      }
    })
    .catch(function(error) {
      console.log(error);
    });
};

export default class EditTag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      nameValdate: true,
      description: "",
      descriptionValdate: true
    };
  }

  validate(text, type) {
    namevalidation = /^[a-zA-Z]+$/;
    descriptionvalidation = /^[a-zA-Z]+$/;
    if (type == "name") {
      if (namevalidation.test(text)) {
        this.setState({
          nameValdate: true
        });
        console.warn("text is correct");
      } else {
        this.setState({
          nameValdate: false
        });
        console.warn("invalid text");
      }
    } else if (type == "description") {
      if (descriptionvalidation.test(text)) {
        this.setState({
          descriptionValdate: true
        });
        console.warn("text is correct");
      } else {
        this.setState({
          descriptionValdate: false
        });
        console.warn("invalid text");
      }
    }
  }

  renderForm = () => {
    const { navigation } = this.props;
    return (
      <KeyboardAvoidingView>
        <Block flex style={StyleSheet.group}>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
              Nombre
            </Text>
          </Block>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="Ingrese la etiqueta"
              color={materialTheme.COLORS.ICON}
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              onChangeText={value => (parameters.name = value)}
              style={[
                { borderRadius: 3, borderColor: materialTheme.COLORS.INPUT },
                !this.state.nameValdate ? styles.error : null
              ]}
            />
          </Block>

          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Text h7 style={{ marginBottom: theme.SIZES.BASE / 2 }}>
              Descripción
            </Text>
          </Block>
          <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
            <Input
              right
              placeholder="Ingrese Descripción de la etiqueta"
              color={materialTheme.COLORS.ICON}
              placeholderTextColor={materialTheme.COLORS.DEFAULT}
              onChangeText={value => (parameters.description = value)}
              style={[
                { boderRadius: 3, borderColor: materialTheme.COLORS.INPUT },
                !this.state.descriptionValdate ? styles.error : null
              ]}
            />
          </Block>
        </Block>
      </KeyboardAvoidingView>
    );
  };

  renderButton = () => {
    const { navigation } = this.props;
    return (
      <Block flex>
        <Block style={{ paddingHorizontal: theme.SIZES.BASE }}>
          <Block center>
            <Button
              shadowless
              style={[styles.button, styles.shadow]}
              onPress={() => addTag(navigation)}
            >
              Crear Etiqueta
            </Button>
          </Block>
        </Block>
      </Block>
    );
  };

  render() {
    return (
      <Block flex center>
        <ScrollView
          style={styles.components}
          shadowVerticalScrollIndicator={false}
        >
          {this.renderForm()}
          {this.renderButton()}
        </ScrollView>
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  components: {},
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2
  },
  group: {
    paddingTop: theme.SIZES.BASE * 3.75,
    color: "black"
  },
  shadow: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.2,
    elevation: 2
  },
  button: {
    marginBottom: theme.SIZES.BASE,
    width: width - theme.SIZES.BASE * 2
  },
  optionsText: {
    fontSize: theme.SIZES.BASE * 0.75,
    color: "#4A4A4A",
    fontWeight: "normal",
    fontStyle: "normal",
    letterSpacing: -0.29
  },
  optionsButton: {
    width: "auto",
    height: 34,
    paddingHorizontal: theme.SIZES.BASE,
    paddingVertical: 10
  },
  input: {
    borderBottomWidth: 1
  },

  inputDefault: {
    borderBottomColor: materialTheme.COLORS.PLACEHOLDER
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY
  },
  inputTheme: {
    borderBottomColor: materialTheme.COLORS.PRIMARY
  },
  inputInfo: {
    borderBottomColor: materialTheme.COLORS.INFO
  },
  inputSuccess: {
    borderBottomColor: materialTheme.COLORS.SUCCESS
  },
  inputWarning: {
    borderBottomColor: materialTheme.COLORS.WARNING
  },
  inputDanger: {
    borderBottomColor: materialTheme.COLORS.ERROR
  },

  rows: {
    height: theme.SIZES.BASE * 2
  },
  error: {
    borderWidth: 2,
    borderColor: "red"
  }
});
