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
import ListAppointmentsUserScreen from '../screens/ListAppointmentsUser';
import WaterScreen from '../screens/Water';
import StepsScreen from '../screens/Steps';
import WeightScreen from '../screens/Weight';
import Hours_SleepScreen from '../screens/Hours_Sleep';
import PerfileScreen from '../screens/Perfiles';
import InicioScreen from '../screens/Inicio';
import AddFoodScreen from '../screens/AddFood';
import AddMetas from '../screens/AddMetas';
import nutriProfileScreen from '../screens/nutriProfile';
import EditFoodScreen from '../screens/EditFood';
import DeleteFoodScreen from '../screens/DeleteFood';
import AddAppointmentScreen from '../screens/AddAppointment';
import EditAppointmentScreen from '../screens/EditAppointment';
import ListAppointments from '../screens/ListAppointments';
import TagScreen from '../screens/Tags';
import EditTagScreen from '../screens/EditTags';
import DeleteTagScreen from '../screens/DeleteTags';
import ListTagScreen from '../screens/ListTags';
import TagstoFoods from '../screens/TagstoFoods';
import Diario from '../screens/Diario';
import NutritionalFactsScreen from '../screens/DatosNutricionales';
import ListUsers from '../screens/ListUsers';

//Las siguientes pantallas estrictamente hechas para que el usuario pueda visualizarlas desde su cuenta
import FoodsUser from '../screens/FoodsUser'
import TagsUser from '../screens/TagsUser';
import ListEntries from '../screens/ListEntries';
import Progress from '../screens/Progress';

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

const MainStack = createStackNavigator({
  Onboarding: {
    screen: OnboardingScreen,
    navigationOptions: ({ navigation }) => ({
      header: null
    })
  }
}, {
    cardStyle: { backgroundColor: '#EEEEEE', },
    transitionConfig,
  })

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
  EditAppointment: {
    screen: EditAppointmentScreen,
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
    Prefile: {
      screen: PerfileScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Perfiles" title="Perfil" />
        ),
      }),
    },
    Inicio: {
      screen: InicioScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Inicio" title="Inicio" />
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
    ListUsers: {
      screen: ListUsers,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="ListUsers" title="Mostrar Usuarios" />
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
    AddMetas: {
      screen: AddMetas,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="AddMetas " title="Crear Meta" />
        ),
      }),
    },
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


const UserStack = createDrawerNavigator(
  {
    Inicio: {
      screen: InicioScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Inicio" title="Inicio" />
        ),
      }),
    },
    Prefile: {
      screen: PerfileScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Perfiles" title="Editar Perfil" />
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
    AddAppointmentsUser: {
      screen: ListAppointmentsUserScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Citas Paciente" title="Citas Paciente" />
        ),
      }),
    },
    FoodsUser: {
      screen: FoodsUser,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="FoodsUser" title="Foods" />
        ),
      }),
    },
    ListEntries: {
      screen: ListEntries,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="ListEntries" title="Mostrar Diario" />
        ),
      }),
    },
    Progress: {
      screen: Progress,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="Progress" title="Progreso" />
        ),
      }),
    },
    AddMetas: {
      screen: AddMetas,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="AddMetas " title="Crear Meta" />
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
     TagsUser: {
       screen: TagsUser,
       navigationOptions: (navOpt) => ({
         drawerLabel: ({ focused }) => (
           <Drawer focused={focused} screen="TagsUser" title="Agregar tag" />
         ),
       })
     },
/*
    ListTags: {
      screen: ListTagScreen,
      navigationOptions: (navOpt) => ({
        drawerLabel: ({ focused }) => (
          <Drawer focused={focused} screen="ListTag" title="List Tags" />
        ),
      })
    },*/
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
    Main: MainStack,
    App: AppStack,
    Home: HomeStack,
    Login: LoginStack,
    SignUp: SignUpStack,
    User: UserStack
  },
  {
    initialRouteName: 'Main',
  }
);

