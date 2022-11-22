import React from "react";
import ResourceManager from "../../../components/ResourceManager";
import BulkInserter from "../../../components/BulkInserter";

function KingslayerItems() {
  return (
    <>
      <BulkInserter resourceName="items" listKeys={["name"]} />
      <ResourceManager resourceName="items" />
    </>
  );
}

export default KingslayerItems;
