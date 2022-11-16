import React, { useState } from "react";
import ReactGraph from "react-graph";
import { Tabs } from "antd";

import ResourceManager from "../../components/ResourceManager";
import {
  root as rootGD,
  nodes as nodesGD,
  relationships as relationshipsGD,
} from "./graph-data";

const user = "PuppedToy";
const rootId = "3cc1a2a289dddbd64688";
const rootNode = {
  id: rootId,
  labels: ["node"],
  properties: {
    user,
    createdAt: "2015-09-06T00:53:52Z",
    updatedAt: "2015-09-12T21:20:28Z",
    name: "Root Node",
  },
};

function GraphPlayground() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  // Get the path param :userId from URL

  const mapper = ({ _id, id, ...rest }) => ({
    id: id || _id,
    ...rest,
  });

  const onNodesFetch = (newNodes) => {
    setNodes(
      newNodes.map(mapper).map(({ id, labels, name, createdAt, updatedAt }) => {
        return {
          id,
          labels: [labels],
          properties: {
            user,
            createdAt,
            updatedAt,
            name,
          },
        };
      })
    );
  };

  const onEdgeFetch = (newEdges) => {
    setEdges(
      newEdges
        .map(mapper)
        .map(
          ({
            id,
            type,
            startNodeId,
            endNodeId,
            name,
            createdAt,
            updatedAt,
          }) => {
            return {
              id,
              type,
              startNodeId:
                startNodeId === "root"
                  ? rootId
                  : startNodeId.replace(/.*\//, "").replace(/\)$/, ""),
              endNodeId:
                endNodeId === "root"
                  ? rootId
                  : endNodeId.replace(/.*\//, "").replace(/\)$/, ""),
              properties: {
                user,
                createdAt,
                updatedAt,
                name,
              },
            };
          }
        )
    );
  };

  const initialState = {
    nodes: [rootNode, ...nodes],
    relationships: [...edges],
  };
  console.log(initialState);

  return (
    <div>
      <Tabs>
        <Tabs.TabPane tab="Nodes" key="nodes-tab">
          <ResourceManager
            resourceName="test-graph-playground-nodes"
            onFetch={onNodesFetch}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Edges" key="edges-tab">
          <ResourceManager
            resourceName="test-graph-playground-edges"
            onFetch={onEdgeFetch}
          />
        </Tabs.TabPane>
      </Tabs>
      <Tabs>
        <Tabs.TabPane tab="Nodes" key="default-tab">
          <ReactGraph
            initialState={rootGD}
            nodes={nodesGD}
            relationships={relationshipsGD}
            width="100%"
            hasLegends
            hasInspector
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Custom" key="custom-tab">
          <ReactGraph
            initialState={initialState}
            nodes={nodes}
            relationships={edges}
            width="100%"
            hasLegends
            hasInspector
          />
        </Tabs.TabPane>
      </Tabs>
    </div>
  );
}

export default GraphPlayground;
