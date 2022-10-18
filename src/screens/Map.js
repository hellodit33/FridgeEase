import { useCallback, useLayoutEffect, useState } from "react";
import { Alert, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Colors } from "react-native/Libraries/NewAppScreen";
import IcoButton from "../components/IcoButton";

function Map({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();

  const region = {
    latitude: 59.3251706,
    longitude: 18.0705341,
    latitudeDelta: 0.0952,
    longitudeDelta: 0.0521,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;

    setSelectedLocation({ lat: lat, lng: lng });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        "No location picked!",
        "Pick a location by tapping on the map first"
      );
      return;
    }
    navigation.navigate("Recipes", {
      pickedLat: selectedLocation.lat,
      pickedLng: selectedLocation.lng,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IcoButton
          icon="location"
          size={24}
          color={Colors.red}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        ></Marker>
      )}
    </MapView>
  );
}

export default Map;

const styles = StyleSheet.create({
  map: { flex: 1 },
});
