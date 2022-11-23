import React from "react";
import ResourceManager from "../../../components/ResourceManager";
import BulkInserter from "../../../components/BulkInserter";

function KingslayerItems() {
  return (
    <>
      <ResourceManager resourceName="items" />
      <BulkInserter resourceName="items" listKeys={["name"]} />
    </>
  );
}

export default KingslayerItems;
