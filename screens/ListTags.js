import React from "react";
import axios from 'axios';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView
} from "react-native";
import { Button, Block, Text, Input, theme } from "galio-framework";
import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize
} from "react-native-responsive-dimensions";
import { AppRegistry, View, Image, TouchableOpacity } from "react-native";
const { width } = Dimensions.get("screen");
import { materialTheme } from "../constants";
import Tags from "react-native-tags";
import { Card } from "react-native-elements";

export default class ListTags extends React.Component {
  state = {
    listtags: [],
    tagMap: {},
    tagId: ''
  };

  renderForm = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        {this.renderTags(this.state.listtags)}
      </Block>
    );
  };

  handleDelete = (tagId) => {

    // state, before delete anything
    const currentTags = this.state.listtags;

    // Remove deleted item from state.
    this.setState({
      listtags: currentTags.filter(tag => tag.id !== tagId),
    });

console.log(tagId);
axios.delete('http://localhost:1337/tags', {
    data: { id: tagId }
   }).then(response => {
    if (response.status === 'error') {
        this.setState({
          tags: currentTags,
        });
      } else {
      }
  })
};

handleEdit = (tagId) => {

  // state, before delete anything
  const currentTags = this.state.listtags;
  const { navigation } = this.props;
 

  navigation.navigate('EditTag')
};

  renderTags = listtags => {
    return listtags.map(listtag => {
      return (
        <Card title={listtag.name}>
          <Text style={{ marginBottom: 5 }}>{listtag.description}</Text>
          <Button style={styles.button} onPress={() => this.handleEdit(listtag.id)}> Editar</Button>
          <Button style={styles.button} onPress={() => this.handleDelete(listtag.id)}> Eliminar</Button>

        </Card>
      );
    });
  };

  render() {
    return (
      <Block flex center>
        <ScrollView
          style={styles.components}
          showsVerticalScrollIndicator={false}
        >
          {this.renderForm()}
        </ScrollView>
      </Block>
    );
  }

  componentDidMount() {
    fetch("http://localhost:1337/tags", {
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
        }
        /*responseJson.forEach(function(item) {
          tagMap[item.id] = item.tags.map(function(tag) {
            return tag.name + " "});
        });*/
        this.setState({ tags: responseJson });
        //this.setState({ tagMap: tagMap });
        responseJson.forEach(function(item) {
          //tagMap[item.id] = item.tag.map(function(tag) {return tag.name + " "});
        });
        this.setState({ listtags: responseJson });
        //this.setState({ tagMap: tagMap });
      })
      .catch(error => {
        console.error(error);
      });
  }
}

const styles = StyleSheet.create({
  components: {},
  title: {
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2
  },
  group: {
    paddingTop: 20
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
  }
});
