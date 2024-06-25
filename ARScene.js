// ARScene.js
import React from "react";
import {
  ViroARScene,
  ViroARPlane,
  ViroText,
  ViroTrackingStateConstants,
  ViroImage,
  ViroNode,
} from "@reactvision/react-viro";
import { objects_3D } from "./src/viroRes/resources";

const ARScene = ({ markers }) => {
  // Helper function to convert lat/long to AR coordinates
  const latLongToAR = (lat, long, originLat, originLong) => {
    // Calculate offsets from origin
    const latOffset = lat - originLat;
    const longOffset = long - originLong;

    // Apply scaling factor to bring coordinates within a reasonable range
    const scale = 1000; // Adjusted scale factor

    const x = longOffset * scale;
    const y = 0; // Flat earth model, height set to 0
    const z = latOffset * scale;

    return [x, y, -z];
  };

  const onInitialized = (state, reason) => {
    if (state === ViroTrackingStateConstants.TRACKING_NORMAL) {
      console.log("AR initialized");
    } else if (state === ViroTrackingStateConstants.TRACKING_UNAVAILABLE) {
      console.log("AR not initialized");
    }
  };

  // Use the first marker's location as the origin for simplicity
  const originLat = markers[0]?.lat || 0;
  const originLong = markers[0]?.long || 0;

  const _getMarker = (color) => {
    switch (color) {
      case "red":
        return objects_3D.markers.markerRed;
      case "green":
        return objects_3D.markers.markerGreen;
      case "yellow":
        return objects_3D.markers.markerYellow;
      default:
        return objects_3D.markers.marker;
    }
  };

  return (
    <ViroARScene onTrackingUpdated={onInitialized}>
      {markers.map((marker) => {
        const position = latLongToAR(
          marker.lat,
          marker.long,
          originLat,
          originLong
        );

        // Calculate distance from origin
        const distanceFromOrigin = Math.sqrt(
          position[0] ** 2 + position[2] ** 2
        );

        // Add debug logs
        console.log(
          `Marker ID: ${marker.id}, Title: ${marker.marker_title}, Position: ${position}, Distance from origin: ${distanceFromOrigin}`
        );

        // Adjust scale for better visibility
        const adjustedScale = 0.1; // Adjust this factor for better visibility

        // Only render markers within a reasonable distance
        if (distanceFromOrigin < 1000) {
          // Increased threshold
          return (
            // <ViroText
            //   key={marker.id}
            //   text={marker.marker_title || "No Title"}
            //   scale={[adjustedScale, adjustedScale, adjustedScale]}
            //   position={position}
            //   style={{ color: marker.color }}
            // />
            <ViroNode
              position={position}
              key={marker.id}
              onClick={(e) => {
                alert(marker.color);
              }}
            >
              <ViroText
                key={marker.id}
                text={marker.marker_title || "No Title"}
                scale={[adjustedScale, adjustedScale, adjustedScale]}
                // position={position}
                style={{ color: marker.color }}
              />
              <ViroImage
                source={_getMarker(marker.color)}
                // position={position}

                width={1}
                scale={[adjustedScale, adjustedScale, adjustedScale]}
                //style={{ tintColor: "red" }}
                height={1}
              />
            </ViroNode>
          );
        } else {
          console.log(
            `Marker ID: ${marker.id} is too far from the origin and will not be rendered.`
          );
          return null;
        }
      })}
      {/* {markers.map((marker) => (
        <ViroARPlane
          key={marker.id}
          position={[marker.long, 0, marker.lat]}
          anchorDetectionTypes={["PlanesHorizontal"]}
        >
          <ViroText
            text={marker.marker_title || "No Title"}
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0, 0]}
            style={{ color: marker.color }}
          />
        </ViroARPlane>
      ))} */}
    </ViroARScene>
  );
};

export default ARScene;
