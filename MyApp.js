import React from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import ARScene from "./ARScene";
import markersData from "./data";
const MyApp = () => {
  // alert("Hello");
  // alert(markersData.data.length);
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: ARScene,
        passProps: { markers: markersData.data },
      }}
      autofocus={true}
      style={{ flex: 1 }}
    />
  );
};

export default MyApp;
