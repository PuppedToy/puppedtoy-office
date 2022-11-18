/* eslint-disable no-underscore-dangle */
import React from "react";
import { Select } from "antd";
import ReactGraph from "react-graph";

import ResourceManager from "../../../components/ResourceManager";
import { getResource } from "../../../services/api";

const user = "PuppedToy";

function KingslayerFortresses() {
  const [fortresses, setFortresses] = React.useState([]);
  const [currentFortress, setCurrentFortress] = React.useState({
    loaded: false,
  });

  const onFortressesFetch = (newFortresses) => {
    setFortresses(newFortresses);
  };

  const handleChange = async (fortressId) => {
    setCurrentFortress({
      loaded: false,
    });
    const allFortressesRooms = await getResource("fortress-rooms");
    const fortressRooms = allFortressesRooms.filter(
      (room) => room.fortress.replace(/.*\//, "") === fortressId
    );
    const nodes = fortressRooms.map((room) => ({
      id: room._id,
      labels: room.isEntrance !== "false" ? ["entrance"] : ["room"],
      properties: {
        user,
        name: room.name,
        createdAt: room.createdAt,
        updatedAt: room.updatedAt,
      },
    }));
    const relationships = fortressRooms
      .filter((room) => room.connectedTo.trim())
      .map((room, index) => ({
        id: index,
        type: "CONNECTED_TO",
        startNodeId: room._id,
        endNodeId: room.connectedTo.replace(/.*\//, ""),
        properties: {},
      }));
    const newCurrentFortress = {
      loaded: true,
      nodes,
      relationships,
      initialState: {
        nodes: [...nodes],
        relationships: [...relationships],
      },
    };
    setCurrentFortress(newCurrentFortress);
  };

  console.log(currentFortress);

  return (
    <>
      <ResourceManager resourceName="fortresses" onFetch={onFortressesFetch} />
      <Select
        onChange={handleChange}
        options={fortresses.map(({ _id, name }) => ({
          value: _id,
          label: name,
        }))}
        style={{ minWith: "200px" }}
      />
      {currentFortress.loaded ? (
        <ReactGraph
          initialState={currentFortress.initialState}
          nodes={currentFortress.nodes}
          relationships={currentFortress.relationships}
          width="100%"
          hasLegends
          hasInspector
        />
      ) : null}
    </>
  );
}

export default KingslayerFortresses;
