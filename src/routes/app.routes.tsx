import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { theme } from '../global/styles/theme';

import { Home } from '../screens/Home';
import { AppointmentDetails } from '../screens/AppointmentDetails';
import { AppointmentCreate } from '../screens/AppointmentCreate';
import { Games } from '../screens/Games';
import { Table } from '../screens/Table';

const { Navigator, Screen } = createStackNavigator();

export function AppRoutes() {
  return(
    <Navigator
      headerMode="none"
      screenOptions={{
        cardStyle: {
          backgroundColor: theme.colors.secondary100
        }
      }}
    >     
      <Screen 
        name="Home"
        component={Home}
      />
      <Screen 
        name="AppointmentDetails"
        component={AppointmentDetails}
      />
      <Screen 
        name="AppointmentCreate"
        component={AppointmentCreate}
      />    
       <Screen 
        name="Games"
        component={Games}
      />  
      <Screen 
        name="Table"
        component={Table}
      />     
    </Navigator>
  )
}