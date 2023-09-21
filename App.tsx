import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import * as Network from "expo-network";
import { Colors } from "react-native/Libraries/NewAppScreen";

Network.getIpAddressAsync();

export default function App() {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={type}>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.submitButton}>
            <View style={styles.submmitButtonInner}></View>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "black",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  submitButton: {
    width: 100,
    height: 100,
    backgroundColor: "transparent",
    borderRadius: 100,
    borderColor: "white",
    borderWidth: 5,
  },
  submmitButtonInner: {
    flex: 1,
    margin: 5,
    backgroundColor: "white",
    borderRadius: 100,
  },
});
