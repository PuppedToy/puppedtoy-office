import React from "react";
import ResourceManager from "../../../components/ResourceManager";

function BulkInsert() {
  return (
    <div>
      <h1>Bulk insert (TODO)</h1>
    </div>
  );
}

function KingslayerItems() {
  return (
    <>
      <BulkInsert />
      <ResourceManager resourceName="items" />;
    </>
  );
}

export default KingslayerItems;
