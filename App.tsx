import {
  Viro360Image,
  Viro3DObject,
  ViroARScene,
  ViroARSceneNavigator,
  ViroText,
  ViroTrackingReason,
  ViroTrackingStateConstants,
} from "@reactvision/react-viro";
import React, { useState } from "react";
import { StyleSheet } from "react-native";
import {objects_3D} from './src/viroRes/resources';
import HelloWorldSceneAR from "./src/components/helloWorldScenej";

const HelloWorldSceneARr = () => {
  const [text, setText] = useState("Initializing AR...");

  function onInitialized(state: any, reason: ViroTrackingReason) {
    console.log("onInitialized", state, reason);
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      setText("Hello World!");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      // Handle loss of tracking
    }
  }

  const render3DObject = () => {
    return (
      // <Viro360Image source={{uri:"https://www.mywebsite.com/360_park.jpg"}} />
      <Viro3DObject
        source={objects_3D.turkeyman_anim.obj}
        type={"VRX"}
        position={[0, 0, -1]}
        // scale={objects_3D.turkeyman_anim.scale}
        // rotation={[0, 0, 0]}
        // animation={{...objects_3D.turkeyman_anim.animation, run: true}}
        // dragType="FixedToWorld"
        // onDrag={() => {}}
      />
    );
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      <ViroText
        text={text}
        scale={[0.5, 0.5, 0.5]}
        position={[0, 0, -1]}
        style={styles.helloWorldTextStyle}
      />
      {render3DObject()}
    </ViroARScene>
  );
};

export default () => {
  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: HelloWorldSceneAR,
      }}
      style={styles.f1}
    />
  );
};

var styles = StyleSheet.create({
  f1: { flex: 1 },
  helloWorldTextStyle: {
    fontFamily: "Arial",
    fontSize: 30,
    color: "#ffffff",
    textAlignVertical: "center",
    textAlign: "center",
  },
});
