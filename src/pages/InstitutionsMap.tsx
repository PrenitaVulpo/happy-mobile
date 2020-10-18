import React, {useState, useEffect}from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Callout, Marker} from 'react-native-maps';
import {Feather} from '@expo/vector-icons';


import MapMarker from '../images/map-marker.png';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import api from '../services/api';

interface Institution {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
}


export default function App() {
  const [institutions, setInstitutions] = useState<Institution[]>([])
  const navigation = useNavigation();

  useEffect(()=>{
    api.get('institutions').then(response=>{
      setInstitutions(response.data)
    })
  }, [])
  
  function handleNavigateToInstitutionDetails(id:number){
    navigation.navigate('InstitutionDetails', {id})
  }
  
  function handleNavigateToCreateInstitution(){
    navigation.navigate('SelectMapPosition')
  }

  return (
    <View style={styles.container}>
      <MapView provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: -7.3170944,
          longitude: -39.3019392,
          latitudeDelta: 0.008,
          longitudeDelta: 0.008
      }}>
        {institutions.map(institution=>{
          return (
            <Marker key={institution.id} 
              icon={MapMarker}
              calloutAnchor={{
                x: 2.7,
                y: 0.8
              }}
              coordinate={{
                latitude: institution.latitude,
                longitude: institution.longitude,
            }}>
              <Callout tooltip onPress={() => handleNavigateToInstitutionDetails(institution.id)}>
                <View style={styles.calloutContainer}>
                  <Text style={styles.calloutText}>{institution.name}</Text>
                </View>
              </Callout>
            </Marker>
          );
        })}
      </MapView>
      <View style={styles.footer}>
        <Text style={styles.footerText}>{institutions.length} instituições encontradas</Text>
        <RectButton style={styles.createInstitutionButton}
          onPress={handleNavigateToCreateInstitution}
        >
          <Feather name='plus' size={20} color={'#FFF'}/>
        </RectButton>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  calloutContainer: {
    width: 160,
    height: 46,
    paddingHorizontal: 16,
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 16,
    justifyContent: 'center'
  },
  calloutText: {
    fontFamily: 'Nunito_700Bold',
    color: '#0089a5',
    fontSize: 14
  },
  footer: {
    position: 'absolute',
    left: 24,
    right: 24,
    bottom: 32,
    backgroundColor: '#fff',
    borderRadius: 20,
    height: 56,
    paddingLeft: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 3
  },
  footerText: {
    fontFamily: 'Nunito_700Bold',
    color: '#8fa7b3',
  },
  createInstitutionButton: {
    width: 56,
    height: 56,
    backgroundColor: '#15c3d6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
