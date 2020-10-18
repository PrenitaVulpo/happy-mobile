import React from 'react';
import{NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator();

import InstitutionsMap from './pages/InstitutionsMap'

export default function Routes(){
  return(
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false}}>
        <Screen name="InstitutionsMap" component={InstitutionsMap}/>
      </Navigator>
    </NavigationContainer>
  )
}