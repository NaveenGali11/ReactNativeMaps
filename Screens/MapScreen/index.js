import React, { useEffect, useRef, useState } from "react";
import { Alert, Button, Text, View } from "react-native";
import { styles } from "./styles";
import MapView,{Marker,Animated,AnimatedRegion} from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import {PermissionsAndroid} from "react-native";

const MapScreen = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [permissionStatus, setPermissionStatus] = useState("");
  const [region, setRegion] = useState({
    latitude : latitude,
    longitude : longitude,
    latitudeDelta : 1,
    longitudeDelta : 1,
  });

  const mapRef = useRef(null);

  const location = {
    latitude : latitude,
    longitude : longitude,
    latitudeDelta : 0.01,
    longitudeDelta : 0.01
  }

  const gotoLocation = () => {
    return (
      mapRef.current.animateToRegion(location,3*1000)
    );
  }

  const requestLocationPermission = async () => {
    try {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title : 'Needs Location Permission',
          message : "Need Location"
        }
      ).then((res) => {
        console.log("Response in Fn :- ",res);
        setPermissionStatus(res);
      })
    }catch (err){
      Alert.alert('Error','SomeThing Unexpected Happened')
    }
  }

  const userLocation = () => {
    return (
      Geolocation.getCurrentPosition((e) => {
        console.log("Location :- ",e);
        setLongitude(e.coords.longitude);
        setLatitude(e.coords.latitude);
      },(err) => {
        console.log("Error in GeoService :- ",err);
      },{
        forceLocationManager : true,
        showLocationDialog : true
      })
    )
  }

  useEffect(() => {
    requestLocationPermission().then((res) => {
      console.log("Response :- ",res);
      userLocation();
    }).catch((err) => {
      console.log("Error :- ",err);
    })
  },[])


  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.mapStyle}
        initialRegion={{
          latitude : 16,
          longitude : 80,
          latitudeDelta : 5,
          longitudeDelta : 14,
        }}
        customMapStyle={mapStyle}
        onMapLoaded={() => {
          gotoLocation();
        }}
        onRegionChange={(region) => setRegion(region)}
      >
        <Marker coordinate={{
          latitude : latitude,
          longitude : longitude
        }}
        />
      </MapView>
    </View>
  )
}

const mapStyle = [
  {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
]

export default MapScreen;
