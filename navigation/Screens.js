import React from 'react';
import { Easing, Animated, Platform } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation';

import { Block, Text, theme } from "galio-framework";

import ComponentsScreen from '../screens/Components';
import HomeScreen from '../screens/Components';
import OnboardingScreen from '../screens/Onboarding';
import ProfileScreen from '../screens/Components';
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
import AddGoalScreen from '../screens/AddMetas';
import nutriProfileScreen from '../screens/nutriProfile';
import EditFoodScreen from '../screens/EditFood';
import DeleteFoodScreen from '../screens/DeleteFood';
import AddAppointmentScreen from '../screens/AddAppointment';
import EditDelAppointment from '../screens/EditDelAppointment';
import ListAppointments from '../screens/ListAppointments';
import TagScreen from '../screens/Tags';
import EditTagScreen from '../screens/EditTags';
import DeleteTagScreen from '../screens/DeleteTags';
import ListTagScreen from '../screens/ListTags';
import TagstoFoods from '../screens/TagstoFoods';
import Diario from '../screens/Diario';
import NutritionalFactsScreen from '../screens/DatosNutricionales'

import Menu from './Menu';
import Header from '../components/Header';
import { Drawer } from '../components/';
import TagsScreen from '../screens/Tags';

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
    screen: Diario,
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
    screen: ListAppointments,
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
      //header: <Header search tabs title="Home" navigation={navigation} />,
    })
  },
  Settings: {
    screen: SettingsScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="Settings" navigation={navigation} />,
    })
  },
  nutriProfile: {
    screen: nutriProfileScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="About the nutritionist" navigation={navigation} />,
    })
  },

  ListTags: {
    screen: ListTagScreen,
    navigationOptions: ({ navigation }) => ({
      header: <Header back title="Listar Tags" navigation={navigation} />
    })
  },
  TagstoFoods: {
    screen: TagstoFoods,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  },
  AddAppointment: {
    screen: AddAppointmentScreen,
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
  /*ListAppointments: {
    screen: ListAppointments,
    navigationOptions: ({ navigation }) => ({
      header: null
      //<Header back title="Agua" navigation={navigation} />,
    })
  }*/
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
    screen: Diario,
    navigationOptions: ({ navigation }) => ({
      header: <Header title="Diario" navigation={navigation} />,
    })
  },

  ListAppointments: {
    screen: ListAppointments,
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
  Perfiles: {
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
    Prefile: {
      screen: PerfileScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Perfiles" title="Perfil" />
        ),
      }),
    },
    nutriProfile: {
      screen: nutriProfileScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="nutriProfile" title="About" />
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
    AddAppointment: {
      screen: AddAppointmentScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="AddAppointment" title="Crear Cita" />
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
          <Drawer focused={focused} screen="Foods" title="Foods" />
        ),
      }),
    },
    AddFood: {
      screen: AddFoodScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="AddFood " title="Crear Comida" />
        ),
      }),
    },
    AddGoal: {
      screen: AddGoalScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="AddGoal " title="Crear Meta" />
        ),
      }),
    },
    EditFood: {
      screen: EditFoodScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="EditFood " title="Editar Comida" />
        ),
      }),
    },
    DatosNutricionales: {
      screen: NutritionalFactsScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="NutritionalFacts" title="Datos Nutricionales" />
        ),
      }),
    },
    /*DeleteFood: {
      screen: DeleteFoodScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="DeleteFood" title="Eliminar Comida" />
        )
      })
    },*/
    Tags: {
      screen: TagScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Tags" title="Tags" />
        ),
      }),
    },

    ListTags: {
      screen: ListTagScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="ListTag" title="List Tags" />
        ),
      })
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

