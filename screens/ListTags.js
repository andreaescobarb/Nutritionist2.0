import React from "react";
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
    tagMap: {}
  };

  renderForm = () => {
    const { navigation } = this.props;
    return (
      <Block flex style={styles.group}>
        {this.renderTags(this.state.listtags)}
      </Block>
    );
  };

  renderTags = listtags => {
    return listtags.map(listtag => {
      return (
        <Card
          title={listtag.name}
          image={{
            uri:
              "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.betterhealth.vic.gov.au%2F-%2Fmedia%2Fbhc%2Fimages%2Fslideshow%2Fhealthy-snacking-tips%2F8-colour_24199230_1050x600.jpg&imgrefurl=https%3A%2F%2Fwww.betterhealth.vic.gov.au%2Fhealth%2Fhealthyliving%2Ffood-variety-and-a-healthy-diet&docid=wvHGsoMmYIjm7M&tbnid=GJxWFBxdTe8eOM%3A&vet=10ahUKEwih68_F7driAhUruVkKHb7mD6sQMwhSKAAwAA..i&w=1050&h=590&bih=625&biw=1366&q=healthy%20food&ved=0ahUKEwih68_F7driAhUruVkKHb7mD6sQMwhSKAAwAA&iact=mrc&uact=8"
          }}
        >
          <Text style={{ marginBottom: 5 }}>{listtag.description}</Text>
          <Tags
            initialTags={this.state.tagMap[listtag.id]}
            renderTag={({
              tag,
              index,
              onPress,
              deleteTagOnPress,
              readonly
            }) => (
              <TouchableOpacity key={`${tag}-${index}`} onPress={onPress}>
                <Text>{tag}</Text>
              </TouchableOpacity>
            )}
          />
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
    fetch("https://nutrionist-server.herokuapp.com/tags", {
      method: "GET",
      headers: {
        Accept: "application/json"
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        let tagMap = {};
        if (!responseJson) {
          responseJson = [];
        }
        responseJson.forEach(function(item) {
          tagMap[item.id] = item.tag.map(function(tag) {
            return tag.name + " "});
        });
        this.setState({ listtags: responseJson });
        this.setState({ tagMap: tagMap });
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
