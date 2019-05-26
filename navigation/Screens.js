import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Home';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Profile';
import ProScreen from '../screens/Pro';
import SettingsScreen from '../screens/Settings';
import SignUpScreen from '../screens/SignUp';
import LoginScreen from '../screens/Login';
import FoodsScreen from '../screens/Foods';

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
      header: <Header back title="Components" navigation={navigation} />,
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
  Components: {
    screen: ComponentsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Components" navigation={navigation} />,
    })
  },
  Profile: {
    screen: ProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header white transparent title="Profile" navigation={navigation} />,
      headerTransparent: true,
    })
  },
  Pro: {
    screen: ProScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back white transparent title="" navigation={navigation} />,
      headerTransparent: true,
    })
  },
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
    Dashboard: {
      screen: HomeStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Home" title="Home" />
        ),
      }),
    },
    /* SignUp:{
       screen: SignUpScreen,
       navigationOptions: (navOpt) =>({
         drawerLabel: ({focused}) =>(
           <Drawer focused={focused} screen="OnboardingScreen" title="OnBoarding"/>
         ),
       })
     },*/
    Woman: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Woman" />
        ),
      }),
    },
    Man: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Man" />
        ),
      }),
    },
    Kids: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Kids" />
        ),
      }),
    },
    NewCollection: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="New Collection" />
        ),
      }),
    },
    Profile: {
      screen: ProfileStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Profile" title="Profile" />
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
    },
    Components: {
      screen: ComponentsStack,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Components" title="Components" />
        ),
      }),
    },
    MenuDivider: {
      screen: HomeStack,
      navigationOptions: {
        drawerLabel: () => <Block style={{ marginVertical: 8 }}><Text>{` `}</Text></Block>,
      },
    },
    SignIn: {
      screen: ProScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Sign In" />
        ),
      }),
    },
    /* SignUp: {
       screen: ProScreen,
       navigationOptions: (navOpt) => ({
         drawerLabel: ({focused}) => (
           <Drawer focused={focused} screen="Pro" title="Sign Up" />
         ),
       }),
     },*/

    Foods: {
      screen: FoodsScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Pro" title="Foods" />
        ),
      }),
    },
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

