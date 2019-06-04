import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Profile';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import SettingsScreen from '../screens/Settings';
import SignUpScreen from '../screens/SignUp';
import LoginScreen from '../screens/Login';
import FoodsScreen from '../screens/Foods';
import WaterScreen from '../screens/Water';
import StepsScreen from '../screens/Steps';
import WeightScreen from '../screens/Weight';
import Hours_SleepScreen from '../screens/Hours_Sleep';
import PerfileScreen from '../screens/Perfiles';
import AddFoodScreen from '../screens/AddFood';
import perfilNutriScreen from '../screens/perfilNutri';
import Appointments from '../screens/Appointments'
import AddAppointment from '../screens/AddAppointment'
import EditDelAppointment from '../screens/EditDelAppointment'

import Menu from './Menu';
import Header from '../components/Header';
import { Drawer } from '../components/';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth

    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const ProfileStack = createStackNavigator({
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Profile" navigation={navigation} />,
      headerTransparent: true,
    })
  },
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  })

const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  })
const SignUpStack = createStackNavigator({
  SignUp: {
    screen: SignUpScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  }
)
/* const LoginStack = createStackNavigator({
  Login: {
    screen: LoginScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="Log in" navigation={navigation} />
    })
  }
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  })*/

const ComponentsStack = createStackNavigator({
  Components: {
    screen: ComponentsScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Diario" navigation={navigation} />,
    })
  },
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  })

const AppointmentsStack = createStackNavigator({
  Appointments: {
    screen: Appointments,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  })

const HomeStack = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header search tabs title="Home" navigation={navigation} />,
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  },
  perfilNutri: {
    screen: perfilNutriScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="About the nutritionist" navigation={navigation} />,
    })
  },
  AddAppointment: {
    screen: AddAppointment,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Agua" navigation={navigation} />,
    })
  },
  EditDelAppointment: {
    screen: EditDelAppointment,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Agua" navigation={navigation} />,
    })
  },
  Water: {
    screen: WaterScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Agua" navigation={navigation} />,
    })
  },
  Steps: {
    screen: StepsScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Pasos" navigation={navigation} />,
    })
  },
  Weight: {
    screen: WeightScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Peso" navigation={navigation} />,
    })
  },
  Hours_Sleep: {
    screen: Hours_SleepScreen,
    navigationOptions: ({ navigation }) => ({
      header: null,
    })
  },
  Components: {
    screen: ComponentsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Diario" navigation={navigation} />,
    })
  },
  Appointments: {
    screen: Appointments,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Citas" navigation={navigation} />,
    })
  },
  /*Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Profile" navigation={navigation} />,
      headerTransparent: true,
    })
  },*/
  Perfil: {
    screen: PerfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Perfil" navigation={navigation} />
    })
  }
},
  {
    cardStyle: {
      backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
    },
    transitionConfig,
  });

const AppStack = createDrawerNavigator(
  {
    Onboarding: {
      screen: OnboardingScreen,
      navigationOptions: {
        drawerLabel: () => { },
      },
    },
    Profile: {
      screen: PerfileScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Perfil" />
        ),
      }),
    },

    perfilNutri: {
      screen: perfilNutriScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="perfilNutri" title="About" />
        ),
      }),
    },
    Components: {
      screen: ComponentsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Components" title="Diario" />
        ),
      }),
    },
    Appointments: {
      screen: AppointmentsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Appointments" title="Citas" />
        ),
      }),
    },
    Foods: {
      screen: FoodsScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Foods" />
        ),
      }),
    },
    AddFood: {
      screen: AddFoodScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="AddFood " title="Food+" />
        ),
      }),
    },
    Settings: {
      screen: SettingsScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Settings" title="Settings" />
        ),
      }),
    }
  },
);

export default createStackNavigator(
  {
    App: AppStack,
    Home: HomeStack,
    Login: LoginStack,
    SignUp: SignUpStack
  },
  {
    initialRouteName: 'App',
  }
);

