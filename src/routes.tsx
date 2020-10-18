import React from 'react';
import{NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack'

const {Navigator, Screen} = createStackNavigator();

import InstitutionsMap from './pages/InstitutionsMap';
import InstitutionDetails from './pages/InstitutionDetails';
import InstitutionData from './pages/CreateInstitution/InstitutionData';
import SelectMapPosition from './pages/CreateInstitution/SelectMapPosition';
import Header from './components/Header';

export default function Routes(){
  return(
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false, cardStyle: {backgroundColor: '#f2f3f5'}}}>
        <Screen name="InstitutionsMap" component={InstitutionsMap}/>
        <Screen name="InstitutionDetails" component={InstitutionDetails} options={{
          headerShown: true,
          header: () => <Header showBack={false} title="Detalhes da instituição"/>
        }}/>
        <Screen name="InstitutionData" component={InstitutionData} options={{
          headerShown: true,
          header: () => <Header showBack={true} title="Selecione no mapa"/>
        }}/>
        <Screen name="SelectMapPosition" component={SelectMapPosition} options={{
          headerShown: true,
          header: () => <Header title="Informe os dados"/>
        }}/>
      </Navigator>
    </NavigationContainer>
  )
}