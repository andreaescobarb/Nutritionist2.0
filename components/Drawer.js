import React from 'react';
import { StyleSheet } from 'react-native';
import { Block, Text, theme } from "galio-framework";

import Icon from './Icon';
import materialTheme from '../constants/Theme';

const proScreens = [];

class DrawerItem extends React.Component {
  renderIcon = () => {

    const { title, focused } = this.props;
    switch (title) {
      case 'Perfil':
        return (
          <Icon
            size={20}
            name="users-wm"
            family="Galio"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'About':
        return (
          <Icon
            size={20}
            name="question"
            family="AntDesign"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Diario':
        return (
          <Icon
            size={20}
            name="ios-stats"
            family="Ionicons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Crear Cita':
        return (
          <Icon
            size={20}
            name="ios-add"
            family="Ionicons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Citas':
        return (
          <Icon
            size={20}
            name="view-agenda"
            family="MaterialIcons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Foods':
        return (
          <Icon
            size={20}
            name="food"
            family="MaterialCommunityIcons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Crear Comida':
        return (
          <Icon
            size={20}
            name="ios-add"
            family="Ionicons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Crear Meta':
        return (
          <Icon
            size={20}
            name="ios-add"
            family="Ionicons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Editar Comida':
        return (
          <Icon
            size={20}
            name="edit"
            family="AntDesign"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Datos Nutricionales':
        return (
          <Icon
            size={20}
            name="ios-add"
            family="Ionicons"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Tags':
        return (
          <Icon
            size={20}
            name="tags"
            family="AntDesign"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'List Tags':
        return (
          <Icon
            size={20}
            name="list"
            family="Entypo"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      case 'Settings':
        return (
          <Icon
            size={20}
            name="flower-06"
            family="Galio"
            color={focused ? 'white' : materialTheme.COLORS.MUTED} />
        );
      default:
        return null;
    }
  }

  renderLabel = () => {
    const { title } = this.props;

    return null;
  }

  render() {
    const { focused, title } = this.props;
    const proScreen = proScreens.includes(title);
    return (
      <Block flex row style={[styles.defaultStyle, focused ? [styles.activeStyle, styles.shadow] : null]}>
        <Block middle flex={0.1} style={{ marginRight: 28 }}>
          {this.renderIcon()}
        </Block>
        <Block row center flex={0.9}>
          <Text size={18} color={focused ? 'white' : proScreen ? materialTheme.COLORS.MUTED : 'black'}>
            {title}
          </Text>
          {this.renderLabel()}
        </Block>
      </Block>
    );
  }
}

export default DrawerItem;

const styles = StyleSheet.create({
  defaultStyle: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  activeStyle: {
    backgroundColor: materialTheme.COLORS.ACTIVE,
    borderRadius: 4,
  },
  shadow: {
    shadowColor: theme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowRadius: 8,
    shadowOpacity: 0.2
  },
  pro: {
    backgroundColor: materialTheme.COLORS.LABEL,
    paddingHorizontal: 6,
    marginLeft: 8,
    borderRadius: 2,
    height: 16,
    width: 36,
  },
})