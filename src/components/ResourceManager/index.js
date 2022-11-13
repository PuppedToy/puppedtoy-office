import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Spin, Table, Card, Button } from "antd";
import { JsonEditor } from "jsoneditor-react";
import Ajv from "ajv";

import "jsoneditor-react/es/editor.min.css";

import { getResource, createResource } from "../../services/api";

const ajv = new Ajv({ allErrors: true, verbose: true });

function ResourceManager({ resourceName }) {
  const [resourceList, setResourceList] = useState([]);
  const [currentJson, setCurrentJson] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchResourceList = async () => {
    setResourceList([]);
    setIsLoading(true);
    const newResourceList = await getResource(resourceName);
    setResourceList(newResourceList);
    if (newResourceList.length) {
      const {
        _id,
        appVersion,
        version,
        isResource,
        createdAt,
        updatedAt,
        ...newCurrentJson
      } = newResourceList[0];
      setCurrentJson(newCurrentJson);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchResourceList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceName]);

  const sample = resourceList.length ? resourceList[0] : {};
  const sampleKeys = sample
    ? Object.keys(sample).filter(
        (key) => !["_id", "isResource", "appVersion"].includes(key)
      )
    : [];

  const onClickAddButton = async () => {
    setIsLoading(true);
    await createResource(resourceName, currentJson);
    await fetchResourceList();
  };

  const onJSONChange = (json) => {
    setCurrentJson(json);
  };

  return (
    <Card title={resourceName}>
      {isLoading ? (
        <Spin />
      ) : (
        <>
          <JsonEditor value={currentJson} onChange={onJSONChange} ajv={ajv} />
          <Button type="primary" onClick={onClickAddButton}>
            Add
          </Button>
          <Table
            dataSource={resourceList}
            columns={
              sampleKeys
                ? sampleKeys.map((item) => ({ title: item, dataIndex: item }))
                : []
            }
          />
        </>
      )}
    </Card>
  );
}

ResourceManager.propTypes = {
  resourceName: PropTypes.string.isRequired,
};

export default ResourceManager;
